import { Separator } from "@/components/ui/separator";
import { MeetingCreatorSkeleton, MeetingDateTimeLocationSkeleton } from "./skeletons";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="h-fit flex justify-center gap-10">
      <div className="flex-1 flex flex-col gap-4">
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-[150px]" />
        <MeetingDateTimeLocationSkeleton />
        <Skeleton className="w-full h-24" />
      </div> 
      <div className="flex-1 flex flex-col gap-4">
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-8"/>
        <MeetingCreatorSkeleton />
        <Skeleton className="w-full h-8" />
        <Skeleton className="w-full flex-1" />
      </div>
    </div>
  );
}