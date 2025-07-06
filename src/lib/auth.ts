//this file going to handle our jwt token
import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey); //encoding the secret key from  .env into a format that the JWT library can use for encryption


type SessionPayload = {
    userId: string;
    expiresAt: Date;
};
//All this function does is create a JWT (Json Web Token) 
export async function encrypt(payload: SessionPayload) {
    return new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(encodedKey); //signs the JWT using the encoded secret key
}


export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify session");
  }
}

  
export async function createSession(userId: string) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const session = await encrypt({ userId, expiresAt }); //Json Web Token
    const cookieStore = await cookies();

    // @ts-ignore
    cookieStore.set("session", session, {
      //Using HTTP-only cookies 
      httpOnly: true,
      secure: true,
      expires: expiresAt,
    });
  }

export async function deleteSession() {
      // @ts-ignore
  cookies().delete("session");
}


