import { SquareArrowOutUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import { getUserFromSession } from "@/actions/auth";
import { getMeetingDetails, getMeetingDetailsTest } from "@/actions/meetings";
import Link from "next/link";

export default async function Page({ params }: { params: Promise<{ meeting_id: string }> }) {
  const { meeting_id: meetingID } = await params;
  // const meetingResult = await getMeetingDetails({ meetingID });

  const meetingResult = await getMeetingDetailsTest();
  
  // If there is no meeting found
  if (!meetingResult?.data) {
    console.log("data was not found.");
    notFound();
  }

  const { data: meeting } = meetingResult;
  const user = await getUserFromSession();
  
  return (
    <div>
      { 
        user?.data?.user.id === meetingID && 
        <Link href="">
          <SquareArrowOutUpRight />
        </Link>
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