import { MeetingsTabs } from './meetings/meetings-tabs'
import { getUpcomingMeetings, getPendingMeetings } from './meetings/meetings.server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react"
import { getSession } from "@/lib/server/auth"
import { ProfileCard } from "@/components/profile-card"
import { AboutUsCard } from "@/components/about-us-card"
import { Contact } from "@/components/contact"
import { CommunicationHub } from "./communication-hub"
import { QuickLinks } from "./quick-links"

export default async function DashboardPage() {
    const [upcomingMeetings, pendingMeetings, session] = await Promise.all([
        getUpcomingMeetings(),
        getPendingMeetings(),
        getSession()
    ])

    if (!session) return null

    return (
        <div className="container py-8 space-y-10 max-w-7xl mx-auto">
            <div className="relative overflow-hidden rounded-xl border bg-gradient-to-b from-background to-muted/50 dark:from-background dark:to-background p-8">
                <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
                <div className="absolute inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black/50" />
                
                <div className="relative grid gap-4">
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 items-center rounded-full bg-primary/10 px-4 text-sm text-primary">
                            ACMUTSA
                            <span className="ml-2 h-4 w-px bg-primary/20" />
                            <span className="ml-2 text-muted-foreground">Officer Portal</span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight">Welcome to</h1>
                        <h2 className="text-4xl font-black bg-gradient-to-br from-primary via-primary/80 to-muted-foreground bg-clip-text text-transparent">
                            The Association for Computing Machinery
                        </h2>
                        <h3 className="text-2xl font-bold text-muted-foreground">at UTSA</h3>
                    </div>
                    <p className="text-muted-foreground max-w-[600px] text-lg">
                        Your one-stop portal for managing meetings, tracking attendance, and staying connected with the ACMUTSA community.
                    </p>
                </div>

                <div className="absolute right-8 top-8">
                    <div className="rounded-full bg-primary/10 p-4 ring-1 ring-primary/20 backdrop-blur-sm">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="h-6 w-6 text-primary animate-pulse"
                        >
                            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                        </svg>
                    </div>
                </div>
            </div>

            <div className="container py-8">
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Profile Card */}
                        <div className="md:col-span-1">
                            <ProfileCard />
                        </div>

                        {/* Meetings Card - Expanded */}
                        <div className="md:col-span-2">
                            <Card>
                                <CardHeader className="py-8">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle className="text-xl font-bold">Meetings</CardTitle>
                                            <CardDescription className="text-sm mt-2">Manage your upcoming meetings</CardDescription>
                                        </div>
                                        <div className="text-3xl font-bold text-primary">{upcomingMeetings.length + pendingMeetings.length}</div>
                                    </div>
                                </CardHeader>
                                <CardContent className="px-6">
                                    <div className="space-y-8">
                                        {/* Quick Stats */}
                                        <div className="grid grid-cols-2 gap-4 bg-primary/5 rounded-lg p-4">
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-primary">{upcomingMeetings.length}</div>
                                                <div className="text-sm text-muted-foreground">Upcoming</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-primary">{pendingMeetings.length}</div>
                                                <div className="text-sm text-muted-foreground">Pending</div>
                                            </div>
                                        </div>

                                        {/* Quick Stats */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="text-center">
                                                <div className="text-lg font-bold text-primary">{upcomingMeetings.length}</div>
                                                <div className="text-xs text-muted-foreground">Upcoming</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-lg font-bold text-primary">{pendingMeetings.length}</div>
                                                <div className="text-xs text-muted-foreground">Pending</div>
                                            </div>
                                        </div>

                                        {/* Recent Meetings with Show More */}
                                        <Collapsible>
                                            <div className="space-y-2">
                                                {upcomingMeetings.slice(0, 2).map((meeting, index) => (
                                                    <div key={index} className="flex items-center justify-between text-sm">
                                                        <div className="flex items-center gap-2">
                                                            <div className="h-2 w-2 rounded-full bg-primary"></div>
                                                            <span>{meeting.title}</span>
                                                        </div>
                                                        <div className="flex items-center gap-3 text-muted-foreground">
                                                            <span className="text-xs">{new Date(meeting.date).toLocaleDateString()}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                                <CollapsibleTrigger className="w-full pt-2">
                                                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors">
                                                        <span>View all meetings</span>
                                                        <ChevronDown className="h-4 w-4 transition-transform duration-200 data-[state=open]:rotate-180" />
                                                    </div>
                                                </CollapsibleTrigger>
                                                <CollapsibleContent>
                                                    <div className="pt-4">
                                                        <MeetingsTabs 
                                                            upcomingMeetings={upcomingMeetings}
                                                            pendingMeetings={pendingMeetings}
                                                        />
                                                    </div>
                                                </CollapsibleContent>
                                            </div>
                                        </Collapsible>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Quick Links - Full Width */}
                    <QuickLinks />

                    {/* Communication Hub - Full Width */}
                    <CommunicationHub />

                    {/* About Us Card - Full Width */}
                    <AboutUsCard />
                </div>

                {/* Contact Section */}
                <div className="mt-8 lg:col-span-3">
                    <h2 className="text-2xl font-semibold text-center mb-8">Contact</h2>
                    <Contact />
                </div>
            </div>
        </div>
    )
}
