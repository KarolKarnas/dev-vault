"use client";

import { useState } from "react";
import TopBar from "@/components/dashboard/TopBar";
import Sidebar from "@/components/dashboard/Sidebar";
import SidebarMobile from "@/components/dashboard/SidebarMobile";
import type { SidebarData } from "@/components/dashboard/Sidebar";

interface DashboardShellProps {
  children: React.ReactNode;
  sidebarData: SidebarData;
}

export default function DashboardShell({
  children,
  sidebarData,
}: DashboardShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen flex-col">
      <TopBar onMenuClick={() => setMobileOpen(true)} />
      <div className="flex flex-1 overflow-hidden">
        <div className="hidden md:flex">
          <Sidebar
            collapsed={collapsed}
            onToggle={() => setCollapsed((prev) => !prev)}
            data={sidebarData}
          />
        </div>
        <SidebarMobile
          open={mobileOpen}
          onOpenChange={setMobileOpen}
          data={sidebarData}
        />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
