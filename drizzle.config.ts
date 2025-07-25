import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
export default defineConfig({
    out: './drizzle',
    schema: './src/lib/backend/db/schema.ts',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.SUPABASE_URL!,
    },
});
