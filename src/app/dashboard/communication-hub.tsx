import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bell, MessageCircle, Users, Megaphone, AlertCircle } from "lucide-react"

interface Message {
    id: string
    type: 'announcement' | 'important' | 'feedback'
    title: string
    content: string
    date: string
    status?: 'new' | 'urgent' | 'pending'
}

// Mock data - In real app, this would come from your backend
const messages: Message[] = [
    {
        id: "1",
        type: "announcement",
        title: "Summer Workshop Series",
        content: "New workshop series starting next month. Please review and provide input.",
        date: "2025-05-15",
        status: "new"
    },
    {
        id: "2",
        type: "important",
        title: "Budget Review Meeting",
        content: "Mandatory budget review meeting this Friday at 3 PM.",
        date: "2025-05-16",
        status: "urgent"
    },
    {
        id: "3",
        type: "feedback",
        title: "Member Survey Results",
        content: "Latest member satisfaction survey results are ready for review.",
        date: "2025-05-14",
        status: "pending"
    }
]

export function CommunicationHub() {
    return (
        <Card>
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-2xl font-bold">Communication Hub</CardTitle>
                        <CardDescription>Stay connected with your team</CardDescription>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="icon">
                            <MessageCircle className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                            <Megaphone className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="all" className="space-y-4">
                    <TabsList className="grid grid-cols-4 h-auto gap-4 bg-muted p-1">
                        <TabsTrigger value="all" className="data-[state=active]:bg-background">
                            <span className="sr-only">All</span>
                            <Bell className="h-4 w-4" />
                        </TabsTrigger>
                        <TabsTrigger value="announcements" className="data-[state=active]:bg-background">
                            <span className="sr-only">Announcements</span>
                            <Megaphone className="h-4 w-4" />
                        </TabsTrigger>
                        <TabsTrigger value="important" className="data-[state=active]:bg-background">
                            <span className="sr-only">Important</span>
                            <AlertCircle className="h-4 w-4" />
                        </TabsTrigger>
                        <TabsTrigger value="feedback" className="data-[state=active]:bg-background">
                            <span className="sr-only">Feedback</span>
                            <Users className="h-4 w-4" />
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="all" className="space-y-4">
                        <ScrollArea className="h-[300px] pr-4">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className="mb-4 rounded-lg border bg-card p-4 last:mb-0"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="text-sm font-semibold">{message.title}</h4>
                                        {message.status && (
                                            <Badge 
                                                variant={
                                                    message.status === "urgent" 
                                                        ? "destructive" 
                                                        : message.status === "new" 
                                                            ? "default" 
                                                            : "secondary"
                                                }
                                            >
                                                {message.status}
                                            </Badge>
                                        )}
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-2">
                                        {message.content}
                                    </p>
                                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                                        <span>{new Date(message.date).toLocaleDateString()}</span>
                                        <span className="capitalize">{message.type}</span>
                                    </div>
                                </div>
                            ))}
                        </ScrollArea>
                    </TabsContent>

                    <TabsContent value="announcements" className="space-y-4">
                        <ScrollArea className="h-[300px] pr-4">
                            {messages.filter(m => m.type === 'announcement').map((message) => (
                                <div
                                    key={message.id}
                                    className="mb-4 rounded-lg border bg-card p-4 last:mb-0"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="text-sm font-semibold">{message.title}</h4>
                                        {message.status && (
                                            <Badge 
                                                variant={message.status === "urgent" ? "destructive" : "default"}
                                            >
                                                {message.status}
                                            </Badge>
                                        )}
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-2">
                                        {message.content}
                                    </p>
                                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                                        <span>{new Date(message.date).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            ))}
                        </ScrollArea>
                    </TabsContent>

                    <TabsContent value="important" className="space-y-4">
                        <ScrollArea className="h-[300px] pr-4">
                            {messages.filter(m => m.type === 'important').map((message) => (
                                <div
                                    key={message.id}
                                    className="mb-4 rounded-lg border bg-card p-4 last:mb-0"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="text-sm font-semibold">{message.title}</h4>
                                        {message.status && (
                                            <Badge variant="destructive">
                                                {message.status}
                                            </Badge>
                                        )}
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-2">
                                        {message.content}
                                    </p>
                                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                                        <span>{new Date(message.date).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            ))}
                        </ScrollArea>
                    </TabsContent>

                    <TabsContent value="feedback" className="space-y-4">
                        <ScrollArea className="h-[300px] pr-4">
                            {messages.filter(m => m.type === 'feedback').map((message) => (
                                <div
                                    key={message.id}
                                    className="mb-4 rounded-lg border bg-card p-4 last:mb-0"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="text-sm font-semibold">{message.title}</h4>
                                        {message.status && (
                                            <Badge variant="secondary">
                                                {message.status}
                                            </Badge>
                                        )}
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-2">
                                        {message.content}
                                    </p>
                                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                                        <span>{new Date(message.date).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            ))}
                        </ScrollArea>
                    </TabsContent>
                </Tabs>

                <div className="mt-4 flex items-center gap-2">
                    <Button className="w-full">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        New Message
                    </Button>
                    <Button variant="outline" className="w-full">
                        <Users className="mr-2 h-4 w-4" />
                        Request Feedback
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
