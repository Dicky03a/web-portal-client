import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

// Next.js loads .env.local for the app, but drizzle-kit runs outside Next,
// so load it explicitly here for db:generate / db:migrate / db:push.
config({ path: '.env.local' });

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/db/schema/index.ts',
  out: './src/db/migrations',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
});
