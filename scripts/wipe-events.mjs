/**
 * Wipe all events and attendees so you can start fresh.
 * Run migrate-events afterward to get a new default event.
 *
 *   node scripts/wipe-events.mjs
 */
import { createSql } from './lib/migration-helpers.mjs';

const sql = createSql();

async function main() {
  const attendeeResult = await sql`DELETE FROM attendees`;
  const attendeeCount = attendeeResult.rowCount ?? 0;
  console.log(`Deleted ${attendeeCount} attendee(s)`);

  const eventResult = await sql`DELETE FROM events`;
  const eventCount = eventResult.rowCount ?? 0;
  console.log(`Deleted ${eventCount} event(s)`);

  console.log('Done. Run: npm run migrate-events (to create the default event again).');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
