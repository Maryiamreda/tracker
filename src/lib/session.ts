import { cookies } from "next/headers";
import { decrypt } from "../server/auth";
type SessionPayload = {
  userId: string;
  userName: string;
  [key: string]: any; // optional for extra properties
};


export async function getUserFromSession(): Promise<{ userId: string, userName: string, payload: any } | null> {
const cookieStore = await cookies();
const session = cookieStore.get("session")?.value; //gets the token stored in browser's cookie storage
if (!session) return null;
const payload = await decrypt(session) as SessionPayload;

  if (!payload?.userId || !payload?.userName) return null;//decrypts the JWT token and extracts the user data from it 
return { userId: payload.userId, 
 userName: payload.userName, 
      payload };
}