/* Any server actions related to meetings should be in this file. DO NOT REMOVE THE "use server" */
"use server";

import { count, and, eq, db } from "@/db";
import { meeting, meetingInvites } from "@/db/schema";
import { userAction } from "@/lib/safe-action";
import z from "zod";
import { createSelectSchema } from 'drizzle-zod';
import { InferSafeActionFnResult } from "next-safe-action";

const MeetingIDSchema = z.object({
  meetingID: z.string()
});

const PreviewLimitSchema = z.object({
  previewLimit: z.number()
}).merge(MeetingIDSchema);

export const getMeetingDetails = userAction
  .schema(MeetingIDSchema)
  .action(async ({ parsedInput: { meetingID } }) => {
    const fetchedMeeting = await db.query.meeting.findFirst({
      where: (meeting, { eq }) => eq(meeting.meetingID, meetingID),
      columns: {
        createdAt: false
      }
    });

    return fetchedMeeting;
  });

type MeetingDetailsTest = InferSafeActionFnResult<typeof getMeetingDetails>["data"];

export const getMeetingDetailsTest = userAction
  .action(async () => {
    const data: MeetingDetailsTest = await new Promise((resolve) => {
      setTimeout(() => {
        resolve({
            meetingID: "1",
            description: "Test meeting description",
            creatorID: "1",
            title: "Test meeting title",
            rangeStart: new Date(),
            rangeEnd: new Date(),
            startTime: new Date(),
            endTime: new Date(),
            showAttendees: true,
            location: "123 Place",
            meetingLinks: ["https://acmutsa.org, https://youtube.com"]
          }
        );
      }, 3000);
    });

    return data;
  });

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
    
    return data;
  });

type AttendeeCountTest = InferSafeActionFnResult<typeof getAttendeeCount>["data"];

export const getAttendeeCountTest = userAction
  .action(async () => {
    const data: AttendeeCountTest = await new Promise((resolve) => {
      setTimeout(() => {
        resolve([{ count: 1 }])
      }, 3000);
    });

    return data;
  });

// For previewing (showing images) of the first [previewLimit] attendees of the meeting
export const getAttendeesImages = userAction
  .schema(PreviewLimitSchema)
  .action(async ({ parsedInput: { meetingID, previewLimit } }) => {
    const data = await db.query.meetingInvites.findMany({
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

type AttendeesImagesTest = InferSafeActionFnResult<typeof getAttendeesImages>["data"];

export const getAttendeesImagesTest = userAction
  .action(async () => {
    const data: AttendeesImagesTest = await new Promise((resolve) => {
      setTimeout(() => {
        resolve([{
          user: {
            id: "1",
            image: null
          }
        }]);
      }, 3000);
    });

    return data;
  });

export const getAllAttendees = userAction
  .schema(MeetingIDSchema)
  .action(async ({ parsedInput: { meetingID } }) => {
    const data = await db.query.meetingInvites.findMany({
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

  
type AttendeesTest = InferSafeActionFnResult<typeof getAllAttendees>["data"];

export const getAllAttendeesTest = userAction
  .action(async () => {
    const data: AttendeesTest = await new Promise((resolve) => {
      setTimeout(() => {
        resolve([{
          user: {
            id: "1",
            firstName: "John",
            lastName: "Doe",
            image: null,
            userToPositions: [{
              position: {
                name: "Officer"
              }
            }]
          }
        }]);
      }, 3000);
    });

    return data;
  });