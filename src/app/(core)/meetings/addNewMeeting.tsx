import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogTitle,
} from "@/components/ui/dialog"
import CreateMeetingPage from '@/components/createMeeting/CreateMeetingPage';
import { Suspense } from "react";

export function AddNewMeeting() {
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button variant="outline">Create New Meeting</Button>
                </DialogTrigger>
                <DialogContent className="w-full max-w-4xl max-h-[85vh] overflow-y-auto">
                    <DialogTitle>Create New Meeting</DialogTitle>
                    <Suspense fallback={<div>Loading...</div>}>
                        <CreateMeetingPage />
                    </Suspense>
                </DialogContent>
            </form>
        </Dialog>
    )
}
