//Implements route protection middleware

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/auth";
import ROUTES from "@/lib/routes";
import { getUserFromSession } from "@/lib/session";

const protectedRoutes = ["/account" , "/" ]; // Fixed: Use static paths
const publicRoutes = [ROUTES.LOGIN, ROUTES.SIGNUP];


//get the path fron nextjs headers
export default async function middleware(req: NextRequest) {
   const path = req.nextUrl.pathname;
     


   console.log('my path is this ',path)
 
return handleUserRoutes(req, path);
  
}


async function handleUserRoutes(req: NextRequest, path: string) {
const isPublicRoute = publicRoutes.some(route => path === route);
if (isPublicRoute) {
    const user = await getUserFromSession();
    // If user is logged in redirect to receipts
    if (user?.userId) {
      return NextResponse.redirect(new URL("/", req.url));
    }
   return NextResponse.next();
 }

 const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));
  
  if (isProtectedRoute) {
    console.log('Protected route detected:', path);
    const user = await getUserFromSession();
    
    if (!user?.userId) {
      console.log('No user session, redirecting to login');
      return NextResponse.redirect(new URL(ROUTES.LOGIN, req.nextUrl));
    }
      return NextResponse.next();
  }
      
//   const cookie = cookies().get("session")?.value; 
//   const session = await decrypt(cookie); 
   
}


// specifies which routes the middleware should run on.
export const config = {
  matcher: [
    "/",
    "/auth/signin", 
    "/auth/register", 
     '/account/:path*',
  ],
};