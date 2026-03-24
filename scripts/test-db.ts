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
