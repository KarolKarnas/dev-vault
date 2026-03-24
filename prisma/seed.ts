import "dotenv/config";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../generated/prisma/client";

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

const systemItemTypes = [
  { name: "Snippet", icon: "Code", color: "#3b82f6", isSystem: true },
  { name: "Prompt", icon: "MessageSquare", color: "#8b5cf6", isSystem: true },
  { name: "Note", icon: "StickyNote", color: "#f59e0b", isSystem: true },
  { name: "Command", icon: "Terminal", color: "#10b981", isSystem: true },
  { name: "File", icon: "File", color: "#6366f1", isSystem: true },
  { name: "Image", icon: "Image", color: "#ec4899", isSystem: true },
  { name: "URL", icon: "Link", color: "#06b6d4", isSystem: true },
];

async function main() {
  console.log("Seeding database...");

  // Create system item types
  const types: Record<string, string> = {};
  for (const type of systemItemTypes) {
    const created = await prisma.itemType.upsert({
      where: { id: type.name.toLowerCase() },
      update: {},
      create: { id: type.name.toLowerCase(), ...type },
    });
    types[created.name] = created.id;
  }
  console.log(`Created ${Object.keys(types).length} system item types`);

  // Create demo user
  const user = await prisma.user.upsert({
    where: { email: "demo@devvault.dev" },
    update: {},
    create: {
      email: "demo@devvault.dev",
      name: "Demo User",
      isPro: true,
    },
  });
  console.log(`Created demo user: ${user.email}`);

  // Create tags
  const tagNames = [
    "react",
    "typescript",
    "nextjs",
    "css",
    "python",
    "docker",
    "git",
    "api",
  ];
  const tags: Record<string, string> = {};
  for (const name of tagNames) {
    const tag = await prisma.tag.upsert({
      where: { id: `tag-${name}` },
      update: {},
      create: { id: `tag-${name}`, name, userId: user.id },
    });
    tags[name] = tag.id;
  }
  console.log(`Created ${Object.keys(tags).length} tags`);

  // Create collections
  const reactCollection = await prisma.collection.upsert({
    where: { id: "col-react-patterns" },
    update: {},
    create: {
      id: "col-react-patterns",
      name: "React Patterns",
      description: "Common React patterns and best practices",
      isFavorite: true,
      userId: user.id,
    },
  });

  const pythonCollection = await prisma.collection.upsert({
    where: { id: "col-python-snippets" },
    update: {},
    create: {
      id: "col-python-snippets",
      name: "Python Snippets",
      description: "Useful Python code snippets",
      userId: user.id,
    },
  });

  const devopsCollection = await prisma.collection.upsert({
    where: { id: "col-devops" },
    update: {},
    create: {
      id: "col-devops",
      name: "DevOps & CLI",
      description: "Docker, Git, and CLI commands",
      isFavorite: true,
      userId: user.id,
    },
  });
  console.log("Created 3 collections");

  // Create items
  const items = [
    {
      id: "item-use-debounce",
      title: "useDebounce Hook",
      contentType: "text",
      content: `import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}`,
      language: "typescript",
      typeId: types["Snippet"],
      collectionId: reactCollection.id,
      isFavorite: true,
      isPinned: true,
      tagIds: [tags["react"], tags["typescript"]],
    },
    {
      id: "item-fetch-wrapper",
      title: "Type-Safe Fetch Wrapper",
      contentType: "text",
      content: `async function fetchJSON<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...init?.headers },
  });
  if (!res.ok) throw new Error(\`HTTP \${res.status}: \${res.statusText}\`);
  return res.json() as Promise<T>;
}`,
      language: "typescript",
      typeId: types["Snippet"],
      collectionId: reactCollection.id,
      tagIds: [tags["typescript"], tags["api"]],
    },
    {
      id: "item-code-review-prompt",
      title: "Code Review Prompt",
      contentType: "text",
      content: `Review this code for:
1. Security vulnerabilities (injection, XSS, auth issues)
2. Performance problems (N+1 queries, unnecessary re-renders)
3. Error handling gaps
4. TypeScript type safety issues

Be concise. Flag severity as: 🔴 Critical, 🟡 Warning, 🔵 Suggestion.`,
      typeId: types["Prompt"],
      isPinned: true,
      tagIds: [tags["typescript"]],
    },
    {
      id: "item-docker-compose",
      title: "Docker Compose - Postgres + Redis",
      contentType: "text",
      content: `version: '3.8'
services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: devuser
      POSTGRES_PASSWORD: devpass
      POSTGRES_DB: devvault
    ports:
      - '5432:5432'
    volumes:
      - pgdata:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - '6379:6379'

volumes:
  pgdata:`,
      language: "yaml",
      typeId: types["Command"],
      collectionId: devopsCollection.id,
      isFavorite: true,
      tagIds: [tags["docker"]],
    },
    {
      id: "item-git-aliases",
      title: "Useful Git Aliases",
      contentType: "text",
      content: `git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.st status
git config --global alias.lg "log --oneline --graph --decorate --all"
git config --global alias.undo "reset --soft HEAD~1"
git config --global alias.amend "commit --amend --no-edit"`,
      language: "bash",
      typeId: types["Command"],
      collectionId: devopsCollection.id,
      tagIds: [tags["git"]],
    },
    {
      id: "item-python-file-reader",
      title: "Read & Parse JSON File",
      contentType: "text",
      content: `import json
from pathlib import Path

def read_json(filepath: str) -> dict:
    """Read and parse a JSON file."""
    path = Path(filepath)
    if not path.exists():
        raise FileNotFoundError(f"File not found: {filepath}")
    return json.loads(path.read_text(encoding="utf-8"))`,
      language: "python",
      typeId: types["Snippet"],
      collectionId: pythonCollection.id,
      tagIds: [tags["python"]],
    },
    {
      id: "item-nextjs-metadata",
      title: "Next.js Dynamic Metadata",
      contentType: "text",
      content: `import type { Metadata } from 'next';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, images: [post.coverImage] },
  };
}`,
      language: "typescript",
      typeId: types["Snippet"],
      collectionId: reactCollection.id,
      tagIds: [tags["nextjs"], tags["typescript"]],
    },
    {
      id: "item-css-grid-note",
      title: "CSS Grid Cheatsheet",
      contentType: "text",
      content: `## Quick Reference

- \`grid-template-columns: repeat(auto-fill, minmax(250px, 1fr))\` — responsive grid
- \`place-items: center\` — center both axes
- \`grid-column: span 2\` — span multiple columns
- \`gap: 1rem\` — uniform gap
- \`grid-auto-flow: dense\` — fill gaps in grid`,
      typeId: types["Note"],
      tagIds: [tags["css"]],
    },
    {
      id: "item-prisma-docs",
      title: "Prisma v7 Docs",
      contentType: "text",
      url: "https://www.prisma.io/docs",
      description: "Official Prisma ORM documentation - upgrade guide and API reference",
      typeId: types["URL"],
      tagIds: [tags["typescript"]],
    },
  ];

  for (const { tagIds, ...itemData } of items) {
    await prisma.item.upsert({
      where: { id: itemData.id },
      update: {},
      create: {
        ...itemData,
        userId: user.id,
        tags: {
          create: tagIds.map((tagId) => ({ tagId })),
        },
      },
    });
  }
  console.log(`Created ${items.length} items`);

  console.log("Seeding complete!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("Seed error:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
