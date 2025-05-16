/* Any server actions related to meetings should be in this file. DO NOT REMOVE THE "use server" */
"use server";

import { authedAction } from "@/lib/server/safe-action";
import { MeetingCreationSchema } from "@/lib/zod";
import { db } from "@/db";
import { meeting, meetingInvites } from '@/db/schema/meeting.schema';
import { nanoid } from "nanoid";
import { sql } from "drizzle-orm";
import { parse, isValid, format, parseISO } from 'date-fns';

export const createMeeting = authedAction.schema(MeetingCreationSchema).action(async ({ ctx: { session }, parsedInput }) => {
    const { id: userId } = session.user;
    const meetingId = nanoid();
    const { invitedUsers, ...meetingData } = parsedInput;

    // parse dates using date-fns
    const startDate = parseISO(meetingData.rangeStart);
    const endDate = parseISO(meetingData.rangeEnd);

    // validate dates with date-fns
    if (!isValid(startDate)) {
        return {
          success: false,
          error: "Invalid start date"
        };
    }
    
    if (!isValid(endDate)) {
        return {
            success: false,
            error: "Invalid end date",
        };
    }

    let startTime = null;
    let endTime = null;
    
    // parse times using date-fns
    if (meetingData.startTime && meetingData.startTime.trim() !== "" && meetingData.startTime !== "none") {
      const parsedTime = parse(meetingData.startTime, 'HH:mm', new Date());
      if (isValid(parsedTime)) {
        // create a time value based on milliseconds since midnight
        startTime = parsedTime.getHours() * 3600000 + parsedTime.getMinutes() * 60000;
      }
    }
    
    if (meetingData.endTime && meetingData.endTime.trim() !== "" && meetingData.endTime !== "none") {
      const parsedTime = parse(meetingData.endTime, 'HH:mm', new Date());
      if (isValid(parsedTime)) {
        endTime = parsedTime.getHours() * 3600000 + parsedTime.getMinutes() * 60000;
      }
    }

    try {
        // insert meeting data
        await db.insert(meeting).values({
            meetingID: meetingId,
            creatorID: userId,
            title: meetingData.title,
            description: meetingData.description || "",
            rangeStart: sql`${startDate.getTime()}`,
            rangeEnd: sql`${endDate.getTime()}`,
            startTime: startTime ? sql`${startTime}` : null,
            endTime: endTime ? sql`${endTime}` : null,
            location: meetingData.location || "",
            meetingLinks: meetingData.meetingLinks || [],
            showAttendees: meetingData.showAttendees
        });

        // insert meeting invites
        if (invitedUsers.length > 0) {
            await db.insert(meetingInvites).values(
                invitedUsers.map((userId) => ({
                    meetingID: meetingId,
                    id: userId,
                    hasAccepted: false,
                }))
            );
        }

        return {
            success: true,
            meetingId,
        };
    } catch (error) {
        return {
            success: false,
            error: "Failed to create meeting",
        };
    }
});
