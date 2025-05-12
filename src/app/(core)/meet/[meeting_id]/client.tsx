"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import defaultProfilePicture from "@/img/default-profile-picture.jpg";
import { Badge } from "@/components/ui/badge";
import { Attendee } from "./server";

type AllAttendeesProps = {
  attendees: Attendee[]
}

export function AllAttendees({ attendees }: AllAttendeesProps) {
  return (
    <Dialog>
      <DialogTrigger className="flex font-[600] gap-3 bg-slate-300 text-slate-600 px-5 py-3 rounded-md">
        Show All
        <ChevronRight />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>All Attendees</DialogTitle>
        </DialogHeader>
        {
          attendees &&
          <div>
            {
              attendees?.map((attendee) => (
                <div key={attendee.id}>
                  <h1>{`${attendee.firstName} ${attendee.lastName}`}</h1>
                  <Image
                    src={attendee.image || defaultProfilePicture}
                    alt={`${attendee.firstName} ${attendee.lastName}'s Profile Picture`}
                    width={50}
                    height={50}
                    className="object-cover rounded-full"
                  />
                  <div className="flex flex-row gap-1.5">
                    {
                      attendee.positions.map((position, index) => (
                        <Badge key={index} className="rounded-full">
                          {position}
                        </Badge>
                      ))
                    }
                  </div>
                </div>
              ))
            }
          </div>
        }
      </DialogContent>
    </Dialog>
  );
}