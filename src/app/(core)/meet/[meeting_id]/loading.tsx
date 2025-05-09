import { Separator } from "@/components/ui/separator";
import { AttendeesSkeleton } from "./skeletons";

export default function Loading() {
  return (
    <div className="px-4 py-8">
      <div className="h-fit flex justify-center gap-1.5">
        <AttendeesSkeleton />
        <Separator
          orientation="vertical"
          className="h-full mx-4"
        />
        <div className="flex-1 flex flex-col gap-4">
          
        </div>
      </div>
      
    </div>
  );
}