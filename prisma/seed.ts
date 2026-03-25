import "dotenv/config";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../generated/prisma/client";
import bcrypt from "bcryptjs";

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // Clean existing data (order matters for foreign keys)
  await prisma.itemTag.deleteMany();
  await prisma.item.deleteMany();
  await prisma.collection.deleteMany();
  await prisma.itemType.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  // ─── User ──────────────────────────────────────────────────────
  const hashedPassword = await bcrypt.hash("12345678", 12);

  const user = await prisma.user.create({
    data: {
      email: "demo@devvault.io",
      name: "Demo User",
      password: hashedPassword,
      isPro: false,
      emailVerified: new Date(),
    },
  });

  console.log("Created user:", user.email);

  // ─── System Item Types ─────────────────────────────────────────
  const typeData = [
    { name: "snippet", icon: "Code", color: "#3b82f6" },
    { name: "prompt", icon: "Sparkles", color: "#8b5cf6" },
    { name: "command", icon: "Terminal", color: "#f97316" },
    { name: "note", icon: "StickyNote", color: "#fde047" },
    { name: "file", icon: "File", color: "#6b7280" },
    { name: "image", icon: "Image", color: "#ec4899" },
    { name: "link", icon: "Link", color: "#10b981" },
  ] as const;

  const types: Record<string, string> = {};

  for (const t of typeData) {
    const created = await prisma.itemType.create({
      data: {
        name: t.name,
        icon: t.icon,
        color: t.color,
        isSystem: true,
      },
    });
    types[t.name] = created.id;
  }

  console.log("Created", typeData.length, "system item types");

  // ─── Collections ───────────────────────────────────────────────
  const reactPatterns = await prisma.collection.create({
    data: {
      name: "React Patterns",
      description: "Reusable React patterns and hooks",
      userId: user.id,
      isFavorite: true,
    },
  });

  const aiWorkflows = await prisma.collection.create({
    data: {
      name: "AI Workflows",
      description: "AI prompts and workflow automations",
      userId: user.id,
    },
  });

  const devops = await prisma.collection.create({
    data: {
      name: "DevOps",
      description: "Infrastructure and deployment resources",
      userId: user.id,
    },
  });

  const terminalCommands = await prisma.collection.create({
    data: {
      name: "Terminal Commands",
      description: "Useful shell commands for everyday development",
      userId: user.id,
      isFavorite: true,
    },
  });

  const designResources = await prisma.collection.create({
    data: {
      name: "Design Resources",
      description: "UI/UX resources and references",
      userId: user.id,
    },
  });

  console.log("Created 5 collections");

  // ─── Items: React Patterns (3 snippets) ────────────────────────
  await prisma.item.createMany({
    data: [
      {
        title: "useDebounce Hook",
        contentType: "text",
        language: "typescript",
        content: `import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// Usage:
// const debouncedSearch = useDebounce(searchTerm, 300);`,
        description:
          "Debounce any rapidly changing value with a configurable delay",
        isFavorite: true,
        isPinned: true,
        userId: user.id,
        typeId: types.snippet,
        collectionId: reactPatterns.id,
      },
      {
        title: "Context Provider Pattern",
        contentType: "text",
        language: "typescript",
        content: `import { createContext, useContext, useState, ReactNode } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}`,
        description:
          "Type-safe React Context with a custom hook for consuming the value",
        userId: user.id,
        typeId: types.snippet,
        collectionId: reactPatterns.id,
      },
      {
        title: "useLocalStorage Hook",
        contentType: "text",
        language: "typescript",
        content: `import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}

// Usage:
// const [name, setName] = useLocalStorage('user-name', '');`,
        description: "Persist state to localStorage with SSR-safe initialization",
        isPinned: true,
        userId: user.id,
        typeId: types.snippet,
        collectionId: reactPatterns.id,
      },
    ],
  });

  // ─── Items: AI Workflows (3 prompts) ───────────────────────────
  await prisma.item.createMany({
    data: [
      {
        title: "Code Review Prompt",
        contentType: "text",
        content: `Review the following code for:

1. **Security vulnerabilities** - SQL injection, XSS, auth bypasses
2. **Performance issues** - N+1 queries, unnecessary re-renders, memory leaks
3. **Error handling** - missing try/catch, unhandled promises, edge cases
4. **Code quality** - naming, duplication, SOLID violations
5. **Testing gaps** - untested paths, missing edge case coverage

For each issue found, provide:
- Severity (critical / warning / suggestion)
- Line number or code reference
- Explanation of the problem
- Suggested fix with code example

Be concise. Focus on actionable feedback, not style nitpicks.`,
        description:
          "Comprehensive code review prompt covering security, performance, and quality",
        isFavorite: true,
        userId: user.id,
        typeId: types.prompt,
        collectionId: aiWorkflows.id,
      },
      {
        title: "Documentation Generator",
        contentType: "text",
        content: `Generate documentation for the following code:

1. **Overview** - One paragraph explaining what this module/function does and why
2. **Parameters** - Table with name, type, required/optional, and description
3. **Return value** - Type and description
4. **Examples** - 2-3 usage examples from simple to advanced
5. **Edge cases** - Known limitations or important behavior notes

Use JSDoc format for inline docs. Use Markdown for standalone documentation.
Keep descriptions concise but precise. Avoid restating the code - explain intent and behavior.`,
        description:
          "Generate comprehensive documentation from code with examples and edge cases",
        userId: user.id,
        typeId: types.prompt,
        collectionId: aiWorkflows.id,
      },
      {
        title: "Refactoring Assistant",
        contentType: "text",
        content: `Analyze the following code and suggest refactoring improvements:

Focus areas:
1. **Extract reusable functions** - identify repeated logic
2. **Simplify conditionals** - replace nested if/else with early returns or maps
3. **Improve naming** - suggest clearer variable/function names
4. **Reduce complexity** - break large functions into smaller, focused ones
5. **Apply patterns** - suggest relevant design patterns where beneficial

Rules:
- Keep changes minimal and incremental
- Preserve existing behavior (no feature changes)
- Explain WHY each change improves the code
- Show before/after code snippets`,
        description:
          "Get targeted refactoring suggestions with before/after examples",
        userId: user.id,
        typeId: types.prompt,
        collectionId: aiWorkflows.id,
      },
    ],
  });

  // ─── Items: DevOps (1 snippet + 1 command + 2 links) ──────────
  await prisma.item.createMany({
    data: [
      {
        title: "Multi-Stage Dockerfile",
        contentType: "text",
        language: "dockerfile",
        content: `# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000

CMD ["node", "server.js"]`,
        description:
          "Optimized multi-stage Dockerfile for Next.js production builds",
        userId: user.id,
        typeId: types.snippet,
        collectionId: devops.id,
      },
      {
        title: "Deploy with Zero Downtime",
        contentType: "text",
        content: `# Build and deploy with health check
docker build -t myapp:latest . && \\
docker run -d --name myapp-new -p 3001:3000 myapp:latest && \\
sleep 5 && \\
curl -f http://localhost:3001/api/health && \\
docker stop myapp-old && \\
docker rename myapp-new myapp-old`,
        description:
          "Zero-downtime deployment script using Docker with health check validation",
        userId: user.id,
        typeId: types.command,
        collectionId: devops.id,
      },
      {
        title: "GitHub Actions Documentation",
        contentType: "text",
        url: "https://docs.github.com/en/actions",
        description: "Official GitHub Actions docs for CI/CD workflows",
        userId: user.id,
        typeId: types.link,
        collectionId: devops.id,
      },
      {
        title: "Docker Compose Reference",
        contentType: "text",
        url: "https://docs.docker.com/compose/compose-file/",
        description:
          "Docker Compose file reference for multi-container setups",
        userId: user.id,
        typeId: types.link,
        collectionId: devops.id,
      },
    ],
  });

  // ─── Items: Terminal Commands (4 commands) ─────────────────────
  await prisma.item.createMany({
    data: [
      {
        title: "Git Interactive Rebase",
        contentType: "text",
        content: `# Squash last N commits into one
git rebase -i HEAD~N

# Rebase onto main with autostash
git rebase main --autostash

# Abort a rebase in progress
git rebase --abort

# Continue after resolving conflicts
git rebase --continue`,
        description: "Common git rebase commands for cleaning up commit history",
        isFavorite: true,
        userId: user.id,
        typeId: types.command,
        collectionId: terminalCommands.id,
      },
      {
        title: "Docker Cleanup Commands",
        contentType: "text",
        content: `# Remove all stopped containers
docker container prune -f

# Remove unused images
docker image prune -a -f

# Remove unused volumes
docker volume prune -f

# Nuclear option: remove everything unused
docker system prune -a --volumes -f

# Check disk usage
docker system df`,
        description: "Free up disk space by cleaning unused Docker resources",
        userId: user.id,
        typeId: types.command,
        collectionId: terminalCommands.id,
      },
      {
        title: "Process Management",
        contentType: "text",
        content: `# Find process using a port
lsof -i :3000

# Kill process on a specific port
kill -9 $(lsof -t -i :3000)

# List all node processes
ps aux | grep node

# Watch resource usage in real time
htop --filter node`,
        description: "Find, inspect, and kill processes by port or name",
        isPinned: true,
        userId: user.id,
        typeId: types.command,
        collectionId: terminalCommands.id,
      },
      {
        title: "Package Manager Shortcuts",
        contentType: "text",
        content: `# Check for outdated packages
npm outdated

# Update all packages to latest (respecting semver)
npm update

# Install exact version
npm install package@1.2.3 --save-exact

# List all globally installed packages
npm list -g --depth=0

# Clean npm cache
npm cache clean --force

# Check why a package is installed
npm explain package-name`,
        description:
          "Handy npm commands for dependency management and troubleshooting",
        userId: user.id,
        typeId: types.command,
        collectionId: terminalCommands.id,
      },
    ],
  });

  // ─── Items: Design Resources (4 links) ─────────────────────────
  await prisma.item.createMany({
    data: [
      {
        title: "Tailwind CSS Documentation",
        contentType: "text",
        url: "https://tailwindcss.com/docs",
        description:
          "Official Tailwind CSS docs with utility class reference and examples",
        isFavorite: true,
        userId: user.id,
        typeId: types.link,
        collectionId: designResources.id,
      },
      {
        title: "shadcn/ui Components",
        contentType: "text",
        url: "https://ui.shadcn.com",
        description:
          "Beautifully designed components built with Radix UI and Tailwind CSS",
        userId: user.id,
        typeId: types.link,
        collectionId: designResources.id,
      },
      {
        title: "Vercel Design System (Geist)",
        contentType: "text",
        url: "https://vercel.com/geist/introduction",
        description:
          "Vercel's design system with components, colors, and typography guidelines",
        userId: user.id,
        typeId: types.link,
        collectionId: designResources.id,
      },
      {
        title: "Lucide Icons",
        contentType: "text",
        url: "https://lucide.dev/icons",
        description:
          "Beautiful and consistent open-source icon library used by shadcn/ui",
        userId: user.id,
        typeId: types.link,
        collectionId: designResources.id,
      },
    ],
  });

  console.log("Created all items across 5 collections");
  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
