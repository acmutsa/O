"use server";

import { authedAction } from "@/lib/server/safe-action";
import { z } from "zod";
import { linksDomains } from "@/o.config";
import { db } from "@/db";
import { links as linksTable } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";

export const createLink = authedAction
	.schema(
		z.object({
			slug: z
				.string()
				.min(1)
				.startsWith("/")
				.regex(/^\/[a-zA-Z0-9_-]*$/, {
					message:
						"Slug must contain only letters, numbers, underscores, and dashes",
				})
				.transform(async (s) => s.toLowerCase()),
			host: z.enum(linksDomains),
			toUrl: z.string().url(),
		}),
	)
	.action(async ({ ctx: { session }, parsedInput }) => {
		const { slug, host, toUrl } = parsedInput;
		const { id: userID } = session.user;

		const existingLink = await db.query.links.findFirst({
			where: and(
				eq(linksTable.slug, slug as `/${string}`),
				eq(linksTable.host, host),
			),
		});

		if (existingLink) {
			return {
				success: false as const,
				error: "Link already exists. Please either update the previous link, or choose another slug / domain name!",
			};
		}

		const linkID = nanoid();

		await db.insert(linksTable).values({
			id: linkID,
			host: host,
			slug: slug as `/${string}`,
			authorId: userID,
			toUrl: toUrl,
		});

		revalidatePath("/links");

		return {
			success: true as const,
			message: "Link created successfully!",
			linkID,
		};
	});
