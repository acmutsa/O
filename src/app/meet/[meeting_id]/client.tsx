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
import { useAction } from "next-safe-action/hooks";
import { getAllAttendees } from "@/actions/meetings";

export function AllAttendees({ meetingID }: { meetingID: string }) {
  const { 
    result: { 
      data: attendees 
    }, 
    execute, 
    isExecuting, 
    hasSucceeded 
  } = useAction(getAllAttendees);

  return (
    <Dialog>
      <DialogTrigger 
        disabled={isExecuting}
        onClick={() => {
          // Data fetching will only run once
          if (!hasSucceeded)
            execute({ meetingID })
        }}
        className="flex gap-3"
      >
        All Attendees
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
              attendees?.map(({ user }) => (
                <div>
                  <h1>{`${user.firstName} ${user.lastName}`}</h1>
                  <Image
                    src={user.image || defaultProfilePicture}
                    alt={`${user.firstName} ${user.lastName}'s Profile Picture`}
                    width={50}
                    height={50}
                    className="object-cover rounded-full"
                  />
                  <div>
                    {
                      user.userToPositions.map(({ position }) => (
                        <Badge>
                          {position.name}
                        </Badge>
                      ))
                    }
                  </div>
                </div>
              ))
            }
          </div>
        }
        {
          isExecuting && 
          <h1>Loading...</h1>
        }
      </DialogContent>
    </Dialog>
  );
}