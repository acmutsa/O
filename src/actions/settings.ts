/* Any server actions related to settings should be in this file. DO NOT REMOVE THE "use server" */
"use server";
import { userAction } from "@/lib/safe-action";
import { UserSettingsSchema } from "@/lib/zod";
import { user } from "@/db/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";

export const updateSettingsActions = userAction.schema(UserSettingsSchema).action(async ({ ctx: { userData }, parsedInput: settingsData }) => {

    const userId = userData.user.id;

    await db.update(user).set({
        ...settingsData
    }).where(eq(user.id, userId));

    return {
        success: true,
    }


})