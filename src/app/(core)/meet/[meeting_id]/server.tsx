"use server";

import defaultProfilePicture from "@/img/default-profile-picture.jpg";
import Image from "next/image";
import { AllAttendees } from "./client";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, MapPin } from "lucide-react";
import { isSameDay, format } from "date-fns";
import Link from "next/link";
import { db } from "@/db";

export type Attendee = {
  id: string;
  firstName: string;
  lastName: string;
  image: string | null;
  positions: string[];
};

export type Position = {
  positionID: number,
  name: string
}

type AttendeesProps = {
  attendees: Attendee[];
  previewLimit: number;
};

export async function Attendees({ attendees, previewLimit }: AttendeesProps) {
  const remainingAttendeesCount = attendees.length - previewLimit;
  // const positions = await db.query.position.findMany({
  //   columns: {
  //     description: false
  //   }
  // });

  const positions: Position[] = [{
    positionID: 1,
    name: "ACM Projects Officer"
  },
  {
    positionID: 2,
    name: "ICPC Director"
  },
  {
    positionID: 3,
    name: "ACM Junior Officer"
  },
  {
    positionID: 4,
    name: "HackKit Maintainer"
  }];
  
  return (
    <div className="border border-slate-300 dark:border-gray-700 p-4 rounded-md">
      <div className="flex items-center gap-2.5">
        <h2 className="inline font-bold text-xl">Attendees</h2>
        <div className="size-8 flex justify-center items-center text-lg font-bold bg-black dark:bg-white text-white dark:text-black rounded-full shadow-md">{attendees.length}</div>
      </div>
      <Separator className="my-4 dark:bg-gray-600"/>
      <div className="flex justify-between items-end">
        <div className="w-fit flex justify-between items-center gap-2">
          {
            attendees.slice(0, previewLimit).map((attendee) => (
              <Image
                key={attendee.id}
                src={attendee.image || defaultProfilePicture}
                alt={`${attendee.firstName} ${attendee.lastName}'s Profile Picture`}
                width={50}
                height={50}
                className="shadow-md object-cover rounded-full"
              />
            ))
          }
          {
            remainingAttendeesCount > 0 &&
            <div className="size-[50px] bg-gray-400 font-[600] text-slate-700 flex justify-center items-center shadow-md rounded-full">
              +{remainingAttendeesCount}
            </div>
          }
        </div>
        <AllAttendees
          attendees={attendees}
          positions={positions}
          itemsPerPage={6}
        />
      </div>
    </div>
  );
}

type MeetingCreatorProps = {
  meetingCreator: Attendee
};

export async function MeetingCreator({ meetingCreator }: MeetingCreatorProps) {
  return (
    <div className="flex items-center gap-4">
      <Image
        src={meetingCreator.image || defaultProfilePicture}
        alt={`${meetingCreator.firstName} ${meetingCreator.lastName}'s Profile Picture`}
        width={50}
        height={50}
        className="shadow-md object-cover rounded-full"
      />
      <div className="truncate flex-1 flex flex-col gap-1.5">
        <h3 className="font-bold text-lg">{`${meetingCreator.firstName} ${meetingCreator.lastName}`}</h3>
        <span className="italic font-[400]">{meetingCreator.positions.join(", ")}</span>
      </div>
    </div>
  );
}

type MeetingDateTimeLocationProps = {
  rangeStart: Date,
  rangeEnd: Date
  startTime: Date,
  endTime: Date,
  location: string,
  timeFormat: string,
  dateFormat: string
};

export async function MeetingDateTimeLocation({ rangeStart, rangeEnd, startTime, endTime, location, timeFormat, dateFormat }: MeetingDateTimeLocationProps) {
  const isMeetingRangeDifferentDays = !isSameDay(rangeStart, rangeEnd);
  
  return (
    <div className="text-slate-600 dark:text-gray-400 flex flex-col gap-5">
      <div className="flex items-center gap-3.5 font-[600]">
        <div className="flex justify-center items-center bg-black dark:bg-white text-white dark:text-black p-2.5 shadow-md rounded-md">
          <Calendar size={28}/>
        </div>
        <Separator orientation="vertical" className="dark:bg-gray-600" />
        <span>{`${format(rangeStart, dateFormat)}${isMeetingRangeDifferentDays ? ` - ${format(rangeEnd, dateFormat)}` : ""}`}</span>
      </div>
      <div className="flex items-center gap-3.5 font-[600]">
        <div className="flex justify-center items-center bg-black dark:bg-white text-white dark:text-black p-2.5 shadow-md rounded-md">
          <Clock size={28}/>
        </div>
        <Separator orientation="vertical" className="dark:bg-gray-600" />
        <span>{`${format(startTime, timeFormat)} - ${format(endTime, timeFormat)}`}</span>
      </div>
      <div className="flex items-center gap-3.5 font-[600]">
        <div className="flex justify-center items-center bg-black dark:bg-white text-white dark:text-black p-2.5 shadow-md rounded-md">
          <MapPin size={28}/>
        </div>
        <Separator orientation="vertical" className="dark:bg-gray-600" />
        <span>{location}</span>
      </div>
    </div>
  );
}

type MeetingLinksProps = {
  links: string[]
};

export async function MeetingLinks({ links }: MeetingLinksProps) {
  return (
    <div className="border border-slate-300 dark:border-gray-700 rounded-md p-4">
      <h2 className="font-bold text-lg mb-3">Meeting Link(s)</h2>
      {
        links.length > 0 &&
        <div className="flex flex-col gap-3">
          {
            links.map((link, index) => (
              <Link
                key={index}
                href={link}
                target="_blank"
                className="text-blue-600 underline visited:text-purple-600"
              >
                {link}
              </Link>
            ))
          }
        </div>
      }
    </div>
  );
}