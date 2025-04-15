/*
This is the Next JS middleware file. It is used to protect the routes in the application.
It only checks if there is a session cookie in the right manner, but not if the session is valid. 

==> IT IS IMPORTANT TO AUTH ON ANY ROUTE THAT IS NOT /sign-in THAT NEEDS PROTECTION. <==

Please ask a project lead before changing this file.

*/

import { after, NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import { linksDomains } from "./o.config";
import { db } from "./db";
import { clicks, links } from "@/db/schema";
import { eq, sql, and } from "drizzle-orm";

export async function middleware(req: NextRequest) {
	const { pathname, hostname } = req.nextUrl;
	const isDev = process.env.NODE_ENV !== "production";

	// --- 1. Handle Golinks FIRST ---
	const isLinkDomainRequest = (linksDomains as readonly string[]).includes(
		hostname,
	);
	const isLinkTestRequest = isDev && pathname.startsWith("/linktest");

	if (isLinkDomainRequest || isLinkTestRequest) {
		if (pathname === "/link-not-found") {
			return NextResponse.next();
		}

		const slug = isLinkTestRequest
			? pathname.replace("/linktest", "")
			: pathname;

		if (slug && slug !== "/") {
			try {
				const link = await db.query.links.findFirst({
					where: and(
						eq(links.slug, slug),
						eq(
							links.host,
							isLinkTestRequest ? linksDomains[0] : hostname,
						),
					),
				});

				if (!link) {
					return NextResponse.rewrite(
						new URL("/link-not-found", req.url),
					);
				}

				after(async () => {
					const referrerFromQuery =
						req.nextUrl.searchParams.get("ref");
					const referrerValue =
						referrerFromQuery ?? req.headers.get("referer") ?? null;
					await db
						.update(links)
						.set({
							clicks: sql`${links.clicks} + 1`,
						})
						.where(eq(links.id, link.id));
					await db.insert(clicks).values({
						linkId: link.id,
						referrer: referrerValue,
					});
				});

				return NextResponse.redirect(new URL(link.toUrl));
			} catch (error) {
				console.error("[Middleware] DB Error looking up link:", error);
				return NextResponse.rewrite(
					new URL("/link-not-found", req.url),
				);
			}
		}
	}

	// --- 2. Handle Authentication for NON-Golink Requests (or fallthrough) ---
	const sessionCookie = getSessionCookie(req, {
		cookiePrefix: "O",
	});

	if (!sessionCookie) {
		if (pathname !== "/") {
			return NextResponse.redirect(new URL("/", req.url));
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
};
