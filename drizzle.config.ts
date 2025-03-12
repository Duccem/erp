import 'dotenv/config'; // make sure to install dotenv package
import { defineConfig } from 'drizzle-kit';
export default defineConfig({
  dialect: 'postgresql',
  out: './src/lib/database/drizzle',
  schema: './src/lib/database/schema.ts',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
  schemaFilter: ['erp']
});