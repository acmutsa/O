import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export function AttendeesSkeleton() {
  return (
    <div className="border border-slate-300 p-4 rounded-md">
      <div className="flex items-center gap-2.5">
        <Skeleton className="w-[125px] rounded-md"/>
        <Skeleton className="size-8 rounded-full"/>
      </div>
      <Separator className="my-4"/>
      <div className="flex justify-between items-end">
        <div className="w-fit flex justify-between items-center gap-2">
          <Skeleton className="size-[50px] rounded-full"/>
          <Skeleton className="size-[50px] rounded-full"/>
          <Skeleton className="size-[50px] rounded-full"/>
          <Skeleton className="size-[50px] rounded-full"/>
        </div>
      </div>
    </div>
  );
}