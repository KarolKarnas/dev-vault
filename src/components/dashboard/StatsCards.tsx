import {
  Code,
  FolderOpen,
  Star,
  Heart,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { mockItems, mockCollections } from "@/lib/mock-data";

const stats = [
  {
    label: "Total Items",
    value: mockItems.length,
    icon: Code,
    color: "text-blue-500",
  },
  {
    label: "Collections",
    value: mockCollections.length,
    icon: FolderOpen,
    color: "text-emerald-500",
  },
  {
    label: "Favorite Items",
    value: mockItems.filter((i) => i.isFavorite).length,
    icon: Star,
    color: "text-yellow-500",
  },
  {
    label: "Favorite Collections",
    value: mockCollections.filter((c) => c.isFavorite).length,
    icon: Heart,
    color: "text-pink-500",
  },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat) => {
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
