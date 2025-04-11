import { db, eq } from "@/db";
import { meeting, meetingInvites } from "@/db/schema";
import { getUser } from "@/db/functions";
import { notFound } from "next/navigation";
import { getUserFromSession } from "@/actions/auth";
import { getMeetingDetails } from "@/actions/meetings";

export default async function Page({ params }: { params: Promise<{ meeting_id: string }> }) {
  const { meeting_id: meetingID } = await params;
  const fetchedMeeting = await getMeetingDetails({ meetingID });
  
  // If there is no meeting found
  if (!fetchedMeeting?.data)
    notFound();

  const { data: meeting } = fetchedMeeting;

  const user = await getUserFromSession();
  
  return (
    <div>
      { 
        user?.data?.user.id === meetingID && 
        <div>
          You are admin!
        </div>
      }
      {
        meeting.showAttendees &&
        <div>
          Attendees will be shown
        </div>
      }
    </div>
  );
}