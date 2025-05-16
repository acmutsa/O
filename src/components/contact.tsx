import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Mail, MessageSquare } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"

export function Contact() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="relative overflow-hidden group">
                <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className="p-3 rounded-full bg-orange-100 dark:bg-orange-900/20 group-hover:bg-orange-200 dark:group-hover:bg-orange-900/30 transition-colors">
                            <MapPin className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                        </div>
                        <div>
                            <h3 className="font-semibold mb-1">Location</h3>
                            <p className="text-sm text-muted-foreground">1 UTSA Circle, San Antonio, TX 78249</p>
                        </div>
                        <HoverCard>
                            <HoverCardTrigger asChild>
                                <Button variant="link" className="text-orange-600 dark:text-orange-400 p-0 h-auto">
                                    View on map
                                </Button>
                            </HoverCardTrigger>
                            <HoverCardContent className="w-80">
                                <div className="space-y-2">
                                    <h4 className="text-sm font-semibold">UTSA Main Campus</h4>
                                    <p className="text-sm">Located in the heart of San Antonio&apos;s growing technology corridor</p>
                                </div>
                            </HoverCardContent>
                        </HoverCard>
                    </div>
                </CardContent>
            </Card>

            <Card className="relative overflow-hidden group">
                <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/20 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/30 transition-colors">
                            <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <h3 className="font-semibold mb-1">Email</h3>
                            <p className="text-sm text-muted-foreground">team@acmutsa.org</p>
                        </div>
                        <Button variant="link" className="text-blue-600 dark:text-blue-400 p-0 h-auto" asChild>
                            <a href="mailto:team@acmutsa.org">Send us an email</a>
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card className="relative overflow-hidden group">
                <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-900/20 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-900/30 transition-colors">
                            <MessageSquare className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <div>
                            <h3 className="font-semibold mb-1">Discord</h3>
                            <p className="text-sm text-muted-foreground">Join our community</p>
                        </div>
                        <Button variant="secondary" size="sm" className="h-8" asChild>
                            <a href="https://discord.gg/acmutsa" target="_blank" rel="noopener noreferrer">
                                Join Discord
                            </a>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
