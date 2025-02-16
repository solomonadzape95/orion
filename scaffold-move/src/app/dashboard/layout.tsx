"use client"

import "../globals.css";

import { Sidebar, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SidebarNav } from "@/components/dashboard/sidebar-nav";
import { Cog, GitCompare, History, LayoutDashboard } from "lucide-react";

const sidebarItems = [
  {
    title: "Overview",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Compare Contracts",
    url: "/dashboard/compare",
    icon: GitCompare,
  },
  {
    title: "Audit History",
    url: "/dashboard/history",
    icon: History,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Cog,
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarNav items={sidebarItems} />
      </Sidebar>
      <main className="flex-1 p-4 lg:ml-16">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
