"use client";

import * as React from "react";
import { ChevronsUpDown, Plus } from "lucide-react";
import Image from "next/image";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";

export function Header() {
	const { isMobile } = useSidebar();

	return (
		<SidebarMenu className="flex max-h-16 justify-center">
			<div className="flex h-full items-center">
				<Image src="/logo/o.png" alt="O Logo" width={32} height={32} />
			</div>
		</SidebarMenu>
	);
}
