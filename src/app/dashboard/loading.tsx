import { Skeleton } from "@/components/ui/skeleton";
import {
  StatsCardsSkeleton,
  CollectionsSkeleton,
  PinnedItemsSkeleton,
  RecentItemsSkeleton,
} from "@/components/dashboard/skeletons";

export default function DashboardLoading() {
  return (
    <div className="space-y-8">
      <div>
        <Skeleton className="h-8 w-40" />
        <Skeleton className="mt-2 h-4 w-56" />
      </div>
      <StatsCardsSkeleton />
      <CollectionsSkeleton />
      <PinnedItemsSkeleton />
      <RecentItemsSkeleton />
    </div>
  );
}
