import Database from 'better-sqlite3';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { createHmac, randomUUID, timingSafeEqual } from 'node:crypto';

export const PROJECTS = [
  'build-masjid', 'support-masajid', 'orphan-support'
];

export function openDatabase(filename) {
  mkdirSync(dirname(filename), { recursive: true });
  const db = new Database(filename);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');
  db.exec(`
    CREATE TABLE IF NOT EXISTS donations (
      reference TEXT PRIMARY KEY,
      project_id TEXT NOT NULL,
      amount_minor INTEGER NOT NULL,
      currency TEXT NOT NULL DEFAULT 'PHP',
      donor_name TEXT NOT NULL,
      donor_email TEXT NOT NULL,
      anonymous INTEGER NOT NULL DEFAULT 0,
      status TEXT NOT NULL DEFAULT 'initiated',
      checkout_session_id TEXT UNIQUE,
      payment_id TEXT UNIQUE,
      fee_minor INTEGER,
      net_minor INTEGER,
      created_at TEXT NOT NULL,
      paid_at TEXT
    );
    CREATE TABLE IF NOT EXISTS webhook_events (
      id TEXT PRIMARY KEY,
      event_type TEXT NOT NULL,
      donation_reference TEXT,
      received_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS donations_project_status ON donations(project_id, status);
  `);
  return db;
}

export function createDonation(db, data) {
  const reference = `ibd_${randomUUID().replaceAll('-', '')}`;
  db.prepare(`INSERT INTO donations (reference, project_id, amount_minor, donor_name, donor_email, anonymous, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)`).run(reference, data.projectId, data.amountMinor, data.name, data.email, Number(data.anonymous), new Date().toISOString());
  return reference;
}

export function attachCheckout(db, reference, sessionId) {
  db.prepare("UPDATE donations SET checkout_session_id = ?, status = 'checkout_created' WHERE reference = ? AND status = 'initiated'").run(sessionId, reference);
}

export function failCheckout(db, reference) {
  db.prepare("UPDATE donations SET status = 'checkout_error' WHERE reference = ? AND status = 'initiated'").run(reference);
}

export function donationStatus(db, reference) {
  const row = db.prepare('SELECT reference, project_id, amount_minor, currency, status, paid_at FROM donations WHERE reference = ?').get(reference);
  return row || null;
}

export function verifySignature(raw, header, secret, liveMode, now = Date.now()) {
  if (!header || !secret) return false;
  const fields = Object.fromEntries(header.split(',').map(part => part.trim().split('=')));
  const timestamp = Number(fields.t);
  const signature = fields[liveMode ? 'li' : 'te'];
  if (!Number.isSafeInteger(timestamp) || Math.abs(now - timestamp * 1000) > 300_000 || !/^[a-f0-9]{64}$/i.test(signature || '')) return false;
  const expected = createHmac('sha256', secret).update(`${timestamp}.${raw}`).digest();
  return timingSafeEqual(expected, Buffer.from(signature, 'hex'));
}

export function applyPaidWebhook(db, event) {
  const id = event?.data?.id;
  const attributes = event?.data?.attributes;
  if (typeof id !== 'string' || !id.startsWith('evt_') || attributes?.type !== 'checkout_session.payment.paid') return { accepted: false };
  const session = attributes.data;
  const reference = session?.attributes?.reference_number;
  const payment = session?.attributes?.payments?.find(item => item?.attributes?.status === 'paid');
  const paymentAttributes = payment?.attributes;
  if (!reference || !session?.id || !payment?.id || !paymentAttributes) return { accepted: false };
  return db.transaction(() => {
    if (db.prepare('SELECT 1 FROM webhook_events WHERE id = ?').get(id)) return { accepted: true, duplicate: true };
    const donation = db.prepare('SELECT * FROM donations WHERE reference = ?').get(reference);
    if (donation?.status === 'paid' && donation.payment_id === payment.id) return { accepted: true, duplicate: true };
    if (!donation || donation.checkout_session_id !== session.id || donation.status === 'paid' ||
        donation.amount_minor !== paymentAttributes.amount || donation.currency !== paymentAttributes.currency ||
        session.attributes.metadata?.project_id !== donation.project_id ||
        session.attributes.metadata?.reference !== reference) return { accepted: false };
    db.prepare(`UPDATE donations SET status = 'paid', payment_id = ?, fee_minor = ?, net_minor = ?, paid_at = ? WHERE reference = ?`)
      .run(payment.id, Number.isSafeInteger(paymentAttributes.fee) ? paymentAttributes.fee : null,
        Number.isSafeInteger(paymentAttributes.net_amount) ? paymentAttributes.net_amount : null,
        new Date().toISOString(), reference);
    db.prepare('INSERT INTO webhook_events (id, event_type, donation_reference, received_at) VALUES (?, ?, ?, ?)')
      .run(id, attributes.type, reference, new Date().toISOString());
    return { accepted: true, duplicate: false };
  })();
}

export function adminReport(db) {
  const summary = db.prepare(`SELECT project_id,
    COALESCE(SUM(CASE WHEN status = 'paid' THEN amount_minor ELSE 0 END), 0) AS gross_minor,
    SUM(CASE WHEN status = 'paid' THEN net_minor END) AS net_minor,
    SUM(CASE WHEN status = 'paid' THEN 1 ELSE 0 END) AS donations
    FROM donations GROUP BY project_id`).all();
  const donations = db.prepare(`SELECT reference, project_id, amount_minor, currency, status, donor_name,
    donor_email, anonymous, payment_id, fee_minor, net_minor, created_at, paid_at
    FROM donations ORDER BY created_at DESC`).all();
  return { summary, donations };
}
