/*
This file is for any Any database functions that occur more than twice. 
This not only ensures a signle source of truth for the function, but also allows for easier testing and debugging.
*/
import { db,  } from ".";
import { user } from "./schema"
import { eq } from "drizzle-orm";

export async function getUser(userID: string) {
  return db.query.user.findFirst({
    where:eq(user.id, userID)
  })
}

export async function getMeetingDetails(meetingID: string) {
  return db.query.meeting.findFirst({
    where: (meeting, { eq }) => eq(meeting.meetingID, meetingID),
    columns: {
      creatorID: false
    },
    with: {
      creator: {
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
      },
      attendees: {
        where: (meetingInvites, { eq }) => eq(meetingInvites.hasAccepted, true),
        columns: {},
        with: {
          user: {
            columns: {
              id: true,
              firstName: true,
              lastName: true,
              image: true,
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
      }
    }
  });
}

export function getMeetingDetailsTest(): Meeting {
  return {
    meetingID: "1",
    createdAt: new Date(),
    title: "Meeting Title Test",
    attendees: [{
      user: {
        id: "1",
        firstName: "First",
        lastName: "Last",
        image: null,
        userToPositions: [{
          position: {
            name: "ACM Officer"
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
    }],
    creator: {
      id: "1",
      firstName: "First",
      lastName: "Last",
      image: null,
      userToPositions: [{
        position: {
          name: "ACM Officer"
        }
      }]
    },
    description: `
      Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

      Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
    `,
    startTime: new Date(),
    endTime: new Date(),
    location: "NPB 467",
    rangeStart: new Date(),
    rangeEnd: new Date(),
    showAttendees: true,
    meetingLinks: ["https://www.youtube.com/watch?v=dQw4w9WgXcQ"]
  };
}

export type Meeting = Awaited<ReturnType<typeof getMeetingDetails>>;
