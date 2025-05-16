"use server";

import { adminAction } from "@/lib/server/safe-action";
import { z } from "zod";
import { db } from "@/db";
import { suborgs, cohorts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";

export const createSuborg = adminAction
	.schema(
		z.object({
			fullname: z.string().min(1),
			shortname: z.string().min(1),
		}),
	)
	.action(async ({ ctx, parsedInput }) => {
		const { fullname, shortname } = parsedInput;

		const suborg = await db
			.insert(suborgs)
			.values({
				fullname,
				shortname,
				slug: shortname.toLowerCase().replace(/ /g, "-"),
			})
			.returning();

		return suborg[0];
	});

export const createCohort = adminAction
	.schema(
		z.object({
			suborgSlug: z.string().min(1),
			name: z.string().min(1),
			startDate: z.date(),
			endDate: z.date(),
		}),
	)
	.action(async ({ ctx, parsedInput }) => {
		const { suborgSlug, name, startDate, endDate } = parsedInput;

		const suborg = await db.query.suborgs.findFirst({
			where: eq(suborgs.slug, suborgSlug),
		});

		if (!suborg) {
			throw new Error("Suborg not found");
		}

		const cohort = await db
			.insert(cohorts)
			.values({
				id: nanoid(8),
				name,
				suborgSlug,
				startDate,
				endDate,
			})
			.returning();

		return cohort[0];
	});
