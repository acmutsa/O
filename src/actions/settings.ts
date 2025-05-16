/* Any server actions related to settings should be in this file. DO NOT REMOVE THE "use server" */
"use server";

import { z } from "zod";
import { db } from "@/db";
import { userToCohorts } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { authedAction } from "@/lib/server/safe-action";
import { and, eq } from "drizzle-orm";

// Schema for joining a cohort
const joinCohortSchema = z.object({
	cohortId: z.string(),
});

// Action to join a cohort
export const joinCohort = authedAction
	.schema(joinCohortSchema)
	.action(async ({ ctx, parsedInput }) => {
		const { cohortId } = parsedInput;
		const userId = ctx.session.user.id;

		try {
			// Check if user is already in the cohort
			const existingLink = await db.query.userToCohorts.findFirst({
				where: (link, { eq, and }) =>
					and(eq(link.userId, userId), eq(link.cohortId, cohortId)),
			});

			if (existingLink) {
				return {
					success: false,
					message: "Already a member of this cohort",
				};
			}

			// Add user to cohort
			await db.insert(userToCohorts).values({
				userId,
				cohortId,
			});

			// Revalidate the settings page to reflect the changes
			revalidatePath("/settings");

			return { success: true, message: "Successfully joined cohort" };
		} catch (error) {
			console.error("Error joining cohort:", error);
			return { success: false, message: "Failed to join cohort" };
		}
	});

// Schema for leaving a cohort
const leaveCohortSchema = z.object({
	cohortId: z.string(),
});

// Action to leave a cohort
export const leaveCohort = authedAction
	.schema(leaveCohortSchema)
	.action(async ({ ctx, parsedInput }) => {
		const { cohortId } = parsedInput;
		const userId = ctx.session.user.id;

		try {
			// Check if user is in the cohort
			const existingLink = await db.query.userToCohorts.findFirst({
				where: (link, { eq, and }) =>
					and(eq(link.userId, userId), eq(link.cohortId, cohortId)),
			});

			if (!existingLink) {
				return {
					success: false,
					message: "Not a member of this cohort",
				};
			}

			// Remove user from cohort
			await db
				.delete(userToCohorts)
				.where(
					and(
						eq(userToCohorts.userId, userId),
						eq(userToCohorts.cohortId, cohortId),
					),
				);

			// Revalidate the settings page to reflect the changes
			revalidatePath("/settings");

			return { success: true, message: "Successfully left cohort" };
		} catch (error) {
			console.error("Error leaving cohort:", error);
			return { success: false, message: "Failed to leave cohort" };
		}
	});
