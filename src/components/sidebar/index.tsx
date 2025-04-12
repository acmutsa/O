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
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  const sections = [
    {
      name: "Meetings",
      url: "#",
      icon: AudioWaveform,
    },
    {
      name: "Directory",
      url: "#",
      icon: BookOpen,
    },
    {
      name: "Initiatives",
      url: "#",
      icon: Frame,
    },
    {
      name: "Finance",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Inventory",
      url: "#",
      icon: GalleryVerticalEnd,
    },
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
