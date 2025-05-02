/* Any server actions related to meetings should be in this file. DO NOT REMOVE THE "use server" */
"use server";

import { count, and, eq, db } from "@/db";
import { meeting, meetingInvites } from "@/db/schema";
import { userAction } from "@/lib/safe-action";
import z from "zod";
import { createSelectSchema } from 'drizzle-zod';
import { InferSafeActionFnResult } from "next-safe-action";

const testMeetingDescription = `
  Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

  Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
`;

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

export type MeetingDetails = InferSafeActionFnResult<typeof getMeetingDetails>["data"];

export const getMeetingDetailsTest = userAction
  .action(async () => {
    const data: MeetingDetails = await new Promise((resolve) => {
      setTimeout(() => {
        resolve({
            meetingID: "1",
            description: testMeetingDescription,
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
      }, 1500);
    });

    return data;
  });

export const getMeetingCreator = userAction
  .schema(MeetingIDSchema)
  .action(async ({ parsedInput: { meetingID } }) => {
    const fetchedMeetingCreator = await db.query.meeting.findFirst({
      where: (meeting, { eq }) => eq(meeting.meetingID, meetingID),
      columns: {},
      with: {
        creator: {
          columns: {
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
    });

    return fetchedMeetingCreator;
  });

export type MeetingCreator = InferSafeActionFnResult<typeof getMeetingCreator>["data"];

export const getMeetingCreatorTest = userAction
  .action(async () => {
    const data: MeetingCreator = await new Promise((resolve) => {
      setTimeout(() => resolve({
        creator: {
          firstName: "First",
          lastName: "Last",
          image: null,
          userToPositions: [{
            position: {
              name: "ACM Projects Officer"
            }
          },
          {
            position: {
              name: "RowdyHacks Director"
            }
          },
          {
            position: {
              name: "ICPC Director"
            }
          }]
        }
      }), 1500);
    })

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

export type AttendeeCount = InferSafeActionFnResult<typeof getAttendeeCount>["data"];

export const getAttendeeCountTest = userAction
  .action(async () => {
    const data: AttendeeCount = await new Promise((resolve) => {
      setTimeout(() => {
        resolve([{ count: 1 }])
      }, 1500);
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

export type AttendeesImages = InferSafeActionFnResult<typeof getAttendeesImages>["data"];

export const getAttendeesImagesTest = userAction
  .action(async () => {
    const data: AttendeesImages = await new Promise((resolve) => {
      setTimeout(() => {
        resolve([{
          user: {
            id: "1",
            image: null
          }
        }]);
      }, 1500);
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

  
export type Attendees = InferSafeActionFnResult<typeof getAllAttendees>["data"];

export const getAllAttendeesTest = userAction
  .action(async () => {
    const data: Attendees = await new Promise((resolve) => {
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
      }, 1500);
    });

    return data;
  });