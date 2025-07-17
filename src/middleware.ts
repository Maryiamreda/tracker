//Implements route protection middleware

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/auth";
import ROUTES from "@/lib/routes";
import { getUserFromSession } from "@/lib/session";

const protectedRoutes = [ROUTES.USER.RECEIPTS , "/"];
const publicRoutes = [ROUTES.LOGIN, ROUTES.SIGNUP];


//get the path fron nextjs headers
export default async function middleware(req: NextRequest) {
   const path = req.nextUrl.pathname;
  
   console.log('my path is this ',path)
 
    return handleUserRoutes(req, path);
  
}


async function handleUserRoutes(req: NextRequest, path: string) {

const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));
const isPublicRoute = publicRoutes.some(route => path === route);
//   const cookie = cookies().get("session")?.value; 
//   const session = await decrypt(cookie); 
    const user = await getUserFromSession();

  if (isProtectedRoute && !user?.userId) { //no valid user session 
    return NextResponse.redirect(new URL(ROUTES.LOGIN, req.nextUrl));
  }

  if (isPublicRoute && user?.userId) {

    return NextResponse.redirect(new URL(ROUTES.USER.RECEIPTS, req.nextUrl));
  }
  
  return NextResponse.next();

}
// specifies which routes the middleware should run on.
export const config = {
  matcher: [
    // Match all user routes
    "/",
    ROUTES.LOGIN, 
    ROUTES.SIGNUP,
    ROUTES.USER.RECEIPTS, 
    // '/create-account',
    // '/mybookings/:path*',
    // '/my-bookings/:path*',
    // Match all admin routes
    // '/admin/:path*'
  ],
};