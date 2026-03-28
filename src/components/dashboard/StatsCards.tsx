import {
  Code,
  FolderOpen,
  Star,
  Heart,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { DashboardStats } from "@/lib/db/collections";

interface StatsCardsProps {
  stats: DashboardStats;
}

export default function StatsCards({ stats }: StatsCardsProps) {
  const statItems = [
    {
      label: "Total Items",
      value: stats.totalItems,
      icon: Code,
      color: "text-blue-500",
    },
    {
      label: "Collections",
      value: stats.totalCollections,
      icon: FolderOpen,
      color: "text-emerald-500",
    },
    {
      label: "Favorite Items",
      value: stats.favoriteItems,
      icon: Star,
      color: "text-yellow-500",
    },
    {
      label: "Favorite Collections",
      value: stats.favoriteCollections,
      icon: Heart,
      color: "text-pink-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {statItems.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label}>
            <CardContent className="flex items-center gap-4">
              <div className={`rounded-lg bg-muted p-2.5 ${stat.color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
