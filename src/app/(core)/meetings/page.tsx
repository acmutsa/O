import { AddNewMeeting } from './addNewMeeting';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function MeetingsPage() {
    return (
        <div className="container mx-auto py-0 mt-0 flex h-screen flex-col relative">
            <div className="flex w-full items-start justify-between">
                <div className="flex flex-col">
                    <h1 className="text-5xl font-bold">
                        Meetings
                    </h1>
                    <p className="text-base">
                        Manage your upcoming meetings and past meetings
                    </p>
                </div>
                <div className="ml-auto">
                    <AddNewMeeting />
                </div>
            </div>
            {/* Add Notification Feature Here */}
            <Tabs defaultValue="account" className="mt-6 w-full">
                <TabsList className="w-full">
                    <TabsTrigger value="account" className="w-full">Upcoming</TabsTrigger>
                    <TabsTrigger value="password" className="w-full">Past</TabsTrigger>
                </TabsList>
                <TabsContent value="account">Make changes to your account here.</TabsContent>
                <TabsContent value="password">Change your password here.</TabsContent>
            </Tabs>
        </div>
    );
} 
