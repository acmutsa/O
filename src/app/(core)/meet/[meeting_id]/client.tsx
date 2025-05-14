"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronDown, ChevronRight, ChevronUp, LayoutGrid, List } from "lucide-react";
import Image from "next/image";
import defaultProfilePicture from "@/img/default-profile-picture.jpg";
import { Badge } from "@/components/ui/badge";
import { Attendee, Position } from "./server";
import { JSX, useMemo, useState } from "react";
import { Separator } from "@/components/ui/separator";
import clsx from "clsx";

type AllAttendeesProps = {
  attendees: Attendee[],
  positions: Position[],
  itemsPerPage: number
}

export function AllAttendees({ attendees, positions, itemsPerPage }: AllAttendeesProps) {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isPositionsDropdownOpen, setIsPositionsDropdownOpen] = useState<boolean>(false);
  const [currentAttendeeView, setCurrentAttendeeView] = useState<"list" | "grid">("list");
  const [selectedPositions, setSelectedPositions] = useState<Position[]>(positions);
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(0);

  const startIndex = itemsPerPage * currentPageNumber;
  const endIndex = startIndex + itemsPerPage;
  
  const shownAttendees = useMemo(() => attendees.filter((a) => 
    a.positions.some((p) => selectedPositions.some((s) => s.name === p))).slice(startIndex, endIndex),
    [selectedPositions, currentPageNumber]
  );
  
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger className="flex font-[600] gap-3 bg-slate-300 dark:bg-slate-600 text-slate-600 dark:text-slate-300 px-5 py-3 rounded-md">
        Show All
        <ChevronRight />
      </DialogTrigger>
      <DialogContent className="max-h-[750px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">All Attendees</DialogTitle>
        </DialogHeader>
        <div className="flex justify-between items-center">
          <Tabs
            value={currentAttendeeView}
            onValueChange={(value) => setCurrentAttendeeView(value as "list" | "grid")}
          >
            <TabsList className="bg-transparent p-0 gap-2.5">
              <TabsTrigger value="list" className="size-10 data-[state=active]:bg-slate-300 dark:data-[state=active]:bg-slate-600 data-[state=active]:shadow-none data-[state=inactive]:border border-slate-300 dark:border-gray-700 transition-colors p-2.5">
                <List />
              </TabsTrigger>
              <TabsTrigger value="grid" className="size-10 data-[state=active]:bg-slate-300 dark:data-[state=active]:bg-slate-600 data-[state=active]:shadow-none data-[state=inactive]:border border-slate-300 dark:border-gray-700 transition-colors p-2.5">
                <LayoutGrid />
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <DropdownMenu open={isPositionsDropdownOpen} onOpenChange={setIsPositionsDropdownOpen}>
            <DropdownMenuTrigger className="flex gap-2.5 border border-slate-300 dark:border-gray-700 py-2 px-4 rounded-md">
              Positions
              { isPositionsDropdownOpen ? <ChevronUp /> : <ChevronDown /> }
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel>Filter by Position(s)</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {
                positions.map((position) => (
                  <DropdownMenuCheckboxItem
                    key={position.positionID}
                    checked={selectedPositions.includes(position)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedPositions((s) => [...new Set([...s, position])]);
                      } else {
                        const updatedSelectedPositions = selectedPositions.filter((p) => p.positionID !== position.positionID);
                        
                        setSelectedPositions(updatedSelectedPositions.length === 0 ? positions : updatedSelectedPositions);
                      }
                    }}
                  >
                    {position.name}
                  </DropdownMenuCheckboxItem>
                ))
              }
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Separator className="dark:bg-gray-700" />
        {
          shownAttendees.length > 0 ? (
            <>
              {
                currentAttendeeView === "list" && (
                  <div className="flex flex-col gap-3">
                    {
                      shownAttendees.map((attendee) =>
                        <ListAttendeeView
                          key={attendee.id}
                          attendee={attendee}
                        />
                      )
                    }
                  </div>
                )
              }
              {
                currentAttendeeView === "grid" && (
                  <div className="flex flex-wrap gap-3">
                    {
                      shownAttendees.map((attendee) => (
                        <GridAttendeeView
                          key={attendee.id}
                          attendee={attendee}
                          className="flex-1 min-w-[200px]"
                        />
                      ))
                    }
                  </div>
                )
              }
            </>
          ) : (
            <h1>No attendees were found.</h1>
          )
        }
      </DialogContent>
    </Dialog>
  );
}

type AttendeeViewProps = {
  className?: string,
  attendee: Attendee
};

function ListAttendeeView({ className, attendee }: AttendeeViewProps) {
  return (
    <div className={clsx(className, "flex items-center gap-2.5 w-full border border-slate-300 dark:border-gray-700 p-3 rounded-md")}>
      <Image
        src={attendee.image || defaultProfilePicture}
        alt={`${attendee.firstName} ${attendee.lastName}'s Profile Picture`}
        width={50}
        height={50}
        className="object-cover rounded-full"
      />
      <div className="flex flex-col gap-2.5 justify-between">
        <h1>{`${attendee.firstName} ${attendee.lastName}`}</h1>
        <div className="flex flex-row flex-wrap gap-1.5">
          {
            attendee.positions.map((position, index) => (
              <Badge key={index} className="rounded-full">
                {position}
              </Badge>
            ))
          }
        </div>
      </div>
    </div>
  );
}

function GridAttendeeView({ className, attendee }: AttendeeViewProps) {
  return (
    <div className={clsx(className, "flex justify-between items-start border border-slate-300 dark:border-gray-700 p-3 rounded-md")}>
      <div className="flex flex-col gap-3">
        <h1>{`${attendee.firstName} ${attendee.lastName}`}</h1>
        <div className="flex flex-row flex-wrap gap-1.5">
          {
            attendee.positions.map((position, index) => (
              <Badge key={index} className="truncate rounded-full">
                {position}
              </Badge>
            ))
          }
        </div>
      </div>
      <Image
        src={attendee.image || defaultProfilePicture}
        alt={`${attendee.firstName} ${attendee.lastName}'s Profile Picture`}
        width={50}
        height={50}
        className="object-cover rounded-full"
      />
    </div>
  );
}
