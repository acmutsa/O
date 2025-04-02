/*
This is the Next JS middleware file. It is used to protect the routes in the application.
It checks if the user is authenticated and redirects them to the sign-in page if they are not.
Please ask a project lead before changing this file.
*/

import { NextRequest, NextResponse } from "next/server";
import { getServerAuth } from "./lib/utils";

export async function middleware(request: NextRequest) {
  const { data: session } = await getServerAuth(request.nextUrl.origin, request.headers.get("cookie") || "");

  const hasSession = !!session;
  const userRequestedSignIn = request.nextUrl.pathname === "/sign-in";
  if (hasSession && userRequestedSignIn) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  else if (!hasSession && userRequestedSignIn){
    return NextResponse.next();
  }
  
  if (!hasSession) {
    console.log("No session found, redirecting to sign-in");
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
};

