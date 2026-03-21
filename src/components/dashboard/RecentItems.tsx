import Link from "next/link";
import {
  Clock,
  Star,
  Code,
  Sparkles,
  Terminal,
  StickyNote,
  File,
  Image,
  Link as LinkIcon,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { mockItems, mockItemTypes } from "@/lib/mock-data";

const iconMap: Record<string, LucideIcon> = {
  Code,
  Sparkles,
  Terminal,
  StickyNote,
  File,
  Image,
  Link: LinkIcon,
};

export default function RecentItems() {
  const recentItems = [...mockItems]
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
    .slice(0, 10);

  return (
    <section>
      <div className="mb-4 flex items-center gap-2">
        <Clock className="h-4 w-4 text-muted-foreground" />
        <h2 className="text-lg font-semibold">Recent</h2>
      </div>
      <div className="space-y-2">
        {recentItems.map((item) => {
          const itemType = mockItemTypes.find((t) => t.id === item.itemTypeId);
          const Icon = iconMap[itemType?.icon ?? "Code"] ?? Code;

          return (
            <Link
              key={item.id}
              href={`/items/${item.id}`}
              className="flex items-center justify-between rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent"
            >
              <div className="flex items-center gap-3 min-w-0">
                <Icon
                  className="h-4 w-4 shrink-0"
                  style={{ color: itemType?.color }}
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{item.title}</span>
                    {item.isFavorite && (
                      <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                    )}
                  </div>
                  <p className="mt-0.5 text-sm text-muted-foreground line-clamp-1">
                    {item.description}
                  </p>
                  {item.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <span className="shrink-0 text-xs text-muted-foreground ml-4">
                {item.updatedAt.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
