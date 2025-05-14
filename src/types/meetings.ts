export type MeetingStatus = 'scheduled' | 'in-progress' | 'completed' | 'cancelled'

export interface Attendee {
    id: string
    name: string
    email: string
    response?: 'accepted' | 'declined' | 'pending'
}

export interface Meeting {
    id: string
    title: string
    date: string
    endDate?: string
    location: string
    description: string
    status: MeetingStatus
    organizer: Attendee
    attendees: Attendee[]
    requiresResponse?: boolean
    type: 'virtual' | 'in-person' | 'hybrid'
    meetingLink?: string
}
