import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

export function createSql() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error('Missing DATABASE_URL. Set it in .env at project root.');
    process.exit(1);
  }
  return neon(databaseUrl);
}
