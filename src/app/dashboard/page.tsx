import StatsCards from "@/components/dashboard/StatsCards";
import RecentCollections from "@/components/dashboard/RecentCollections";
import PinnedItems from "@/components/dashboard/PinnedItems";
import RecentItems from "@/components/dashboard/RecentItems";
import { getRecentCollections, getDashboardStats } from "@/lib/db/collections";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  // TODO: Replace with authenticated user once auth is implemented
  const user = await prisma.user.findFirst();

  const userId = user?.id ?? "";

  const [collections, stats] = await Promise.all([
    getRecentCollections(userId),
    getDashboardStats(userId),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Your developer knowledge hub</p>
      </div>
      <StatsCards stats={stats} />
      <RecentCollections collections={collections} />
      <PinnedItems />
      <RecentItems />
    </div>
  );
}
