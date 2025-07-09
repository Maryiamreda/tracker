import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';


const client = postgres(process.env.SUPABASE_URL!);
export const db = drizzle({ client });


