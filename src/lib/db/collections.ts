import { prisma } from "@/lib/prisma";

export interface CollectionWithTypes {
  id: string;
  name: string;
  description: string | null;
  isFavorite: boolean;
  itemCount: number;
  updatedAt: Date;
  borderColor: string;
  types: {
    icon: string;
    color: string;
  }[];
}

export async function getRecentCollections(
  userId: string,
  limit = 6
): Promise<CollectionWithTypes[]> {
  const collections = await prisma.collection.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
    take: limit,
    include: {
      _count: { select: { items: true } },
      items: {
        select: {
          type: {
            select: {
              id: true,
              icon: true,
              color: true,
            },
          },
        },
      },
    },
  });

  return collections.map((collection) => {
    // Count items per type to find the most-used one
    const typeCounts = new Map<string, { count: number; icon: string; color: string }>();

    for (const item of collection.items) {
      const { id, icon, color } = item.type;
      const existing = typeCounts.get(id);
      if (existing) {
        existing.count++;
      } else {
        typeCounts.set(id, { count: 1, icon: icon ?? "Code", color: color ?? "#3b82f6" });
      }
    }

    // Get unique types for the icon row
    const types = Array.from(typeCounts.values()).map(({ icon, color }) => ({
      icon,
      color,
    }));

    // Border color from most-used type
    let borderColor = "#3b82f6"; // default blue
    let maxCount = 0;
    for (const [, value] of typeCounts) {
      if (value.count > maxCount) {
        maxCount = value.count;
        borderColor = value.color;
      }
    }

    return {
      id: collection.id,
      name: collection.name,
      description: collection.description,
      isFavorite: collection.isFavorite,
      itemCount: collection._count.items,
      updatedAt: collection.updatedAt,
      borderColor,
      types,
    };
  });
}

export interface SidebarCollection {
  id: string;
  name: string;
  isFavorite: boolean;
  itemCount: number;
  dominantColor: string;
}

export async function getSidebarCollections(
  userId: string,
  limit = 20
): Promise<SidebarCollection[]> {
  const collections = await prisma.collection.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
    take: limit,
    include: {
      _count: { select: { items: true } },
      items: {
        select: {
          type: {
            select: { id: true, color: true },
          },
        },
      },
    },
  });

  return collections.map((collection) => {
    // Find dominant item type color
    const typeCounts = new Map<string, { count: number; color: string }>();

    for (const item of collection.items) {
      const { id, color } = item.type;
      const existing = typeCounts.get(id);
      if (existing) {
        existing.count++;
      } else {
        typeCounts.set(id, { count: 1, color: color ?? "#3b82f6" });
      }
    }

    let dominantColor = "#3b82f6";
    let maxCount = 0;
    for (const [, value] of typeCounts) {
      if (value.count > maxCount) {
        maxCount = value.count;
        dominantColor = value.color;
      }
    }

    return {
      id: collection.id,
      name: collection.name,
      isFavorite: collection.isFavorite,
      itemCount: collection._count.items,
      dominantColor,
    };
  });
}

export interface DashboardStats {
  totalItems: number;
  totalCollections: number;
  favoriteItems: number;
  favoriteCollections: number;
}

export async function getDashboardStats(userId: string): Promise<DashboardStats> {
  const [totalItems, totalCollections, favoriteItems, favoriteCollections] =
    await Promise.all([
      prisma.item.count({ where: { userId } }),
      prisma.collection.count({ where: { userId } }),
      prisma.item.count({ where: { userId, isFavorite: true } }),
      prisma.collection.count({ where: { userId, isFavorite: true } }),
    ]);

  return { totalItems, totalCollections, favoriteItems, favoriteCollections };
}
