/* Any server actions related to settings should be in this file. DO NOT REMOVE THE "use server" */
"use server";

import { z } from "zod";
import { userToTeams } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { authedAction } from "@/lib/server/safe-action";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { UserSettingsSchema } from "@/lib/zod";
import { user } from "@/db/schema";


// Schema for joining a team
const joinTeamSchema = z.object({
	teamId: z.string(),
});

// Action to join a team
export const joinTeam = authedAction
	.schema(joinTeamSchema)
	.action(async ({ ctx, parsedInput }) => {
		const { teamId } = parsedInput;
		const userId = ctx.session.user.id;

		try {
			// Check if user is already in the team
			const existingLink = await db.query.userToTeams.findFirst({
				where: (link, { eq, and }) =>
					and(eq(link.userId, userId), eq(link.teamId, teamId)),
			});

			if (existingLink) {
				return {
					success: false,
					message: "Already a member of this team",
				};
			}

			// Add user to team
			await db.insert(userToTeams).values({
				userId,
				teamId,
			});

			// Revalidate the settings page to reflect the changes
			revalidatePath("/settings");

			return { success: true, message: "Successfully joined team" };
		} catch (error) {
			console.error("Error joining team:", error);
			return { success: false, message: "Failed to join team" };
		}
	});

// Schema for leaving a team
const leaveTeamSchema = z.object({
	teamId: z.string(),
});

// Action to leave a team
export const leaveTeam = authedAction
	.schema(leaveTeamSchema)
	.action(async ({ ctx, parsedInput }) => {
		const { teamId } = parsedInput;
		const userId = ctx.session.user.id;

		try {
			// Check if user is in the team
			const existingLink = await db.query.userToTeams.findFirst({
				where: (link, { eq, and }) =>
					and(eq(link.userId, userId), eq(link.teamId, teamId)),
			});

			if (!existingLink) {
				return {
					success: false,
					message: "Not a member of this team",
				};
			}

			// Remove user from team
			await db
				.delete(userToTeams)
				.where(
					and(
						eq(userToTeams.userId, userId),
						eq(userToTeams.teamId, teamId),
					),
				);

			// Revalidate the settings page to reflect the changes
			revalidatePath("/settings");

			return { success: true, message: "Successfully left team" };
		} catch (error) {
			console.error("Error leaving team:", error);
			return { success: false, message: "Failed to leave team" };
		}
	});


export const updateSettingsActions = authedAction.schema(UserSettingsSchema).action(async ({ ctx: { session }, parsedInput: settingsData }) => {

    const userId = session.user.id;

    await db.update(user).set({
        ...settingsData
    }).where(eq(user.id, userId));
		revalidatePath("/settings");
    return {
        success: true,
    }


})