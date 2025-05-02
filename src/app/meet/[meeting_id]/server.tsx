"use server";

import defaultProfilePicture from "@/img/default-profile-picture.jpg";
import Image from "next/image";
import { getAttendeesImages, getAttendeeCount, getAttendeeCountTest, getAttendeesImagesTest, getMeetingCreatorTest } from "@/actions/meetings";
import { AllAttendees } from "./client";
import { Separator } from "@/components/ui/separator";
import { notFound } from "next/navigation";
import { toast } from "sonner";

export async function Attendees({ meetingID, previewLimit }: { meetingID: string, previewLimit: number }) {
  // const attendeeImagesResult = await getAttendeesImages({ meetingID, previewLimit });
  // const attendeeCountResult = await getAttendeeCount({ meetingID });

  const attendeeImagesResult = await getAttendeesImagesTest();
  const attendeeCountResult = await getAttendeeCountTest();
  
  const [{ count: attendeeCount }] = attendeeCountResult?.data || [{ count: 0 }];
  const attendeeImages = attendeeImagesResult?.data;
  const remainingAttendees = attendeeCount - previewLimit;
  
  return (
    <div className="border border-slate-300 p-4 rounded-md">
      <div className="flex items-center gap-2.5">
        <h2 className="inline font-bold text-xl">Attendees</h2>
        <div className="size-8 flex justify-center items-center text-lg font-bold bg-black text-white rounded-full">{attendeeCount}</div>
      </div>
      <Separator className="my-4"/>
      <div className="flex justify-between items-end">
        <div className="w-fit flex justify-between items-center gap-2">
          {
            (attendeeImages && attendeeImages.length > 0) && attendeeImages.map(({ user }) => (
              <Image
                key={user.id}
                src={user.image || defaultProfilePicture}
                alt="A profile picture"
                width={50}
                height={50}
                className="rounded-full object-cover"
              />
            ))
          }
          {
            remainingAttendees >= 0 &&
            <div className="h-[50px] w-[50px] bg-gray-400 rounded-full">
              + {remainingAttendees}
            </div>
          }
        </div>
        <AllAttendees meetingID={meetingID}/>
      </div>
    </div>
  );
}

export async function MeetingCreator({ meetingID }: { meetingID: string }) {
  const meetingCreatorResult = await getMeetingCreatorTest();

  if (!meetingCreatorResult?.data) {
    toast.error("Could not fetch meeting creator data.");
    return;
  }

  const { data: { creator: meetingCreator } } = meetingCreatorResult;
  const meetingCreatorPositions: string[] = meetingCreator.userToPositions.map((up) => up.position.name);

  return (
    <div className="flex items-center gap-4">
      <Image
        src={meetingCreator.image || defaultProfilePicture}
        alt={`${meetingCreator.firstName} ${meetingCreator.lastName}'s Profile Picture`}
        width={50}
        height={50}
        className="rounded-full object-cover"
      />
      <div className="truncate flex-1 flex flex-col gap-1.5">
        <h3 className="font-bold text-lg">{`${meetingCreator.firstName} ${meetingCreator.lastName}`}</h3>
        <span className="italic font-[400]">{meetingCreatorPositions.join(", ")}</span>
      </div>
    </div>
  );
}

export async function Meeting() {
  return (
    <div>
      
    </div>
  );
}

export async function MeetingLinks() {
  return (
    <div className="border border-slate-300 rounded-md p-4">
      <h2>Meeting Link(s)</h2>
    </div>
  );
}