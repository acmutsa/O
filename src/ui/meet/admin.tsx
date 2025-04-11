"use client";

import { meetingInvites } from "@/db/schema";
import { EllipsisVertical } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { db, eq } from "@/db";

export function AdminOptions() {
  return (
    <Popover>
      <PopoverTrigger>
        <EllipsisVertical />
      </PopoverTrigger>
      <PopoverContent>
        {/* <AddOrRemoveAttendees /> */}
      </PopoverContent>
    </Popover>
  );
}

async function AddOrRemoveAttendees(meetingId: string) {
  const meetingAttendees = await db.query.meetingInvites.findMany({
    where: eq(meetingInvites.meetingID, meetingId)
  });
  
  return (
    <div></div>
  );
}