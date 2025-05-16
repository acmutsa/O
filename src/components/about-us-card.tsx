import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react"

export function AboutUsCard() {
    return (
        <Card>
            <CardHeader className="py-8 text-center">
                <div className="flex flex-col items-center space-y-4">
                    <div className="rounded-full bg-gradient-to-r from-primary/10 via-primary/30 to-primary/10 p-3 ring-2 ring-primary/20">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="h-8 w-8 text-primary"
                        >
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                            <path d="M2 8c0-2.2.7-4.3 2-6" />
                            <path d="M22 8a10 10 0 0 0-2-6" />
                        </svg>
                    </div>
                    <div>
                        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary/60 to-primary bg-clip-text text-transparent">
                            Officer Guidelines
                        </CardTitle>
                        <CardDescription className="text-lg mt-2">
                            Important information for ACM UTSA officers
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="px-6">
                <div className="space-y-6">
                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-lg p-6">
                        <div className="text-center">
                            <div className="text-lg font-bold text-primary">24/7</div>
                            <div className="text-xs text-muted-foreground">Support Hours</div>
                        </div>
                        <div className="text-center">
                            <div className="text-lg font-bold text-primary">15min</div>
                            <div className="text-xs text-muted-foreground">Response Time</div>
                        </div>
                        <div className="text-center">
                            <div className="text-lg font-bold text-primary">99.9%</div>
                            <div className="text-xs text-muted-foreground">System Uptime</div>
                        </div>
                        <div className="text-center">
                            <div className="text-lg font-bold text-primary">24/7</div>
                            <div className="text-xs text-muted-foreground">Chat Support</div>
                        </div>
                    </div>

                    {/* Guidelines Info */}
                    <Collapsible>
                        <div className="space-y-4">
                            <div className="flex flex-col md:flex-row items-center gap-8 justify-center">
                                <p className="text-sm text-muted-foreground text-center md:text-left max-w-xl">
                                    Welcome to the ACM UTSA Officer Portal. This internal tool is designed to streamline officer duties and enhance communication within our team. Please review the guidelines and contact support if you need assistance.
                                </p>
                                <div className="flex items-center gap-4">
                                    <a 
                                        href="#" 
                                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                                    >
                                        View Manual
                                    </a>
                                    <a 
                                        href="#" 
                                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                                    >
                                        Get Help
                                    </a>
                                </div>
                            </div>
                            <CollapsibleTrigger className="w-full">
                                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors">
                                    <span>View officer guidelines</span>
                                    <ChevronDown className="h-4 w-4 transition-transform duration-200 data-[state=open]:rotate-180" />
                                </div>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <h4 className="text-sm font-medium">Access Levels</h4>
                                            <p className="text-sm text-muted-foreground">
                                                Different officer roles have varying levels of access. Ensure you understand your permissions and responsibilities within the system.
                                            </p>
                                        </div>
                                        <div className="space-y-2">
                                            <h4 className="text-sm font-medium">Data Guidelines</h4>
                                            <p className="text-sm text-muted-foreground">
                                                Handle all member data with care and follow our data protection protocols. Never share sensitive information outside the organization.
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium mb-2">Key Responsibilities</h4>
                                        <ul className="text-sm text-muted-foreground space-y-2">
                                            <li className="flex items-center gap-2">
                                                <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                                                Regular system monitoring
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                                                Timely response to requests
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                                                Data backup verification
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                                                Security protocol adherence
                                            </li>
                                        </ul>
                                        <ul className="text-sm text-muted-foreground space-y-2 mt-4">
                                            <li className="flex items-center gap-2">
                                                <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                                                Issue escalation process
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                                                System maintenance schedule
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                                                Emergency procedures
                                            </li>
                                        </ul>
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
