import { count, eq, and, db } from "@/db";
import defaultProfilePicture from "@/img/default-profile-picture.jpg";
import Image from "next/image";
import { meetingInvites } from "@/db/schema";
import AttendeesList from "./attendees-list"

// Returns the count of all the meeting attendees
async function getAttendeeCount(meetingID: string) {
  return db.select({ count: count() })
    .from(meetingInvites)
    .where(
      and(
        eq(meetingInvites.meetingID, meetingID),
        eq(meetingInvites.hasAccepted, true)
      )
    );
}

// For previewing (showing images) of the first [previewLimit] attendees of the meeting
async function getAttendeesImages(meetingID: string, previewLimit: number) {
  return db.query.meetingInvites.findMany({
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
}

export default async function Attendees({ meetingID, previewLimit }: { meetingID: string, previewLimit: number }) {
  const attendeeImages = await getAttendeesImages(meetingID, previewLimit);
  const [{ count: attendeeCount }] = await getAttendeeCount(meetingID);
  
  return (
    <div>
      <h2>Attendees</h2>
      <h3>{attendeeCount}</h3>
      <div>
        {
          attendeeImages.map(({ user }) => (
            <Image
              src={user.image || defaultProfilePicture}
              alt="A profile picture"
              width={50}
              height={50}
              className="rounded-full object-cover"
            />
          ))
        }
        {/* For displaying the number of attendees that did not appear in the preview*/}
        {
          attendeeImages.length < attendeeCount &&
          <div className="h-[50px] w-[50px] rounded-full">
            + {attendeeCount - attendeeImages.length}
          </div>
        }
      </div>
      <AttendeesList meetingID={meetingID}/>
    </div>
  );
}