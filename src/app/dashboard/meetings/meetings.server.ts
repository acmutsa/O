import { Meeting, Attendee, MeetingStatus } from '@/types/meetings'

// Simulated delay to show loading states
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Mock data for testing
const mockOrganizer: Attendee = {
    id: 'org1',
    name: 'Sarah Chen',
    email: 'sarah.chen@example.com'
}

const mockAttendees: Attendee[] = [
    { id: 'att1', name: 'John Smith', email: 'john.smith@example.com', response: 'accepted' },
    { id: 'att2', name: 'Maria Garcia', email: 'maria.garcia@example.com', response: 'pending' },
    { id: 'att3', name: 'Alex Kim', email: 'alex.kim@example.com', response: 'declined' }
]

export async function getUpcomingMeetings(): Promise<Meeting[]> {
    // Simulate network delay
    await delay(1000)

    return [
        {
            id: '1',
            title: 'Weekly Team Sync',
            date: '2025-05-14T10:00:00',
            endDate: '2025-05-14T11:00:00',
            location: 'Conference Room A',
            description: 'Weekly team sync meeting to discuss progress and blockers',
            status: 'scheduled',
            type: 'hybrid',
            organizer: mockOrganizer,
            attendees: mockAttendees,
            meetingLink: 'https://meet.example.com/weekly-sync'
        },
        {
            id: '2',
            title: 'Project Planning',
            date: '2025-05-15T14:00:00',
            endDate: '2025-05-15T15:30:00',
            location: 'Virtual',
            description: 'Planning session for Q2 objectives',
            status: 'scheduled',
            type: 'virtual',
            organizer: mockOrganizer,
            attendees: mockAttendees.slice(0, 2),
            meetingLink: 'https://meet.example.com/planning'
        },
        {
            id: '5',
            title: 'Tech Workshop',
            date: '2025-05-16T09:00:00',
            endDate: '2025-05-16T12:00:00',
            location: 'Innovation Lab',
            description: 'Hands-on workshop on new technologies',
            status: 'scheduled',
            type: 'in-person',
            organizer: mockOrganizer,
            attendees: mockAttendees
        }
    ]
}

export async function getPendingMeetings(): Promise<Meeting[]> {
    // Simulate network delay
    await delay(1000)

    return [
        {
            id: '3',
            title: 'Design Review',
            date: '2025-05-14T11:00:00',
            endDate: '2025-05-14T12:00:00',
            location: 'Design Lab',
            description: 'Review of new dashboard designs',
            status: 'scheduled',
            type: 'in-person',
            organizer: mockOrganizer,
            attendees: mockAttendees,
            requiresResponse: true
        },
        {
            id: '4',
            title: 'All Hands',
            date: '2025-05-16T15:00:00',
            endDate: '2025-05-16T16:00:00',
            location: 'Main Hall',
            description: 'Monthly all hands meeting',
            status: 'scheduled',
            type: 'hybrid',
            organizer: mockOrganizer,
            attendees: [...mockAttendees, ...mockAttendees],
            requiresResponse: true,
            meetingLink: 'https://meet.example.com/all-hands'
        }
    ]
}
