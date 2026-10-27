import 'dotenv/config';
import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { scryptSync, timingSafeEqual } from 'node:crypto';
import { openDatabase, PROJECTS, createDonation, attachCheckout, failCheckout, donationStatus, verifySignature, applyPaidWebhook, adminReport } from './lib/donations.mjs';

const root = path.resolve('dist');
const db = openDatabase(path.resolve(process.env.DATABASE_PATH || 'data/ibadullah.sqlite'));
const base = (process.env.PUBLIC_BASE_URL || '').replace(/\/$/, '');
const secretKey = process.env.PAYMONGO_SECRET_KEY || '';
const webhookSecret = process.env.PAYMONGO_WEBHOOK_SECRET || '';
const liveMode = secretKey.startsWith('sk_live_');
const enabled = process.env.DONATIONS_ENABLED === 'true' && process.env.POLICIES_APPROVED === 'true' &&
  process.env.PROJECTS_APPROVED === 'true' && !!secretKey && !!webhookSecret &&
  /^https:\/\//.test(base) && (!liveMode || process.env.PAYMONGO_LIVE_APPROVED === 'true');
const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || '127.0.0.1';
const methods = (process.env.PAYMONGO_PAYMENT_METHODS || 'card,gcash,qrph').split(',').filter(x => ['card', 'gcash', 'qrph'].includes(x));
const rate = new Map();
const contentTypes = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.png':'image/png', '.webp':'image/webp', '.svg':'image/svg+xml' };

