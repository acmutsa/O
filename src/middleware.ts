/*
This is the Next JS middleware file. It is used to protect the routes in the application.
It only checks if there is a session cookie in the right manner, but not if the session is valid. 

==> IT IS IMPORTANT TO AUTH ON ANY ROUTE THAT IS NOT /sign-in THAT NEEDS PROTECTION. <==

Please ask a project lead before changing this file.

*/

import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
	const sessionCookie = getSessionCookie(request, {
		cookiePrefix: "O",
	});

	if (!sessionCookie) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
};
