# Ibadullah website

Responsive English/Arabic website for four giving areas: building masajid, supporting existing masajid, orphan support, and clean water. Project imagery is illustrative.

## Cloudflare Worker

The static site can be deployed as Worker assets from `dist` using `wrangler.jsonc`. Connect the `main` branch of this repository to the `ibadullah-website` Worker in Cloudflare Workers Builds, then use `npx wrangler deploy` as the deploy command. This serves the public pages only; the Node server, donation API, and local SQLite database do not run in Cloudflare Workers.

## Local preview

Requires Node.js 22. Run `npm install`, then `npm run web` and open `http://127.0.0.1:3000`. The donation page currently shows a non-interactive "Feature coming soon" notice, even if backend checkout settings are configured. Run `npm run check` and `npm test` to verify the application.

## PayMongo integration

The server has a PHP hosted-checkout integration prepared for a future launch. The public donation form is intentionally unavailable. When re-enabled after review, donors will choose one of the four projects, enter a one-time amount and contact details, and leave the site for PayMongo's checkout. The server creates a unique local donation reference and a PayMongo checkout session. A return to the site shows a pending status until a signed `checkout_session.payment.paid` webhook matches the reference, session, project, amount, currency, and payment. Duplicate events cannot add a second donation.

Copy `.env.example` to `.env` and fill the settings. Keep `.env` and the SQLite database private; both are gitignored. The API secret key and webhook signing secret must never be used in browser code. Create a PayMongo webhook for `https://YOUR-DOMAIN/api/paymongo/webhook` and subscribe to `checkout_session.payment.paid`. Test with PayMongo test keys and a publicly reachable HTTPS test domain first. The hosted checkout charges PHP; eligible international cards may be accepted by PayMongo, but USD/SAR charging and recurring donations are not implemented.

Checkout opens only if all of these settings are present:

- `DONATIONS_ENABLED=true`
- `POLICIES_APPROVED=true`
- `PROJECTS_APPROVED=true`
- `PUBLIC_BASE_URL` with an HTTPS origin
- `PAYMONGO_SECRET_KEY` and `PAYMONGO_WEBHOOK_SECRET`
- For a live secret key only: `PAYMONGO_LIVE_APPROVED=true`

Set approval flags only after the organization's review. The privacy and donation pages currently contain placeholders, so they must be replaced with approved policy text before those flags are enabled. Configure `PAYMONGO_PAYMENT_METHODS` to match methods activated for the account. Provider webhook payloads and checkout behavior need validation in the PayMongo test account before switching to live keys.

## Staff reports

The local SQLite database stores donation references, project designations, donor contact details, checkout IDs, verified payment IDs, and gross/fee/net amounts. `/admin` displays project totals and transaction records; `/admin/report.csv` exports the full ledger. Both require Basic authentication. Generate a password hash with `npm run admin:hash` in an interactive terminal, then set `ADMIN_USERNAME` and `ADMIN_PASSWORD_HASH` in `.env`. Use a unique password of at least 16 characters and serve staff routes only over HTTPS. Back up the database and protect the backup.

The staff dashboard is read-only. Expenditure approvals, role separation, MFA, refunds, automated reconciliation, and public publication of reviewed reports are future operational work; do not treat this dashboard as a complete accounting system.

## Information required before launch

- Official logo, organizational legal name, SEC registration details, public office address, and reviewed Arabic copy. The Contact page now lists ibadullah.org@yahoo.com.
- Approved project locations, descriptions, budgets, beneficiaries, milestones, authorized contacts, and reporting process.
- Approved privacy notice, donation/refund terms, and any fundraising permissions that apply.
- A production host with persistent storage, HTTPS, database backups, monitoring, and restricted staff access.
- PayMongo account, enabled payment methods, secret API key, webhook secret, and successful sandbox checkout/webhook tests.
