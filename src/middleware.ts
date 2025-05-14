import { betterFetch } from "@better-fetch/fetch";
import type { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { db, eq } from "./db";
import {user} from "./db/schema"

type Session = typeof auth.$Infer.Session;

export async function middleware(request: NextRequest) {
  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: request.nextUrl.origin,
      headers: {
        cookie: request.headers.get("cookie") || "", // Forward the cookies from the request
      },
    }
  );

  const hasSession = !!session;
  const userRequestedSignIn = request.nextUrl.pathname === "/sign-in";
  if (hasSession && userRequestedSignIn) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  else if (!hasSession && userRequestedSignIn){
    return NextResponse.next();
  }

  if (!hasSession) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
};

