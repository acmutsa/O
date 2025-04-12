"use client";

import { useState, useEffect } from "react";
import {
	BadgeCheck,
	Bell,
	ChevronsUpDown,
	Cog,
	CreditCard,
	LogOut,
	Sparkles,
	Sun,
	Moon,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";

export function NavUser({
	user,
}: {
	user: {
		firstName: string;
		lastName: string;
		email: string;
		avatar: string | null;
	};
}) {
	const { isMobile } = useSidebar();
	const [theme, setTheme] = useState<"light" | "dark">("light");

	useEffect(() => {
		const currentTheme = document.documentElement.classList.contains("dark")
			? "dark"
			: "light";
		setTheme(currentTheme);
	}, []);

	function toggleTheme() {
		const newTheme = theme === "light" ? "dark" : "light";
		setTheme(newTheme);
		document.cookie = `o_theme=${newTheme}; path=/; max-age=31536000`;
		if (newTheme === "dark") {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<Avatar className="h-8 w-8 rounded-lg">
								{user.avatar && (
									<AvatarImage
										src={user.avatar}
										alt={`${user.firstName} ${user.lastName} Profile Picture`}
									/>
								)}
								<AvatarFallback className="rounded-lg">
									{user.firstName.charAt(0).toUpperCase() +
										user.lastName.charAt(0).toUpperCase()}
								</AvatarFallback>
							</Avatar>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-semibold">{`${user.firstName} ${user.lastName}`}</span>
								<span className="truncate text-xs">
									{user.email}
								</span>
							</div>
							<ChevronsUpDown className="ml-auto size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
						side={isMobile ? "bottom" : "right"}
						align="end"
						sideOffset={4}
					>
						<DropdownMenuLabel className="p-0 font-normal">
							<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
								<Avatar className="h-8 w-8 rounded-lg">
									{user.avatar && (
										<AvatarImage
											src={user.avatar}
											alt={`${user.firstName} ${user.lastName} Profile Picture`}
										/>
									)}
									<AvatarFallback className="rounded-lg">
										{user.firstName
											.charAt(0)
											.toUpperCase() +
											user.lastName
												.charAt(0)
												.toUpperCase()}
									</AvatarFallback>
								</Avatar>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-semibold">{`${user.firstName} ${user.lastName}`}</span>
									<span className="truncate text-xs">
										{user.email}
									</span>
								</div>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem>
								<Cog />
								Settings
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={toggleTheme}
								className="cursor-pointer"
							>
								{theme === "light" ? <Sun /> : <Moon />}
								Toggle theme
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<LogOut />
							Log out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
