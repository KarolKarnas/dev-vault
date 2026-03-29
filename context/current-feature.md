# Current Feature: Add Loading States

## Status
In Progress

## Goals
- Add loading.tsx skeleton screen for the dashboard page using the ShadCN Skeleton component
- Create skeleton layouts that match the shape of actual dashboard content (stats cards, collections grid, pinned items, recent items list)
- Add a loading state for the sidebar data in the dashboard layout
- Use Suspense boundaries where appropriate to enable streaming/partial rendering
- Follow Next.js patterns: loading.tsx for route-level, Suspense for component-level

## Notes
- Currently NO loading states exist anywhere in the app
- All data fetching is server-side in dashboard/page.tsx and dashboard/layout.tsx using Promise.all()
- Components are presentational (StatsCards, RecentCollections, PinnedItems, RecentItems)
- Use the ShadCN Skeleton component (`npx shadcn@latest add skeleton`) for all skeleton UI
- Dark mode first styling
- Keep skeletons visually consistent with the actual rendered components

## History

<!-- Keep this updated. Earliest to latest -->

- Initial setup: Cleared Next.js boilerplate from page.tsx, globals.css, and public SVGs
- Phase 1: Initialized ShadCN UI (button, input), added dark mode, created dashboard layout with top bar, sidebar/main placeholders
- Phase 2: Added collapsible sidebar with item type filters, collection sections (favorites/all) with collapsible groups, user avatar area, minimized icon-only mode, mobile drawer, and new collection button
- Phase 3: Added dashboard main area with stats cards, recent collections grid, pinned items, and recent items list
- Phase 4: Prisma + Neon PostgreSQL setup with initial schema, NextAuth models, indexes, and cascade deletes
- Phase 5: Added seed script with demo user, 7 system item types, 5 collections, and 18 items with realistic content
- Phase 6: Replaced mock data with real Prisma queries for dashboard collections and stats. Created src/lib/db/collections.ts with getRecentCollections() and getDashboardStats(). Collection card border color derived from most-used item type, type icons shown per collection
- Phase 7: Replaced mock data with real Prisma queries for dashboard items. Created src/lib/db/items.ts with getPinnedItems() and getRecentItems(). Item card border color and icon derived from item type, type tags displayed per item, pinned section hidden when empty
- Phase 8: Replaced mock data in sidebar with real Prisma queries. Added getItemTypesWithCounts() and getSidebarCollections() DB functions. Sidebar item types show real icons/counts linking to /items/[typename], collections show star icons for favorites and colored circles for recents, "View all collections" link added. Dashboard layout fetches sidebar data server-side and passes to DashboardShell
- Phase 9: Added PRO badge to Files and Images item types in sidebar. Created shared ProBadge component using ShadCN Badge with subtle amber styling. Applied to both desktop and mobile sidebars
