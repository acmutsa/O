import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronDown, Settings, Mail, MessageSquare } from "lucide-react"
import { Contact } from "./contact"

export function ProfileCard() {
    return (
        <Card>
            <CardHeader className="pt-6 px-6">
                <div className="flex flex-col items-center space-y-4">
                    <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary/50 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
                        <Avatar className="h-24 w-24 ring-2 ring-background relative">
                            <AvatarImage src="/avatars/default.png" alt="Profile Picture" />
                            <AvatarFallback className="text-2xl bg-primary/10">CM</AvatarFallback>
                        </Avatar>
                        <button className="absolute bottom-0 right-0 rounded-full p-1 bg-background ring-2 ring-background hover:text-primary transition-colors">
                            <Settings className="h-4 w-4" />
                        </button>
                    </div>
                    <div className="space-y-2 text-center">
                        <div className="space-y-1">
                            <CardTitle className="text-2xl font-bold">Carlos Moreno</CardTitle>
                            <CardDescription>Technical Officer</CardDescription>
                        </div>
                        <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                            Web Development Team
                        </Badge>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="px-6">
                <div className="space-y-6">
                    <div className="grid grid-cols-3 gap-2 p-2 bg-primary/5 rounded-lg">
                        <div className="text-center p-2 rounded hover:bg-primary/10 transition-colors">
                            <div className="text-2xl font-bold text-primary">25</div>
                            <div className="text-xs text-muted-foreground">Points</div>
                        </div>
                        <div className="text-center p-2 rounded hover:bg-primary/10 transition-colors">
                            <div className="text-2xl font-bold text-primary">8</div>
                            <div className="text-xs text-muted-foreground">Events</div>
                        </div>
                        <div className="text-center p-2 rounded hover:bg-primary/10 transition-colors">
                            <div className="text-2xl font-bold text-primary">4</div>
                            <div className="text-xs text-muted-foreground">Projects</div>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Button variant="outline" className="w-full gap-2">
                            <Mail className="h-4 w-4" />
                            Message
                        </Button>
                        <Button variant="outline" className="w-full gap-2">
                            <MessageSquare className="h-4 w-4" />
                            Discord
                        </Button>
                    </div>

                    {/* Additional Details with Show More */}
                    <Collapsible>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <div className="space-y-1">
                                    <div className="text-sm font-medium">Email</div>
                                    <div className="text-sm text-muted-foreground">officer@acmutsa.org</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-sm font-medium">Discord</div>
                                    <div className="text-sm text-muted-foreground">@acmutsa_officer</div>
                                </div>
                            </div>
                            <CollapsibleTrigger className="w-full">
                                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors">
                                    <span>Show more details</span>
                                    <ChevronDown className="h-4 w-4 transition-transform duration-200 data-[state=open]:rotate-180" />
                                </div>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <div className="space-y-4 pt-4">
                                    <div className="space-y-1">
                                        <div className="text-sm font-medium">Position</div>
                                        <div className="text-sm text-muted-foreground">Technical Officer</div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-sm font-medium">Department</div>
                                        <div className="text-sm text-muted-foreground">Web Development</div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-sm font-medium">Responsibilities</div>
                                        <div className="text-sm text-muted-foreground">Website maintenance, technical workshops</div>
                                    </div>
                                </div>
                            </CollapsibleContent>
                        </div>
                    </Collapsible>
                </div>
            </CardContent>
        </Card>
    )
}
