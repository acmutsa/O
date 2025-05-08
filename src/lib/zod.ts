/* This will be for any zod schemas that are used in the application. */
import { z } from "zod";

export const UserSettingsSchema = z.object({
    firstName: z.string().min(1).max(100),
    lastName: z.string().min(1).max(100),
    pronouns: z.string().min(1).max(100),
})
