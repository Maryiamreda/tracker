import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq } from 'drizzle-orm';
import postgres from 'postgres';
import * as schema from './db/schema';
import * as bcrypt from 'bcrypt';
import * as validator from 'validator';
import  jwt from 'jsonwebtoken';

const client = postgres(process.env.SUPABASE_URL!);
const db = drizzle({ client });


type UserData ={
username: string;
  email: string;
  birthday: number;
  password: string;
}
// Login credentials type
type LoginCredentials = {
    email: string;
    password: string;
  };



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

//create user account 
async function createUser(userData:UserData) {
    try{
        if (!userData.username || !userData.email || !userData.birthday || !userData.password) {
            throw new Error("Missing required user information");
          }
          if (!validator.isEmail(userData.email)) {
            return { success: false, message: "Enter A Valid Email" }
        }
        if (userData.password.length < 8) {
            return { success: false, message: "Enter Strong Password" }

        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(userData.password, salt);
        // await db.insert(usersTable).values(user);


        const newUser = await db.insert(schema.usersTable)
        .values({
          username: userData.username,
          email: userData.email,
          birthday: userData.birthday, 
          password: hashedPassword
        }).returning();
        const token = jwt.sign({ userId: newUser[0].id }, process.env.JWT_SECRET!, { expiresIn: '1d' });

        return {
            success: true,
            message: "User created successfully",
            data: {
              newUser
            }
        }
    }catch(err){
        console.error("Error fetching user receipts:", err);
        throw err;
    }
    }

async function userLogin(credentials: LoginCredentials) {
  try{
    const { email, password } = credentials;
    if (!email || !password) {
        return { success: false, message: "Email and password are required" };
      }
  
      const users = await db.select()
      .from(schema.usersTable)
      .where(eq(schema.usersTable.email, email));
    
    if (users.length === 0) {
      return { 
        success: false, 
        message: "User doesn't exist" 
      };
    }

    const user = users[0];

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password!);
    if (!isMatch) {
        return { 
          success: false, 
          message: "Invalid credentials" 
        };
      }
      const token = jwt.sign(
        { userId: user.id }, 
        process.env.JWT_SECRET!, 
        { expiresIn: '1d' }
      );
      
      return { 
        success: true, 
        message: "Login successful",
        data: {
          token
        }
      };
   
}
catch(err){
    console.error("Error fetching user receipts:", err);
    throw err;
}
    }