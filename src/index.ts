import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq } from 'drizzle-orm';
import { usersTable } from './db/schema';
import postgres from 'postgres';

const client = postgres(process.env.SUPABASE_URL!);
const db = drizzle({ client });

async function main() {
    const user: typeof usersTable.$inferInsert = {
        username: 'John',
        age: 30,
        email: 'john@example.com',
    };

    await db.insert(usersTable).values(user);
    console.log('New user created!')

    const users = await db.select().from(usersTable);
    console.log('Getting all users from the database: ', users)

}

main();
