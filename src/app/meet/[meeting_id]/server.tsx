"use server";

import defaultProfilePicture from "@/img/default-profile-picture.jpg";
import Image from "next/image";
import { getAttendeesImages, getAttendeeCount, getAttendeeCountTest, getAttendeesImagesTest } from "@/actions/meetings";
import { AllAttendees } from "./client";
import { Separator } from "@/components/ui/separator";

export default async function Attendees({ meetingID, previewLimit }: { meetingID: string, previewLimit: number }) {
  // const attendeeImagesResult = await getAttendeesImages({ meetingID, previewLimit });
  // const attendeeCountResult = await getAttendeeCount({ meetingID });

  const attendeeImagesResult = await getAttendeesImagesTest();
  const attendeeCountResult = await getAttendeeCountTest();
  
  const [{ count: attendeeCount }] = attendeeCountResult?.data || [{ count: 0 }];
  const attendeeImages = attendeeImagesResult?.data;
  const remainingAttendees = attendeeCount - previewLimit;
  
  return (
    <div className="rounded-md border-slate-400 p-4">
      <h2 className="text-lg">Attendees</h2>
      <h3 className="text-lg rounded-full bg-black">{attendeeCount}</h3>
      <Separator className="my-2"/>
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