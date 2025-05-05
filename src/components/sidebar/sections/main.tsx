"use client";

import {
	Folder,
	Forward,
	MoreHorizontal,
	Trash2,
	type LucideIcon,
} from "lucide-react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuAction,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

export function NavMain({
	sections,
}: {
	sections: {
		name: string;
		url: string;
		icon: LucideIcon;
		subItems?: {
			name: string;
			url: string;
			icon: LucideIcon;
		}[];
	}[];
}) {
	const { isMobile } = useSidebar();
	const pathname = usePathname();

	return (
		<SidebarGroup>
			<SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">
				Tools
			</SidebarGroupLabel>
			<SidebarMenu>
				{sections.map((item) => (
					<SidebarMenuItem key={item.name}>
						<SidebarMenuButton
							isActive={
								item.url === "/"
									? pathname === item.url
									: pathname.startsWith(item.url)
							}
							asChild
						>
							<a href={item.url}>
								<item.icon />
								<span className="group-data-[collapsible=icon]:hidden">
									{item.name}
								</span>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				))}
			</SidebarMenu>
		</SidebarGroup>
	);
}
