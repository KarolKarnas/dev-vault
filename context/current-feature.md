# Current Feature: Optimize DB Queries & Extract Constants

## Status

In Progress

## Goals

- Deduplicate user query: extract shared `getCurrentUserId()` so layout and page don't both call `prisma.user.findFirst()` independently
- Optimize collection queries: use Prisma `_count` aggregate instead of fetching all items just to count them
- Extract PRO_ITEM_TYPES constant: remove hard-coded `"file" || "image"` from both sidebar components
- Add max query limits: ensure all unbounded `findMany` calls have a `take` limit to prevent runaway queries

## Notes

- `getItemTypesWithCounts` already uses `_count` correctly — no changes needed there
- `getRecentCollections` still needs items included for type icons (border color + icon row), but item count should use `_count`
- `getSidebarCollections` still needs items for dominant color calculation, but item count should use `_count`
- PRO_ITEM_TYPES goes in `src/lib/constants.ts` and is imported by both Sidebar and SidebarMobile
- `getCurrentUserId()` goes in `src/lib/db/user.ts` — a cached function returning the user ID (will be replaced by auth session later)

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
- Phase 10: Added loading states with ShadCN Skeleton component. Created dashboard loading.tsx for route-level skeleton, shared skeleton components for stats/collections/items/sidebar. Added Suspense boundaries for sidebar streaming. Refactored DashboardShell to accept sidebar as ReactNode slots, moved collapsed state into Sidebar, added SidebarContext for mobile close
- Phase 11: Added error boundaries. Created dashboard/error.tsx for dashboard errors, app/error.tsx as global route fallback, and app/global-error.tsx for root layout errors with own html/body. All show user-friendly messages with retry buttons
