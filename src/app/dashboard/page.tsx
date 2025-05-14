import { MeetingsTabs } from './meetings/meetings-tabs'
import { getUpcomingMeetings, getPendingMeetings } from './meetings/meetings.server'

export default async function DashboardPage() {
    const [upcomingMeetings, pendingMeetings] = await Promise.all([
        getUpcomingMeetings(),
        getPendingMeetings()
    ])

    return (
        <div className="container py-6 space-y-8">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Meetings</h2>
                <p className="text-muted-foreground">Manage your upcoming meetings and respond to invitations.</p>
            </div>
            <MeetingsTabs 
                upcomingMeetings={upcomingMeetings}
                pendingMeetings={pendingMeetings}
            />
        </div>
    )
}
