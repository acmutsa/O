import { SquareArrowOutUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Attendees, MeetingCreator, MeetingDateTimeLocation, MeetingLinks } from "./server";
import { auth } from "@/lib/server/auth";
import { headers } from "next/headers";
import { db } from "@/db";

export default async function Page({ params }: { params: Promise<{ meeting_id: string }> }) {
  const { meeting_id: meetingID } = await params;

  const meetingPromise = db.query.meeting.findFirst({
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

  const sessionPromise = auth.api.getSession({
    headers: await headers()
  });

  const [meetingResult, sessionResult] = await Promise.all([meetingPromise, sessionPromise]);
  
  // If there is no meeting or user found
  if (!meetingResult || !sessionResult?.user) {
    notFound();
  }

  const attendees = meetingResult.attendees.map(({ user }) => ({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    image: user.image,
    positions: user.userToPositions.map(({ position }) => position.name)
  }));

  const { userToPositions: meetingCreatorToPositions, ...meetingCreatorRest } = meetingResult.creator;

  const meetingCreator = {
    ...meetingCreatorRest,
    positions: meetingCreatorToPositions.map(({ position }) => position.name)
  }

  const { id: userID } = sessionResult.user;
  const isAdmin = meetingResult.creator.id === userID;
  
  return (
    <div className="h-fit flex justify-center gap-10">
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-3xl">{meetingResult.title}</h1>
          {
            isAdmin || userID === "57ylfYzsqW3bCsSG6JOiNbefe2G7xBGq" && 
            <Link href="/" className="flex items-center gap-4 font-[600] bg-black dark:bg-white text-white dark:text-black px-5 py-2.5 rounded-md">
              Edit
              <SquareArrowOutUpRight />
            </Link>
          }
        </div>
        {
          (meetingResult.showAttendees || isAdmin) &&
          <Attendees attendees={attendees} previewLimit={3}/>
        }
        <MeetingDateTimeLocation
          rangeStart={meetingResult.rangeStart}
          rangeEnd={meetingResult.rangeEnd}
          startTime={meetingResult.startTime || new Date()}
          endTime={meetingResult.endTime || new Date()}
          location={meetingResult.location || "Unknown"}
          timeFormat="h:mm aa"
          dateFormat="MMMM do, yyyy (ccc)"
        />
        <MeetingLinks links={meetingResult.meetingLinks || []}/>
      </div>
      <div className="flex-1 flex flex-col gap-4">
        <h1 className="font-bold text-3xl">Details</h1>
        <h2 className="font-bold text-lg">Author</h2>
        <MeetingCreator meetingCreator={meetingCreator}/>
        <h2 className="font-bold text-lg">About</h2>
        <p className="font-[600] text-slate-600 dark:text-gray-400">{meetingResult.description}</p>
      </div>
    </div>
  );
}