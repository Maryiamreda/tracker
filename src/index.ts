import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq } from 'drizzle-orm';
import { usersTable } from './db/schema';
import postgres from 'postgres';
import * as schema from './db/schema';
const client = postgres(process.env.SUPABASE_URL!);
const db = drizzle({ client });


async function getuserreceipts(userId: number){
try{
    const receipts = await db.select()
    .from(schema.receiptTable).where(eq(schema.receiptTable.ownerId, userId));
    return receipts;

}catch(err){
    console.error("Error fetching user receipts:", err);
    throw err;


}
}


// async function main() {
//     const user: typeof usersTable.$inferInsert = {
//         username: 'John',
//         age: 30,
//         email: 'john@example.com',
//     };

//     await db.insert(usersTable).values(user);
//     console.log('New user created!')

//     const users = await db.select().from(usersTable);
//     console.log('Getting all users from the database: ', users)

// }

// main();
