"use client";

import { useMemo, useState } from "react";
import TopBar from "@/components/dashboard/TopBar";
import { SidebarProvider } from "@/components/dashboard/SidebarContext";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";

interface DashboardShellProps {
  children: React.ReactNode;
  sidebarSlot: React.ReactNode;
  mobileSidebarSlot: React.ReactNode;
}

export default function DashboardShell({
  children,
  sidebarSlot,
  mobileSidebarSlot,
}: DashboardShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const contextValue = useMemo(
    () => ({ closeMobile: () => setMobileOpen(false) }),
    [],
  );

  return (
    <SidebarProvider value={contextValue}>
      <div className="flex h-screen flex-col">
        <TopBar onMenuClick={() => setMobileOpen(true)} />
        <div className="flex flex-1 overflow-hidden">
          <div className="hidden md:flex">{sidebarSlot}</div>
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetContent
              side="left"
              className="w-64 p-0 bg-sidebar text-sidebar-foreground"
            >
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              {mobileSidebarSlot}
            </SheetContent>
          </Sheet>
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
