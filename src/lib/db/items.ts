import { prisma } from "@/lib/prisma";

export interface ItemWithType {
  id: string;
  title: string;
  description: string | null;
  isFavorite: boolean;
  isPinned: boolean;
  updatedAt: Date;
  type: {
    name: string;
    icon: string;
    color: string;
  };
  tags: string[];
}

function mapItems(
  items: {
    id: string;
    title: string;
    description: string | null;
    isFavorite: boolean;
    isPinned: boolean;
    updatedAt: Date;
    type: { name: string; icon: string | null; color: string | null };
    tags: { tag: { name: string } }[];
  }[]
): ItemWithType[] {
  return items.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    isFavorite: item.isFavorite,
    isPinned: item.isPinned,
    updatedAt: item.updatedAt,
    type: {
      name: item.type.name,
      icon: item.type.icon ?? "Code",
      color: item.type.color ?? "#3b82f6",
    },
    tags: item.tags.map((t) => t.tag.name),
  }));
}

const itemInclude = {
  type: {
    select: { name: true, icon: true, color: true },
  },
  tags: {
    select: { tag: { select: { name: true } } },
  },
} as const;

export async function getPinnedItems(userId: string): Promise<ItemWithType[]> {
  const items = await prisma.item.findMany({
    where: { userId, isPinned: true },
    orderBy: { updatedAt: "desc" },
    include: itemInclude,
  });

  return mapItems(items);
}

export async function getRecentItems(
  userId: string,
  limit = 10
): Promise<ItemWithType[]> {
  const items = await prisma.item.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
    take: limit,
    include: itemInclude,
  });

  return mapItems(items);
}
