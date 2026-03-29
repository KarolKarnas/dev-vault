import { Suspense, cache } from "react";
import DashboardShell from "@/components/dashboard/DashboardShell";
import Sidebar from "@/components/dashboard/Sidebar";
import SidebarMobile from "@/components/dashboard/SidebarMobile";
import {
  SidebarSkeleton,
  MobileSidebarSkeleton,
} from "@/components/dashboard/skeletons";
import { getItemTypesWithCounts } from "@/lib/db/items";
import { getSidebarCollections } from "@/lib/db/collections";
import { getCurrentUser } from "@/lib/db/user";
import type { SidebarData } from "@/components/dashboard/Sidebar";

const getSidebarData = cache(async (): Promise<SidebarData> => {
  const currentUser = await getCurrentUser();
  const userId = currentUser?.id ?? "";

  const [itemTypes, collections] = await Promise.all([
    getItemTypesWithCounts(userId),
    getSidebarCollections(userId),
  ]);

  return {
    itemTypes,
    collections,
    user: {
      name: currentUser?.name ?? "User",
      email: currentUser?.email ?? "",
    },
  };
});

async function DesktopSidebar() {
  const data = await getSidebarData();
  return <Sidebar data={data} />;
}

async function MobileSidebarContent() {
  const data = await getSidebarData();
  return <SidebarMobile data={data} />;
}

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DashboardShell
      sidebarSlot={
        <Suspense fallback={<SidebarSkeleton />}>
          <DesktopSidebar />
        </Suspense>
      }
      mobileSidebarSlot={
        <Suspense fallback={<MobileSidebarSkeleton />}>
          <MobileSidebarContent />
        </Suspense>
      }
    >
      {children}
    </DashboardShell>
  );
}
