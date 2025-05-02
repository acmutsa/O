import { SquareArrowOutUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import { getUserFromSession } from "@/actions/auth";
import { getMeetingDetails, getMeetingDetailsTest, MeetingDetails } from "@/actions/meetings";
import Link from "next/link";
import { Suspense } from "react";
import { Attendees, MeetingCreator } from "./server";
import { Separator } from "@/components/ui/separator";

export default async function Page({ params }: { params: Promise<{ meeting_id: string }> }) {
  const { meeting_id: meetingID } = await params;
  // const meetingResult = await getMeetingDetails({ meetingID });

  const user = await getUserFromSession();
  const meetingResult = await getMeetingDetailsTest();
  
  // If there is no meeting or user found
  if (!meetingResult?.data || !user?.data) {
    notFound();
  }

  const { data: meeting } = meetingResult;
  const { user: { id: userID } } = user.data;
  
  return (
    <main className="px-4 py-8">
      <div className="h-fit flex justify-center gap-1.5">
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-3xl">{meeting.title}</h1>
            { 
              userID === meeting.creatorID || userID === "57ylfYzsqW3bCsSG6JOiNbefe2G7xBGq" && 
              <Link href="/" className="flex items-center gap-4 font-[600] bg-black text-white px-7 py-3 rounded-md">
                Edit
                <SquareArrowOutUpRight />
              </Link>
            }
          </div>
          {
            meeting.showAttendees &&
            <Suspense fallback={<h1>Loading...</h1>}>
              <Attendees meetingID={meetingID} previewLimit={3}/>
            </Suspense>
          }
        </div>
        <Separator
          orientation="vertical"
          className="h-full mx-4"
        />
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="font-bold text-3xl">Details</h1>
          <h2 className="font-bold text-lg">Author</h2>
          <Suspense fallback={<h1>Loading meeting creator...</h1>}>
            <MeetingCreator meetingID={meetingID}/>
          </Suspense>
          <h2 className="font-bold text-lg">About</h2>
          <p className="font-[600] text-slate-600">{meeting.description}</p>
        </div>
      </div>
      
    </main>
  );
}