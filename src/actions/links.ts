"use server";

import { authedAction } from "@/lib/server/safe-action";
import { z } from "zod";
import { linksDomains } from "@/o.config";
import { db } from "@/db";
import { links as linksTable } from "@/db/schema";
import { eq, and, ne } from "drizzle-orm";
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

export const updateLink = authedAction
	.schema(
		z.object({
			linkId: z.string(),
			slug: z
				.string()
				.min(1, "Slug is required")
				.startsWith("/")
				.regex(/^\/[a-zA-Z0-9_-]*$/, {
					message:
						"Slug must contain only letters, numbers, underscores, and dashes",
				})
				.transform(async (s) => s.toLowerCase()),
			toUrl: z.string().url("Must be a valid URL"),
		}),
	)
	.action(async ({ ctx: { session }, parsedInput }) => {
		const { linkId, slug, toUrl } = parsedInput;
		const { id: userID } = session.user;

		const existingLink = await db.query.links.findFirst({
			where: and(
				eq(linksTable.id, linkId),
				eq(linksTable.authorId, userID),
			),
		});

		if (!existingLink) {
			return {
				success: false as const,
				error: "Link not found or you don't have permission to update it.",
			};
		}

		const conflictingLink = await db.query.links.findFirst({
			where: and(
				eq(linksTable.slug, slug as `/${string}`),
				eq(linksTable.host, existingLink.host),
				eq(linksTable.authorId, userID),
				ne(linksTable.id, linkId),
			),
		});

		if (conflictingLink && conflictingLink.id !== linkId) {
			return {
				success: false as const,
				error: "Another link with this slug and host already exists.",
			};
		}

		await db
			.update(linksTable)
			.set({
				slug: slug as `/${string}`,
				toUrl: toUrl,
			})
			.where(eq(linksTable.id, linkId));

		revalidatePath(`/links/${linkId}`);
		revalidatePath("/links");

		return {
			success: true as const,
			message: "Link updated successfully!",
		};
	});
