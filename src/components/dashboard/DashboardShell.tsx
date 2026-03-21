"use client";

import { useState } from "react";
import TopBar from "@/components/dashboard/TopBar";
import Sidebar from "@/components/dashboard/Sidebar";
import SidebarMobile from "@/components/dashboard/SidebarMobile";

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
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
          />
        </div>
        <SidebarMobile open={mobileOpen} onOpenChange={setMobileOpen} />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
