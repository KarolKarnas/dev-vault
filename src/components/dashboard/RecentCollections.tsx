import Link from "next/link";
import {
  Code,
  Sparkles,
  Terminal,
  StickyNote,
  File,
  Image,
  Link as LinkIcon,
  Star,
  MoreHorizontal,
  type LucideIcon,
} from "lucide-react";
import { mockCollections, mockItemTypes } from "@/lib/mock-data";

const iconMap: Record<string, LucideIcon> = {
  Code,
  Sparkles,
  Terminal,
  StickyNote,
  File,
  Image,
  Link: LinkIcon,
};

export default function RecentCollections() {
  const recentCollections = [...mockCollections]
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
    .slice(0, 6);

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Collections</h2>
        <Link
          href="/collections"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          View all
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {recentCollections.map((collection) => (
          <Link
            key={collection.id}
            href={`/collections/${collection.id}`}
            className="group rounded-xl border border-border bg-card p-4 transition-colors hover:bg-accent"
          >
            <div className="mb-3 flex items-start justify-between">
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{collection.name}</h3>
                {collection.isFavorite && (
                  <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
                )}
              </div>
              <MoreHorizontal className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
            <p className="mb-1 text-xs text-muted-foreground">
              {collection.itemCount} items
            </p>
            <p className="mb-4 text-sm text-muted-foreground line-clamp-1">
              {collection.description}
            </p>
            <div className="flex gap-1.5">
              {mockItemTypes.slice(0, 3).map((type) => {
                const Icon = iconMap[type.icon] ?? Code;
                return (
                  <Icon
                    key={type.id}
                    className="h-3.5 w-3.5"
                    style={{ color: type.color }}
                  />
                );
              })}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
