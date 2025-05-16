"use client";

import * as React from "react";
import {
	AudioWaveform,
	BookOpen,
	Bot,
	Command,
	Frame,
	GalleryVerticalEnd,
	Map,
	PieChart,
	Settings2,
	SquareTerminal,
	Home,
	Link as LinkIcon,
	Users,
	Building,
	ListChecks,
	Receipt,
	CreditCard,
	BadgeDollarSign,
	Settings
} from "lucide-react";

import { NavMain } from "./sections/main";
import { NavUser } from "./sections/user";
import { Header } from "./sections/header";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
	user: {
		firstName: string;
		lastName: string;
		email: string;
		avatar: string | null;
	};
	showAdmin?: boolean;
}

export function AppSidebar({
	user,
	showAdmin = false,
	...props
}: AppSidebarProps) {
	const sections = [
		{
			name: "Home",
			url: "/",
			icon: Home,
		},
		{
			name: "Meetings",
			url: "/meet",
			icon: AudioWaveform,
		},
		{
			name: "Links",
			url: "/links",
			icon: LinkIcon,
		},
		{
			name: "Directory",
			url: "/directory",
			icon: BookOpen,
		},
		{
			name: "Initiatives",
			url: "/initiatives",
			icon: Frame,
		},
		{
			name: "Finance",
			url: "/finance",
			icon: PieChart,
		},
		{
			name: "Inventory",
			url: "/inventory",
			icon: GalleryVerticalEnd,
		},
		{
			name:"Settings",
			url: "/settings",
			icon: Settings,
		},
		...(showAdmin
			? [
					{
						name: "Admin",
						url: "/admin",
						icon: Settings2,
						subItems: [
							{
								name: "Teams",
								url: "/admin/teams",
							},
							{
								name: "Logs",
								url: "/admin/logs",
							},
						],
					},
				]
			: []),
	];

	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<Header />
			</SidebarHeader>
			<SidebarContent>
				<NavMain sections={sections} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={user} />
			</SidebarFooter>
		</Sidebar>
	);
}
