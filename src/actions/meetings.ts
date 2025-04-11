/* Any server actions related to meetings should be in this file. DO NOT REMOVE THE "use server" */
"use server";

import { count, and, eq, db } from "@/db";
import { meetingInvites } from "@/db/schema";
import { userAction } from "@/lib/safe-action";
import z from "zod";

const MeetingIDSchema = z.object({
  meetingID: z.string()
});

const PreviewLimitSchema = z.object({
  previewLimit: z.number()
}).merge(MeetingIDSchema);

export const getAttendeeCount = userAction
  .schema(MeetingIDSchema)
  .action(async ({ parsedInput: { meetingID } }) => {
    const data = await db.select({ count: count() })
      .from(meetingInvites)
      .where(
        and(
          eq(meetingInvites.meetingID, meetingID),
          eq(meetingInvites.hasAccepted, true)
        )
      );
  });

// For previewing (showing images) of the first [previewLimit] attendees of the meeting
export const getAttendeesImages = userAction
  .schema(PreviewLimitSchema)
  .action(async ({ parsedInput: { meetingID, previewLimit } }) => {
    const data = db.query.meetingInvites.findMany({
      where: (meetingInvites, { eq, and }) => and(eq(meetingInvites.meetingID, meetingID), eq(meetingInvites.hasAccepted, true)),
      columns: {},
      with: {
        user: {
          columns: {
            id: true,
            image: true
          }
        }
      },
      limit: previewLimit
    });

    return data;
  })

export const getAllAttendees = userAction
  .schema(MeetingIDSchema)
  .action(async ({ parsedInput: { meetingID } }) => {
    const data = db.query.meetingInvites.findMany({
      where: (meetingInvites, { eq, and }) => and(eq(meetingInvites.meetingID, meetingID), eq(meetingInvites.hasAccepted, true)),
      columns: {},
      with: {
        user: {
          columns: {
            id: true,
            firstName: true,
            lastName: true,
            image: true
          },
          with: {
            userToPositions: {
              columns: {},
              with: {
                position: {
                  columns: {
                    name: true
                  }
                }
              }
            }
          }
        }
      }
    })

    return data;
  });
