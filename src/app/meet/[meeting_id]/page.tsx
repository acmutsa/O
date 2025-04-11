import { db, eq } from "@/db";
import { meeting, meetingInvites } from "@/db/schema";
import { getUser } from "@/db/functions";
import { notFound } from "next/navigation";
import { getUserFromSession } from "@/actions/auth";

export default async function Page({ params }: { params: Promise<{ meeting_id: string }> }) {
  const { meeting_id: meetingID } = await params;

    
  const [fetchedMeeting] = await db.query.meeting.findMany({
    where: eq(meeting.meetingID, meetingID),
    columns: {
      createdAt: false
    }
  });
  
  // If there is no meeting found
  if (!fetchedMeeting)
    notFound();

  // Will be called separately
  const meetingAttendees = await db.query.meetingInvites.findMany({
    where: eq(meetingInvites.meetingID, meetingID)
  })

  const user = await getUserFromSession();
  
  return (
    <div>
      hi
      { 
        user?.data?.user.id === meetingID && 
        <div>
          You are admin!
        </div>
      }
      {
        fetchedMeeting.showAttendees &&
        <div>
          Attendees will be shown
        </div>
      }
    </div>
  );
}