//this file going to handle our jwt token
import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey); //encoding the secret key from  .env into a format that the JWT library can use for encryption
