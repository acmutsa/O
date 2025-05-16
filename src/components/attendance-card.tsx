import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export function AttendanceCard() {
    return (
        <Card>
            <CardHeader className="py-8 text-center">
                <div className="flex flex-col items-center space-y-4">
                    <div className="rounded-full bg-gradient-to-r from-primary/10 via-primary/30 to-primary/10 p-3 ring-2 ring-primary/20">
                        <div className="text-3xl font-bold text-primary">32</div>
                    </div>
                    <div>
                        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary/60 to-primary bg-clip-text text-transparent">
                            Attendance Points
                        </CardTitle>
                        <CardDescription className="text-lg mt-2">
                            Track your participation and engagement
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="px-6">
                <div className="space-y-6">
                    {/* Progress and Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-2 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-lg p-6">
                            <Progress value={64} className="h-3" />
                            <p className="text-sm text-center text-muted-foreground">
                                64% towards next achievement level
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="text-center p-4 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
                                <div className="text-2xl font-bold text-primary">12</div>
                                <div className="text-sm text-muted-foreground">Meetings</div>
                            </div>
                            <div className="text-center p-4 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
                                <div className="text-2xl font-bold text-primary">4</div>
                                <div className="text-sm text-muted-foreground">Events</div>
                            </div>
                        </div>
                    </div>

                    {/* Latest Activity with Show More */}
                    <Collapsible>
                        <div className="pt-6 space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                                    <span>Web Dev Workshop</span>
                                </div>
                                <div className="flex items-center gap-3 text-muted-foreground">
                                    <span>+2pts</span>
                                    <span className="text-xs">May 12</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                                    <span>Officer Meeting</span>
                                </div>
                                <div className="flex items-center gap-3 text-muted-foreground">
                                    <span>+1pts</span>
                                    <span className="text-xs">May 10</span>
                                </div>
                            </div>
                            <CollapsibleTrigger className="w-full pt-2">
                                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors">
                                    <span>Show more activity</span>
                                    <ChevronDown className="h-4 w-4 transition-transform duration-200 data-[state=open]:rotate-180" />
                                </div>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <div className="space-y-2 pt-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2">
                                            <div className="h-2 w-2 rounded-full bg-primary"></div>
                                            <span>Hackathon Planning</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-muted-foreground">
                                            <span>+2pts</span>
                                            <span className="text-xs">May 8</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2">
                                            <div className="h-2 w-2 rounded-full bg-primary"></div>
                                            <span>Tech Talk</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-muted-foreground">
                                            <span>+2pts</span>
                                            <span className="text-xs">May 5</span>
                                        </div>
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
