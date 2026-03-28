import DashboardShell from "@/components/dashboard/DashboardShell";
import { getItemTypesWithCounts } from "@/lib/db/items";
import { getSidebarCollections } from "@/lib/db/collections";
import { prisma } from "@/lib/prisma";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // TODO: Replace with authenticated user once auth is implemented
  const user = await prisma.user.findFirst();

  const userId = user?.id ?? "";

  const [itemTypes, collections] = await Promise.all([
    getItemTypesWithCounts(userId),
    getSidebarCollections(userId),
  ]);

  const sidebarData = {
    itemTypes,
    collections,
    user: {
      name: user?.name ?? "User",
      email: user?.email ?? "",
    },
  };

  return <DashboardShell sidebarData={sidebarData}>{children}</DashboardShell>;
}
