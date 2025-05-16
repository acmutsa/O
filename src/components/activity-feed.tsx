import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const activities = [
    {
        user: {
            name: "Sarah Chen",
            image: "",
            initials: "SC"
        },
        action: "Created a new event",
        details: "Web Development Workshop",
        time: "2 hours ago",
        type: "event"
    },
    {
        user: {
            name: "Alex Kim",
            image: "",
            initials: "AK"
        },
        action: "Posted an announcement",
        details: "Important updates about the hackathon",
        time: "5 hours ago",
        type: "announcement"
    },
    {
        user: {
            name: "Maria Garcia",
            image: "",
            initials: "MG"
        },
        action: "Updated project status",
        details: "Mobile App Development",
        time: "1 day ago",
        type: "project"
    },
    {
        user: {
            name: "James Wilson",
            image: "",
            initials: "JW"
        },
        action: "Added meeting notes",
        details: "Officer Meeting - Spring Planning",
        time: "1 day ago",
        type: "meeting"
    }
]

export function ActivityFeed() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates from the ACM community</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-8">
                    {activities.map((activity, index) => (
                        <div key={index} className="flex items-start gap-4">
                            <Avatar className="h-9 w-9">
                                <AvatarImage src={activity.user.image} alt={activity.user.name} />
                                <AvatarFallback>{activity.user.initials}</AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">
                                    {activity.user.name}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {activity.action}
                                </p>
                                <div className="flex items-center pt-2">
                                    <Badge variant="secondary" className="rounded-sm">
                                        {activity.details}
                                    </Badge>
                                    <span className="text-xs text-muted-foreground ml-2">
                                        {activity.time}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
