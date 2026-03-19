# QR Code Check-In

QR check-in platform for live events with:

- organization + staff access control (Clerk + app-managed memberships)
- event-scoped attendee management
- QR token check-in scanner (camera/manual fallback, offline queue)
- CSV import/export and bulk QR email sending

Astro powers both UI routes and API routes in a single deploy.

## Requirements

- Node 20+
- PostgreSQL (for example [Neon](https://neon.tech))
- [Clerk](https://clerk.com) (auth)
- [Resend](https://resend.com) (email sending)

## Quick Start

1. Copy env file:

   ```bash
   cp .env.example .env
   ```

2. Fill required values in `.env`:
   - `DATABASE_URL`
   - `CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
   - `RESEND_API_KEY`
   - `FROM_EMAIL`
   - `FROM_NAME`

3. Initialize schema:

   ```bash
   npm run setup-db
   npm run migrate-events
   npm run migrate-organizations
   npm run migrate-staff-preferences
   ```

   Notes:
   - `setup-db` is destructive for `attendees` (drops/recreates the table) and is meant for local setup/reset.
   - On existing environments, use migrations only (skip `setup-db`).

4. Start locally:

   ```bash
   npm run dev
   ```

5. Open `http://localhost:4321`, sign in, complete organization onboarding, then create/select an event.

## Core Routes

| Route | Purpose |
|---|---|
| `/admin` | Main organizer/staff dashboard |
| `/admin/events` | Event management |
| `/admin/events/import` | Event CSV import + optional bulk QR email send |
| `/admin/organization` | Organization settings + invitations |
| `/scanner` | Standalone scanner experience |
| `/login` | Authentication entry |
| `/invite/accept` | Invitation acceptance flow |
| `/onboarding/organization` | Organization setup flow |

## Key API Endpoints

| Endpoint | Purpose |
|---|---|
| `GET/POST/DELETE /api/attendees` | List/create/delete attendees (event-scoped) |
| `POST /api/checkin` | QR check-in and manual attendeeId check-in |
| `GET /api/attendees/offline-cache` | Scanner offline cache payload |
| `POST /api/attendees/import` | CSV import with mapping/modes/warnings |
| `GET /api/attendees/export` | CSV export |
| `POST /api/attendees/send-bulk-qr` | Bulk QR email sending |
| `POST /api/attendees/refresh-qr` | Single attendee QR refresh |
| `POST /api/events` / `DELETE /api/events/:id` | Event management APIs |
| `POST /api/webhooks/entry` | Microsite/hub webhook ingestion |
| `GET /api/health` | Health check |

## Environment Variables

See `.env.example` for the canonical list. Main variables:

- `DATABASE_URL`
- `CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `RESEND_API_KEY`
- `FROM_EMAIL`
- `FROM_NAME`
- `MICROSITE_WEBHOOK_KEY`
- `DEFAULT_EVENT_SLUG`
- `APP_URL` (optional)
- `PORT` (optional)
- `QR_TOKEN_TTL_DAYS` (optional)

## Scripts

| Command | Action |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Build production bundle |
| `npm run preview` | Preview build locally |
| `npm run setup-db` | Reset local attendee table (destructive) |
| `npm run migrate-qr` | QR token security migration |
| `npm run migrate-events` | Event-scoped schema migration |
| `npm run migrate-organizations` | Organization/membership migration |
| `npm run migrate-staff-preferences` | Staff preference persistence migration |
| `npm run wipe-events` | Event wipe utility |
| `npm run test:edge-cases` | Edge-case test suite (dev server running) |
| `npm run test:edge-cases:ci` | Start server + run edge-case tests |
| `npm run test:generate-csvs` | Generate CSV fixtures for import testing |

## Documentation

- Roadmap + progress: [`docs/MASTER-PLAN.md`](docs/MASTER-PLAN.md)
- User-facing docs index: [`docs/README.md`](docs/README.md)
- Deployment: [`docs/VERCEL-DEPLOYMENT.md`](docs/VERCEL-DEPLOYMENT.md)
- Clerk setup: [`docs/AUTH-CLERK-SETUP.md`](docs/AUTH-CLERK-SETUP.md)
- Email sender go-live checklist: [`docs/EMAIL-SENDER-GO-LIVE-CHECKLIST.md`](docs/EMAIL-SENDER-GO-LIVE-CHECKLIST.md)

## Deployment

Deploy on Vercel. For production setup details and post-deploy verification, use [`docs/VERCEL-DEPLOYMENT.md`](docs/VERCEL-DEPLOYMENT.md).
