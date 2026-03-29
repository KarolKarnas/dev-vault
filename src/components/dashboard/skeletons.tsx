import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function StatsCardsSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i}>
          <CardContent className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-lg" />
            <div className="space-y-1.5">
              <Skeleton className="h-7 w-12" />
              <Skeleton className="h-3 w-20" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function CollectionsSkeleton() {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-4 w-14" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl border bg-card p-4 space-y-3">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-4 w-full" />
            <div className="flex gap-1.5">
              {Array.from({ length: 3 }).map((_, j) => (
                <Skeleton key={j} className="h-3.5 w-3.5 rounded-full" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ItemListSkeleton({ count }: { count: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between rounded-lg border border-border bg-card p-4"
        >
          <div className="flex items-center gap-3">
            <Skeleton className="h-4 w-4 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-56" />
              <div className="flex gap-1.5">
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-12 rounded-full" />
              </div>
            </div>
          </div>
          <Skeleton className="h-3 w-12" />
        </div>
      ))}
    </div>
  );
}

export function PinnedItemsSkeleton() {
  return (
    <section>
      <div className="mb-4 flex items-center gap-2">
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-6 w-16" />
      </div>
      <ItemListSkeleton count={3} />
    </section>
  );
}

export function RecentItemsSkeleton() {
  return (
    <section>
      <div className="mb-4 flex items-center gap-2">
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-6 w-16" />
      </div>
      <ItemListSkeleton count={5} />
    </section>
  );
}

function SidebarSkeletonContent() {
  return (
    <>
      {/* Item types */}
      <nav className="px-2 space-y-1">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between px-3 py-2">
            <div className="flex items-center gap-3">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-3 w-5" />
          </div>
        ))}
      </nav>

      <Separator className="my-3" />

      {/* Collections */}
      <div className="px-4 pb-1">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-6 w-6 rounded-md" />
        </div>
      </div>
      <div className="px-2 space-y-1">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 px-3 py-2">
            <Skeleton className="h-3 w-3 rounded-full" />
            <Skeleton className="h-4 w-28" />
          </div>
        ))}
      </div>

      <div className="mt-auto" />
      <Separator />

      {/* User area */}
      <div className="flex items-center gap-3 px-4 py-3">
        <Skeleton className="h-8 w-8 rounded-full" />
        <div className="flex-1 space-y-1.5">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-32" />
        </div>
      </div>
    </>
  );
}

export function SidebarSkeleton() {
  return (
    <aside className="flex w-64 flex-col border-r border-border bg-sidebar text-sidebar-foreground">
      <div className="flex items-center justify-between px-4 py-3">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-7 w-7 rounded-md" />
      </div>
      <SidebarSkeletonContent />
    </aside>
  );
}

export function MobileSidebarSkeleton() {
  return (
    <>
      <div className="flex items-center px-4 py-3">
        <Skeleton className="h-4 w-12" />
      </div>
      <SidebarSkeletonContent />
    </>
  );
}
