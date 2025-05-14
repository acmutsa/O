"use client";

import {
	ChevronRight,
	Folder,
	Forward,
	MoreHorizontal,
	Trash2,
	type LucideIcon,
} from "lucide-react";

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
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
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
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
				{sections.map((item) => {
					const isActive =
						item.url === "/"
							? pathname === item.url
							: pathname.startsWith(item.url);

					// If the item has sub-items, render it as a collapsible
					if (item.subItems && item.subItems.length > 0) {
						return (
							<Collapsible
								key={item.name}
								asChild
								defaultOpen={isActive}
								className="group/collapsible"
							>
								<SidebarMenuItem>
									<CollapsibleTrigger asChild>
										<SidebarMenuButton tooltip={item.name}>
											<item.icon />
											<span className="group-data-[collapsible=icon]:hidden">
												{item.name}
											</span>
											<ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
										</SidebarMenuButton>
									</CollapsibleTrigger>
									<CollapsibleContent>
										<SidebarMenuSub>
											{item.subItems.map((subItem) => (
												<SidebarMenuSubItem
													key={subItem.name}
												>
													<SidebarMenuSubButton
														isActive={pathname.startsWith(
															subItem.url,
														)}
														asChild
													>
														<a href={subItem.url}>
															<span>
																{subItem.name}
															</span>
														</a>
													</SidebarMenuSubButton>
												</SidebarMenuSubItem>
											))}
										</SidebarMenuSub>
									</CollapsibleContent>
								</SidebarMenuItem>
							</Collapsible>
						);
					}

					// Otherwise, render a regular menu item
					return (
						<SidebarMenuItem key={item.name}>
							<SidebarMenuButton isActive={isActive} asChild>
								<a href={item.url}>
									<item.icon />
									<span className="group-data-[collapsible=icon]:hidden">
										{item.name}
									</span>
								</a>
							</SidebarMenuButton>
						</SidebarMenuItem>
					);
				})}
			</SidebarMenu>
		</SidebarGroup>
	);
}
