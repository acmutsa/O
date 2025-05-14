import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Meeting, MeetingStatus } from "@/types/meetings"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { format, isAfter, isBefore, isToday } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarDays, Clock, MapPin, Users, Video, Building2 } from "lucide-react"

interface MeetingsTabsProps {
    upcomingMeetings: Meeting[]
    pendingMeetings: Meeting[]
}

function getStatusColor(status: MeetingStatus, date: string): string {
    if (status === 'cancelled') return 'text-destructive'
    if (status === 'completed') return 'text-muted-foreground'
    
    const meetingDate = new Date(date)
    const now = new Date()
    
    if (isAfter(now, meetingDate)) return 'text-destructive'
    if (isToday(meetingDate)) return 'text-blue-500'
    return 'text-green-500'
}

function getLocationIcon(type: Meeting['type']) {
    switch (type) {
        case 'virtual':
            return <Video className="h-4 w-4" />
        case 'hybrid':
            return <Building2 className="h-4 w-4" />
        default:
            return <MapPin className="h-4 w-4" />
    }
}

export function MeetingsTabs({ upcomingMeetings, pendingMeetings }: MeetingsTabsProps) {
    return (
        <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="upcoming" className="data-[state=active]:bg-primary">
                    <div className="flex flex-col items-start px-2">
                        <span>Upcoming Meetings</span>
                        <span className="text-xs text-muted-foreground">{upcomingMeetings.length} scheduled</span>
                    </div>
                </TabsTrigger>
                <TabsTrigger value="pending" className="data-[state=active]:bg-primary relative">
                    <div className="flex flex-col items-start px-2">
                        <span>Pending Response</span>
                        <span className="text-xs text-muted-foreground">{pendingMeetings.length} awaiting</span>
                    </div>
                    {pendingMeetings.length > 0 && (
                        <Badge variant="destructive" className="absolute -top-2 -right-2">
                            {pendingMeetings.length}
                        </Badge>
                    )}
                </TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming" className="space-y-4">
                {upcomingMeetings.map((meeting) => (
                    <MeetingCard key={meeting.id} meeting={meeting} />
                ))}
            </TabsContent>
            <TabsContent value="pending" className="space-y-4">
                {pendingMeetings.map((meeting) => (
                    <MeetingCard key={meeting.id} meeting={meeting} showActions />
                ))}
            </TabsContent>
        </Tabs>
    )
}

function MeetingCard({ meeting, showActions = false }: { meeting: Meeting, showActions?: boolean }) {
    const statusColor = getStatusColor(meeting.status, meeting.date)
    const locationIcon = getLocationIcon(meeting.type)
    
    return (
        <Card className="relative overflow-hidden">
            <div 
                className={`absolute top-0 left-0 w-1 h-full ${statusColor.replace('text-', 'bg-')}`}
                aria-hidden="true"
            />
            <CardHeader>
                <div className="flex items-start justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-2">
                            {meeting.title}
                            {meeting.type !== 'in-person' && (
                                <Badge variant="secondary" className="text-xs">
                                    {meeting.type === 'hybrid' ? 'Hybrid' : 'Virtual'}
                                </Badge>
                            )}
                        </CardTitle>
                        <CardDescription className="mt-1.5">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1.5">
                                    <CalendarDays className="h-4 w-4 text-muted-foreground" />
                                    <span>{format(new Date(meeting.date), 'EEE, MMM d')}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <span>
                                        {format(new Date(meeting.date), 'h:mm a')} - 
                                        {format(new Date(meeting.endDate || meeting.date), 'h:mm a')}
                                    </span>
                                </div>
                            </div>
                        </CardDescription>
                    </div>
                    {meeting.status === 'cancelled' && (
                        <Badge variant="destructive">Cancelled</Badge>
                    )}
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-start gap-6">
                    <div className="flex items-start gap-2 text-sm">
                        {locationIcon}
                        <span>{meeting.location}</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                        <Users className="h-4 w-4" />
                        <span>{meeting.attendees.length} attendees</span>
                    </div>
                </div>
                <p className="text-sm text-muted-foreground">{meeting.description}</p>
                {meeting.meetingLink && (
                    <Button variant="secondary" className="w-full" asChild>
                        <a href={meeting.meetingLink} target="_blank" rel="noopener noreferrer">
                            Join Meeting
                        </a>
                    </Button>
                )}
            </CardContent>
            {showActions && (
                <CardFooter className="flex gap-2 pt-6">
                    <Button className="flex-1" variant="default">
                        Accept
                    </Button>
                    <Button className="flex-1" variant="outline">
                        Decline
                    </Button>
                </CardFooter>
            )}
        </Card>
    )
}
