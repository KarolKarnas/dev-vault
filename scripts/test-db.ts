import "dotenv/config";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../generated/prisma/client";

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Testing database connection...\n");

  // Test connection
  const result = await prisma.$queryRaw<
    { now: Date }[]
  >`SELECT NOW() as now`;
  console.log("Connected at:", result[0].now);

  // Count records per table
  const [users, items, itemTypes, collections, tags] = await Promise.all([
    prisma.user.count(),
    prisma.item.count(),
    prisma.itemType.count(),
    prisma.collection.count(),
    prisma.tag.count(),
  ]);

  console.log("\nRecord counts:");
  console.log(`  Users:       ${users}`);
  console.log(`  Items:       ${items}`);
  console.log(`  Item Types:  ${itemTypes}`);
  console.log(`  Collections: ${collections}`);
  console.log(`  Tags:        ${tags}`);

  // Show item types
  const types = await prisma.itemType.findMany({
    select: { name: true, icon: true, color: true, isSystem: true },
  });
  console.log("\nItem Types:");
  for (const t of types) {
    console.log(`  ${t.icon} ${t.name} (${t.color}) ${t.isSystem ? "[system]" : ""}`);
  }

  // Verify demo user
  const demoUser = await prisma.user.findUnique({
    where: { email: "demo@devvault.io" },
    select: { id: true, name: true, email: true, isPro: true, emailVerified: true },
  });
  console.log("\nDemo User:");
  if (demoUser) {
    console.log(`  ${demoUser.name} (${demoUser.email})`);
    console.log(`  isPro: ${demoUser.isPro}`);
    console.log(`  emailVerified: ${demoUser.emailVerified}`);
  } else {
    console.log("  NOT FOUND - run db:seed first");
  }

  // Show collections with item counts
  const collectionsData = await prisma.collection.findMany({
    select: {
      name: true,
      description: true,
      isFavorite: true,
      _count: { select: { items: true } },
    },
    orderBy: { name: "asc" },
  });
  console.log("\nCollections:");
  for (const c of collectionsData) {
    const fav = c.isFavorite ? " ★" : "";
    console.log(`  ${c.name}${fav} (${c._count.items} items) - ${c.description}`);
  }

  // Show items grouped by type
  const itemsByType = await prisma.item.groupBy({
    by: ["typeId"],
    _count: true,
  });
  const allTypes = await prisma.itemType.findMany();
  const typeIdMap = Object.fromEntries(allTypes.map((t) => [t.id, t.name]));
  console.log("\nItems by Type:");
  for (const group of itemsByType) {
    console.log(`  ${typeIdMap[group.typeId]}: ${group._count}`);
  }

  // Show pinned and favorite items
  const [pinned, favorites] = await Promise.all([
    prisma.item.findMany({
      where: { isPinned: true },
      select: { title: true },
    }),
    prisma.item.findMany({
      where: { isFavorite: true },
      select: { title: true },
    }),
  ]);
  console.log("\nPinned Items:");
  for (const item of pinned) {
    console.log(`  📌 ${item.title}`);
  }
  console.log("\nFavorite Items:");
  for (const item of favorites) {
    console.log(`  ★ ${item.title}`);
  }

  console.log("\nDatabase test passed!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("Database test failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
