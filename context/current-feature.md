# Current Feature

Stats & Sidebar - Real Data

## Status

Completed

## Goals

- Display stats in main area from database data instead of mock data, keeping current design/layout
- Display item types in sidebar with their icons, linking to /items/[typename]
- Add "View all collections" link under the collections list that goes to /collections
- Keep star icons for favorite collections but for recents, show colored circle based on most-used item type
- Create @src/lib/db/items.ts database functions (use collections file for reference)

## Notes

- Spec: @context/features/stats-sidebar-spec.md
- Reference: @src/lib/db/collections.ts

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
