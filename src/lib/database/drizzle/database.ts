import { env } from '@/lib/env';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import * as schema from './schema';
export const client = new Client(env.DATABASE_URL!);
export const database = drizzle({ client, schema });
