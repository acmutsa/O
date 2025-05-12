import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export function MeetingCreatorSkeleton() {
  return (
    <div className="flex items-center gap-4">
      <Skeleton className="size-[50px] rounded-full"/>
      <div className="truncate flex-1 flex flex-col gap-1.5">
        <Skeleton className="w-28 h-6" />
        <Skeleton className="w-60 h-6" />
      </div>
    </div>
  );
}

export function MeetingDateTimeLocationSkeleton() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3.5 font-[600]">
        <Skeleton className="size-12" />
        <Separator orientation="vertical" />
        <Skeleton className="flex-1 h-12" />
      </div>
      <div className="flex items-center gap-3.5 font-[600]">
        <Skeleton className="size-12" />
        <Separator orientation="vertical" />
        <Skeleton className="flex-1 h-12" />
      </div>
      <div className="flex items-center gap-3.5 font-[600]">
        <Skeleton className="size-12" />
        <Separator orientation="vertical" />
        <Skeleton className="flex-1 h-12" />
      </div>
    </div>
  );
}