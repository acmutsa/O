import { Button } from '@/components/ui/button';

export default function MeetingsPage() {
    return (
        <div className="container mx-auto py-0 mt-0 flex h-screen justify-between items-start">
            <div className="flex flex-col">
                <h1 className="text-5xl font-bold">
                    Meetings
                </h1>
                <p className="text-base text-gray-300">
                    Manage your upcoming meetings and past meetings
                </p>
            </div>
            <Button className="bg-white text-black">
                + New Meeting
            </Button>
        </div>
    );
}
