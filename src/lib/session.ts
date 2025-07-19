import { cookies } from "next/headers";
import { decrypt } from "../server/auth";

export async function getUserFromSession() {
const cookieStore = await cookies();
const session = cookieStore.get("session")?.value; //gets the token stored in browser's cookie storage
if (!session) return null;
const payload = await decrypt(session); //decrypts the JWT token and extracts the user data from it 
if (!payload?.userId) return null;
return { userId: payload.userId, payload };

}