function send(response, status, data, headers = {}) {
  response.writeHead(status, { 'Content-Type':'application/json; charset=utf-8', 'Cache-Control':'no-store', ...headers });
  response.end(JSON.stringify(data));
}
function readBody(request, limit = 65536) {
  return new Promise((resolve, reject) => {
    let size = 0, chunks = [];
    request.on('data', chunk => {
      size += chunk.length;
      if (size > limit) { reject(new Error('Body too large')); request.destroy(); return; }
      chunks.push(chunk);
    });
    request.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    request.on('error', reject);
  });
}
function validateDonation(input) {
  const amount = Number(input?.amount), amountMinor = Math.round(amount * 100);
  const name = String(input?.name || '').trim(), email = String(input?.email || '').trim().toLowerCase();
  if (!PROJECTS.includes(input?.projectId) || !Number.isFinite(amount) || amountMinor < 10000 || amountMinor > 100000000 ||
      Math.abs(amount * 100 - amountMinor) > 0.00001 || name.length < 2 || name.length > 100 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 ||
      input?.acceptedPolicies !== true || typeof input?.anonymous !== 'boolean') return null;
  return { projectId:input.projectId, amountMinor, name, email, anonymous:input.anonymous };
}
async function createCheckout(request, response) {
  if (!enabled) return send(response, 503, { error:'Donations are not active yet.' });
  if (request.headers.origin !== base) return send(response, 403, { error:'Invalid origin.' });
  const ip = request.socket.remoteAddress || 'unknown', now = Date.now();
  const hits = (rate.get(ip) || []).filter(time => now - time < 60000);
  if (hits.length >= 5) return send(response, 429, { error:'Please wait before trying again.' });
  hits.push(now); rate.set(ip, hits);
  let input;
  try { input = JSON.parse(await readBody(request, 8192)); }
  catch { return send(response, 400, { error:'Invalid request.' }); }
  const donor = validateDonation(input);
  if (!donor) return send(response, 400, { error:'Check the project, amount, donor details, and consent.' });
  const reference = createDonation(db, donor), statusUrl = `${base}/donation-status.html?ref=${encodeURIComponent(reference)}`;
  const payload = { data:{ attributes:{
    line_items:[{ name:`Ibadullah donation: ${donor.projectId}`, amount:donor.amountMinor, currency:'PHP', quantity:1 }],
    payment_method_types:methods, success_url:statusUrl, cancel_url:statusUrl,
    reference_number:reference, send_email_receipt:true, metadata:{ project_id:donor.projectId, reference }
  } } };
  try {
    const reply = await fetch('https://api.paymongo.com/v2/checkout_sessions', {
      method:'POST', headers:{ Authorization:`Basic ${Buffer.from(`${secretKey}:`).toString('base64')}`, 'Content-Type':'application/json', Accept:'application/json' },
      body:JSON.stringify(payload), signal:AbortSignal.timeout(15000)
    });
    const result = await reply.json(), sessionId = result?.data?.id, checkoutUrl = result?.data?.attributes?.checkout_url;
    if (!reply.ok || !/^cs_/.test(sessionId || '') || !/^https:\/\//.test(checkoutUrl || '')) throw new Error('Checkout provider rejected request');
    attachCheckout(db, reference, sessionId);
    return send(response, 201, { reference, checkoutUrl });
  } catch (error) {
    failCheckout(db, reference);
    console.error('Checkout creation failed:', error.message);
    return send(response, 502, { error:'Checkout is temporarily unavailable. Please try later.' });
  }
}
async function receiveWebhook(request, response) {
  let raw;
  try { raw = await readBody(request, 262144); }
  catch { return send(response, 413, { error:'Invalid body.' }); }
  if (!verifySignature(raw, request.headers['paymongo-signature'], webhookSecret, liveMode)) return send(response, 401, { error:'Invalid signature.' });
  let event;
  try { event = JSON.parse(raw); } catch { return send(response, 400, { error:'Invalid JSON.' }); }
  if (event?.data?.attributes?.livemode !== liveMode) return send(response, 400, { error:'Mode mismatch.' });
  if (event?.data?.attributes?.type !== 'checkout_session.payment.paid') return send(response, 200, { received:true });
  try {
    const result = applyPaidWebhook(db, event);
    if (!result.accepted) return send(response, 400, { error:'Event did not match a donation.' });
    return send(response, 200, { received:true });
  } catch (error) {
    console.error('Webhook processing failed:', error.message);
    return send(response, 500, { error:'Could not process webhook.' });
  }
}
function authorized(request) {
  const stored = process.env.ADMIN_PASSWORD_HASH || '', username = process.env.ADMIN_USERNAME || '';
  if (!username || !stored || !request.headers.authorization?.startsWith('Basic ')) return false;
  const [salt, hash] = stored.split(':');
  if (!/^[a-f0-9]{32}$/.test(salt || '') || !/^[a-f0-9]{128}$/.test(hash || '')) return false;
  let credentials;
  try { credentials = Buffer.from(request.headers.authorization.slice(6), 'base64').toString('utf8'); } catch { return false; }
  const separator = credentials.indexOf(':');
  if (separator < 0 || credentials.slice(0, separator) !== username) return false;
  return timingSafeEqual(scryptSync(credentials.slice(separator + 1), Buffer.from(salt, 'hex'), 64), Buffer.from(hash, 'hex'));
}
function csvCell(value) {
  const string = String(value ?? ''), safe = /^[=+@\-\t\r]/.test(string) ? `'${string}` : string;
  return `"${safe.replaceAll('"', '""')}"`;
}
async function serveStatic(url, response) {
  const relative = decodeURIComponent(url.pathname).replace(/^\/+/, '') || 'index.html', filename = path.resolve(root, relative);
  if (!filename.startsWith(root + path.sep)) return send(response, 403, { error:'Forbidden' });
  try {
    const data = await readFile(filename);
    response.writeHead(200, { 'Content-Type':contentTypes[path.extname(filename)] || 'application/octet-stream', 'Cache-Control':/\.(html|css|js)$/.test(relative) ? 'no-cache' : 'public, max-age=3600' });
    response.end(data);
  } catch { send(response, 404, { error:'Not found' }); }
}
export function startServer() {
  const server = http.createServer(async (request, response) => {
    response.setHeader('X-Content-Type-Options', 'nosniff');
    response.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.setHeader('X-Frame-Options', 'DENY');
    response.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'");
    const url = new URL(request.url, 'http://localhost');
    if (request.method === 'GET' && url.pathname === '/api/config') return send(response, 200, { donationsEnabled:enabled, currency:'PHP', minimum:100, maximum:1000000 });
    if (request.method === 'POST' && url.pathname === '/api/checkout') return createCheckout(request, response);
    if (request.method === 'POST' && url.pathname === '/api/paymongo/webhook') return receiveWebhook(request, response);
    if (request.method === 'GET' && /^\/api\/donations\/ibd_[a-f0-9]{32}$/.test(url.pathname)) {
      const donation = donationStatus(db, url.pathname.split('/').at(-1));
      return send(response, donation ? 200 : 404, donation || { error:'Not found' });
    }
    if (url.pathname === '/admin' || url.pathname === '/admin/report.csv') {
      if (!authorized(request)) return send(response, 401, { error:'Staff access required.' }, { 'WWW-Authenticate':'Basic realm="Ibadullah staff"' });
      if (url.pathname.endsWith('.csv')) {
        const columns = ['reference','project_id','amount_minor','currency','status','donor_name','donor_email','anonymous','payment_id','fee_minor','net_minor','created_at','paid_at'];
        const csv = [columns.join(','), ...adminReport(db).donations.map(row => columns.map(column => csvCell(row[column])).join(','))].join('\r\n');
        response.writeHead(200, { 'Content-Type':'text/csv; charset=utf-8', 'Content-Disposition':'attachment; filename="ibadullah-donations.csv"', 'Cache-Control':'no-store' });
        return response.end(csv);
      }
      response.writeHead(200, { 'Content-Type':'text/html; charset=utf-8', 'Cache-Control':'no-store' });
      return response.end(await readFile(path.join(root, 'admin.html')));
    }
    if (request.method === 'GET' && url.pathname === '/api/admin/report') {
      if (!authorized(request)) return send(response, 401, { error:'Staff access required.' }, { 'WWW-Authenticate':'Basic realm="Ibadullah staff"' });
      return send(response, 200, adminReport(db));
    }
    if (request.method === 'GET') return serveStatic(url, response);
    return send(response, 404, { error:'Not found' });
  });
  server.listen(port, host, () => console.log(`Local: http://${host}:${port} | donations ${enabled ? 'enabled' : 'disabled'}`));
  return server;
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) startServer();
