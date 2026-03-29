import { prisma } from "@/lib/prisma";

export interface SidebarItemType {
  id: string;
  name: string;
  icon: string;
  color: string;
  count: number;
}

export async function getItemTypesWithCounts(
  userId: string
): Promise<SidebarItemType[]> {
  const types = await prisma.itemType.findMany({
    where: {
      OR: [{ isSystem: true }, { userId }],
    },
    take: 50,
    include: {
      _count: {
        select: {
          items: { where: { userId } },
        },
      },
    },
  });

  const order = ["snippet", "prompt", "command", "note", "file", "image", "link"];

  return types
    .map((t) => ({
      id: t.id,
      name: t.name,
      icon: t.icon ?? "Code",
      color: t.color ?? "#3b82f6",
      count: t._count.items,
    }))
    .sort((a, b) => {
      const ai = order.indexOf(a.name);
      const bi = order.indexOf(b.name);
      return (ai === -1 ? order.length : ai) - (bi === -1 ? order.length : bi);
    });
}

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

export async function getPinnedItems(
  userId: string,
  limit = 20
): Promise<ItemWithType[]> {
  const items = await prisma.item.findMany({
    where: { userId, isPinned: true },
    orderBy: { updatedAt: "desc" },
    take: limit,
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
