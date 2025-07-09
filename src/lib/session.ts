import { cookies } from "next/headers";
import { decrypt } from "./auth";

export async function getUserFromSession() {
const cookieStore = await cookies();
const session = cookieStore.get("session")?.value;
if (!session) return null;
const payload = await decrypt(session);
if (!payload?.userId) return null;
return { userId: payload.userId, payload };

}