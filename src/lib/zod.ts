/* This will be for any zod schemas that are used in the application. */
import { z } from "zod";

export const MeetingCreationSchema = z.object({
    title: z.string().max(255).nonempty("Title is required"),
    description: z.string().max(255).optional(),
    rangeStart: z.string({ required_error: "Invalid Start Date" }).nonempty("Invalid Start Date"),
    rangeEnd: z.string({ required_error: "Invalid End Date" }).nonempty("Invalid End Date"),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
    location: z.string().max(255).optional(),
    meetingLinks: z.array(z.string()).optional().default([]),
    showAttendees: z.boolean().default(false),
    invitedUsers: z.array(z.string()).min(1, "At least one user must be invited").default([])
}).refine(data => {
    if (!data.startTime || !data.endTime) return true;
    return data.endTime > data.startTime;
}, {
    message: "End time must be after start time",
    path: ["endTime"]
});
