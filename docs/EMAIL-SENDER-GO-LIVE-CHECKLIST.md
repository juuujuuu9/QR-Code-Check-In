# Go-Live Email Sender Checklist (Resend + Vercel)

Use this checklist when moving from test email sending (`onboarding@resend.dev`) to production sender identity.

## Goal

Send all attendee emails from your verified domain using:

- `FROM_EMAIL=noreply@<your-domain>`
- `FROM_NAME=<your org or event brand>`

Example final sender:

- `Acme Events <noreply@acme.com>`

## 1) Verify your sending domain in Resend

1. Open [Resend Domains](https://resend.com/domains).
2. Add your production domain (usually root domain, e.g. `acme.com`).
3. Follow DNS setup instructions in your DNS provider (SPF/DKIM).
4. Wait until status is **Verified**.

Notes:
- Keep using `onboarding@resend.dev` only for local/demo testing before verification is complete.
- If domain is not verified, production sends may fail or be restricted.

## 2) Decide the production sender address

Choose and standardize:

- `FROM_EMAIL`: `noreply@<your-domain>` (recommended)
- `FROM_NAME`: stable display name used in attendee inboxes

Recommended:
- Use one consistent `FROM_NAME` across all bulk sends.
- Keep `noreply@...` for system-generated QR/check-in emails.

## 3) Set production environment variables in Vercel

In **Vercel → Project Settings → Environment Variables**, set:

- `RESEND_API_KEY` = your live Resend API key
- `FROM_EMAIL` = `noreply@<your-domain>`
- `FROM_NAME` = your preferred default sender name
- `APP_URL` = your production app URL (if not already set)
- `CORS_ORIGIN` = your production app URL (if not already set)

Then redeploy.

## 4) Verify in-app sender preview

In Admin CSV import flow:

1. Import a small CSV with test attendees.
2. Open the bulk email modal.
3. Confirm preview shows expected format:
   - `<Your Name> <noreply@<your-domain>>`
4. Test both:
   - Organization name option
   - Custom from-name option

## 5) Run a production-like smoke test

Send to 1–3 internal addresses first:

- Confirm email is delivered (not blocked/spam/quarantined).
- Confirm sender shows the correct display name + `noreply@...`.
- Confirm QR image attachment renders and scans.
- Confirm links/content and event name are correct.

Only then send to full attendee batches.

## Rollback (if needed)

If there is a production issue with new sender identity:

1. Keep domain verification steps intact.
2. Temporarily switch only `FROM_NAME` (if naming issue).
3. As last resort, revert `FROM_EMAIL` to the previously working verified sender on your domain.

Do not rely on `onboarding@resend.dev` for production use.
