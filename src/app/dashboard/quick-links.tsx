import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Wrench, Settings, Users, Calendar, FileCode, Book, Mail, Database, Shield } from "lucide-react"
import * as React from "react"

interface QuickLink {
    title: string
    description: string
    icon: React.ReactNode
    href: string
    category: 'resources' | 'documents' | 'tools' | 'admin'
}

const quickLinks: QuickLink[] = [
    // Resources
    {
        title: "Member Directory",
        description: "Access the complete member database",
        icon: <Users className="h-6 w-6" />,
        href: "/members",
        category: "resources"
    },
    {
        title: "Event Calendar",
        description: "View and manage events",
        icon: <Calendar className="h-6 w-6" />,
        href: "/calendar",
        category: "resources"
    },
    {
        title: "Documentation",
        description: "Access guides and docs",
        icon: <Book className="h-6 w-6" />,
        href: "/docs",
        category: "resources"
    },

    // Documents
    {
        title: "Meeting Minutes",
        description: "Past meeting records",
        icon: <FileText className="h-6 w-6" />,
        href: "/minutes",
        category: "documents"
    },
    {
        title: "Project Reports",
        description: "View project status",
        icon: <FileCode className="h-6 w-6" />,
        href: "/reports",
        category: "documents"
    },
    {
        title: "Templates",
        description: "Standard forms and templates",
        icon: <Mail className="h-6 w-6" />,
        href: "/templates",
        category: "documents"
    },

    // Tools
    {
        title: "Email Manager",
        description: "Manage communications",
        icon: <Mail className="h-6 w-6" />,
        href: "/email",
        category: "tools"
    },
    {
        title: "Database Access",
        description: "Direct database tools",
        icon: <Database className="h-6 w-6" />,
        href: "/database",
        category: "tools"
    },
    {
        title: "Dev Tools",
        description: "Technical resources",
        icon: <Wrench className="h-6 w-6" />,
        href: "/tools/dev",
        category: "tools"
    },

    // Administrative
    {
        title: "Admin Panel",
        description: "System administration",
        icon: <Settings className="h-6 w-6" />,
        href: "/admin",
        category: "admin"
    },
    {
        title: "Permissions",
        description: "Access control",
        icon: <Shield className="h-6 w-6" />,
        href: "/permissions",
        category: "admin"
    }
]

export function QuickLinks() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary/60 to-primary bg-clip-text text-transparent">
                    Quick Links
                </CardTitle>
                <CardDescription className="text-base">
                    Frequently used resources and tools
                </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
                <Tabs defaultValue="resources" className="w-full">
                    <TabsList className="grid w-full grid-cols-4 mb-8">
                        <TabsTrigger value="resources">Resources</TabsTrigger>
                        <TabsTrigger value="documents">Documents</TabsTrigger>
                        <TabsTrigger value="tools">Tools</TabsTrigger>
                        <TabsTrigger value="admin">Admin</TabsTrigger>
                    </TabsList>
                    {['resources', 'documents', 'tools', 'admin'].map((category) => (
                        <TabsContent key={category} value={category}>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {quickLinks
                                    .filter(link => link.category === category)
                                    .map((link, index) => (
                                        <a
                                            key={index}
                                            href={link.href}
                                            className="group relative overflow-hidden rounded-lg border p-6 hover:border-primary/50 hover:bg-accent transition-all duration-300"
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className="p-2 rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20 group-hover:bg-primary/20 transition-colors">
                                                    {link.icon}
                                                </div>
                                                <div className="space-y-1">
                                                    <h3 className="font-semibold leading-none tracking-tight group-hover:text-primary transition-colors">
                                                        {link.title}
                                                    </h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        {link.description}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </a>
                                    ))}
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            </CardContent>
        </Card>
    )
}
