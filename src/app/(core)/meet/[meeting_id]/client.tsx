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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, LayoutGrid, List } from "lucide-react";
import Image from "next/image";
import defaultProfilePicture from "@/img/default-profile-picture.jpg";
import { Badge } from "@/components/ui/badge";
import { Attendee, Position } from "./server";
import { useMemo, useState } from "react";
import { Separator } from "@/components/ui/separator";
import clsx from "clsx";
import { parseAsIndex, useQueryState } from "nuqs";
import { nanoid } from "nanoid";

type AllAttendeesProps = {
  attendees: Attendee[],
  positions: Position[],
  itemsPerPage: number
}

export function AllAttendees({ attendees, positions, itemsPerPage }: AllAttendeesProps) {
  const [currentPageNumber, setCurrentPageNumber] = useQueryState("page", parseAsIndex.withDefault(0));
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isPositionsDropdownOpen, setIsPositionsDropdownOpen] = useState<boolean>(false);
  const [currentAttendeeView, setCurrentAttendeeView] = useState<"list" | "grid">("list");
  const [selectedPositions, setSelectedPositions] = useState<Position[]>([]);

  const isSelectionEmpty = selectedPositions.length === 0;
  const startIndex = itemsPerPage * currentPageNumber;
  const endIndex = startIndex + itemsPerPage;
  
  const shownAttendees = useMemo(() => isSelectionEmpty
    ? attendees.slice(startIndex, endIndex)
    : attendees.filter((a) => 
        a.positions.some((p) => selectedPositions.some((s) => s.name === p))
      ).slice(startIndex, endIndex),
    [selectedPositions, currentPageNumber]
  );
  
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger className="flex font-[600] gap-3 bg-slate-300 dark:bg-slate-600 text-slate-600 dark:text-slate-300 px-5 py-3 rounded-md">
        Show All
        <ChevronRight />
      </DialogTrigger>
      <DialogContent className="flex flex-col justify-between min-h-[500px] max-h-[750px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">All Attendees</DialogTitle>
        </DialogHeader>
        <div className="flex-1 flex flex-col gap-3">
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
                          setSelectedPositions((s) => s.filter((p) => p.positionID !== position.positionID));
                        }

                        setCurrentPageNumber(0);
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
              <h1>No attendees match the requested sort filter.</h1>
            )
          }
        </div>
        
        <AttendeesPagination
          totalCount={isSelectionEmpty ? attendees.length : shownAttendees.length}
          itemsPerPage={itemsPerPage}
        />
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
    <div className={clsx(className, "flex items-center gap-2.5 w-full section-container")}>
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
    <div className={clsx(className, "flex justify-between items-start section-container")}>
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

type PaginationProps = {
  itemsPerPage: number,
  totalCount: number
};

function AttendeesPagination({ itemsPerPage, totalCount }: PaginationProps) {
  const [currentPageNumber, setCurrentPageNumber] = useQueryState("page", parseAsIndex.withDefault(0));

  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const isFirstPage = currentPageNumber === 0;
  const isLastPage = currentPageNumber === totalPages - 1;
  
  function decrementPageNumber() {
    if (currentPageNumber > 0)
      setCurrentPageNumber((s) => s - 1);
  }

  function incrementPageNumber() {
    if (currentPageNumber < totalPages)
      setCurrentPageNumber((s) => s + 1);
  }
  
  return (
    <div className="flex justify-center items-center gap-3">
      <button
        onClick={decrementPageNumber}
        disabled={isFirstPage}
        className={clsx("section-container", {
          "hidden": totalPages === 0,
          "cursor-not-allowed": isFirstPage
        })}
      >
        <ChevronLeft />
      </button>
      {
        generateAttendeePagination(currentPageNumber, totalPages).map((page) => page === "..." ? (
          <div key={nanoid()} className="font-bold">
            {page}
          </div>
        ) : (
          <button
            key={nanoid()}
            onClick={() => {
              if (page - 1 !== currentPageNumber && page - 1 >= 0 && page - 1 < totalPages)
                setCurrentPageNumber(page - 1);
            }}
            className={clsx("section-container font-[600] size-12", {
              "bg-slate-300 dark:bg-slate-600": currentPageNumber === page - 1
            })}
          >
            {page}
          </button>
        ))
      }
      <button
        onClick={incrementPageNumber}
        disabled={isLastPage}
        className={clsx("section-container", {
          "hidden": totalPages === 0,
          "cursor-not-allowed": isLastPage
        })}
      >
        <ChevronRight />
      </button>
    </div>
  );
}

// currentPage is zero-indexed
function generateAttendeePagination(currentPage: number, totalPages: number): ("..." | number)[] {
  if (totalPages <= 3)
    return Array.from({ length: totalPages }, (_, i) => i + 1);

  if (currentPage < 3)
    return [1, 2, 3, "...", totalPages];
  
  if (totalPages - currentPage < 3)
    return [1, "...", totalPages - 2, totalPages - 1, totalPages];

  return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
}