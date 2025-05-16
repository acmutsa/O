import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { InfoIcon } from "lucide-react"

export function AboutAcm() {
    return (
        <Card className="group">
            <CardHeader className="cursor-pointer select-none py-6">
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-xl">About ACM</CardTitle>
                        <CardDescription className="text-sm mt-1.5">Organization Information</CardDescription>
                    </div>
                    <div className="p-2 rounded-full bg-orange-100 dark:bg-orange-900/20">
                        <InfoIcon className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                    </div>
                </div>
            </CardHeader>
            <CardContent className="px-6 pb-6">
                <div className="space-y-6">
                    {/* Main Description */}
                    <div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            The Association for Computing Machinery at UTSA is dedicated to giving members and students 
                            the opportunity to gain experience, network, socialize, learn, and grow outside of the 
                            classroom in all fields of technology and computing.
                        </p>
                    </div>

                    {/* Organization Info */}
                    <div className="space-y-4">
                        <div>
                            <h4 className="text-sm font-semibold mb-2">Organization</h4>
                            <p className="text-sm text-muted-foreground">
                                Our chapter is organized to serve students for academic, professional, and social 
                                purposes at UTSA. The Chapter shall be involved with and conduct activities that 
                                support our mission.
                            </p>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 gap-4 pt-2">
                            <div className="rounded-lg bg-muted p-3">
                                <div className="text-sm font-medium">Active Members</div>
                                <div className="text-2xl font-bold text-primary">200+</div>
                            </div>
                            <div className="rounded-lg bg-muted p-3">
                                <div className="text-sm font-medium">Annual Events</div>
                                <div className="text-2xl font-bold text-primary">24+</div>
                            </div>
                        </div>

                        {/* Key Activities */}
                        <div>
                            <h4 className="text-sm font-semibold mb-2">Key Activities</h4>
                            <ul className="text-sm text-muted-foreground space-y-1.5">
                                <li className="flex items-center">
                                    <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></span>
                                    Technical Workshops
                                </li>
                                <li className="flex items-center">
                                    <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></span>
                                    Networking Events
                                </li>
                                <li className="flex items-center">
                                    <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></span>
                                    Hackathons
                                </li>
                                <li className="flex items-center">
                                    <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></span>
                                    Professional Development
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
