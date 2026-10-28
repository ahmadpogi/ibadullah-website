import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { createHmac } from 'node:crypto';
import { PROJECTS, openDatabase, createDonation, attachCheckout, donationStatus, verifySignature, applyPaidWebhook, adminReport } from '../lib/donations.mjs';

function fixture() {
  const folder = mkdtempSync(path.join(tmpdir(), 'ibadullah-test-'));
  const db = openDatabase(path.join(folder, 'donations.sqlite'));
  const reference = createDonation(db, { projectId:'orphan-support', amountMinor:250000, name:'Test Donor', email:'test@example.org', anonymous:true });
  attachCheckout(db, reference, 'cs_test_123');
  const event = { data:{ id:'evt_test_123', attributes:{ type:'checkout_session.payment.paid', livemode:false,
    data:{ id:'cs_test_123', attributes:{ reference_number:reference, metadata:{ project_id:'orphan-support', reference },
      payments:[{ id:'pay_test_123', attributes:{ amount:250000, fee:6000, net_amount:244000, currency:'PHP', status:'paid' } }] } } } } };
  return { folder, db, reference, event };
}
test('signed paid event records the right project exactly once', () => {
  const { folder, db, reference, event } = fixture();
  try {
    const raw = JSON.stringify(event), timestamp = Math.floor(Date.now() / 1000);
    const signature = createHmac('sha256', 'webhook-secret').update(`${timestamp}.${raw}`).digest('hex');
    assert.equal(verifySignature(raw, `t=${timestamp},te=${signature}`, 'webhook-secret', false), true);
    assert.equal(verifySignature(raw + ' ', `t=${timestamp},te=${signature}`, 'webhook-secret', false), false);
    assert.equal(verifySignature(raw, `t=${timestamp - 600},te=${signature}`, 'webhook-secret', false), false);
    assert.deepEqual(applyPaidWebhook(db, event), { accepted:true, duplicate:false });
    assert.deepEqual(applyPaidWebhook(db, event), { accepted:true, duplicate:true });
    event.data.id = 'evt_test_retry';
    assert.deepEqual(applyPaidWebhook(db, event), { accepted:true, duplicate:true });
    assert.equal(donationStatus(db, reference).status, 'paid');
    const report = adminReport(db);
    assert.equal(report.summary[0].gross_minor, 250000);
    assert.equal(report.summary[0].net_minor, 244000);
    assert.equal(report.summary[0].donations, 1);
  } finally { db.close(); rmSync(folder, { recursive:true, force:true }); }
});
test('only documented focus areas can be selected for checkout', () => {
  assert.deepEqual(PROJECTS, ['build-masjid', 'support-masajid', 'orphan-support']);
  assert.equal(PROJECTS.includes('clean-water'), false);
});
test('mismatched payment details cannot mark a donation paid', () => {
  const { folder, db, reference, event } = fixture();
  try {
    event.data.attributes.data.attributes.payments[0].attributes.amount = 1;
    assert.deepEqual(applyPaidWebhook(db, event), { accepted:false });
    assert.equal(donationStatus(db, reference).status, 'checkout_created');
    event.data.attributes.data.attributes.payments[0].attributes.amount = 250000;
    event.data.attributes.data.attributes.metadata.project_id = 'support-masajid';
    assert.deepEqual(applyPaidWebhook(db, event), { accepted:false });
    assert.equal(donationStatus(db, reference).status, 'checkout_created');
  } finally { db.close(); rmSync(folder, { recursive:true, force:true }); }
});
