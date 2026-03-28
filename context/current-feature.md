# Current Feature

Dashboard Items - Real Data

## Status

Completed

## Goals

- Replace dummy item data in dashboard main area (right side) with real data from Neon database using Prisma
- Create src/lib/db/items.ts with data fetching functions
- Fetch items directly in server component
- Item card icon/border derived from item type
- Display item type tags and other existing UI elements
- Update collection stats display
- If there are no pinned items, nothing should display there

## Notes

- Reference @context/screenshots/dashboard-ui-main.png for design
- Data currently comes from @src/lib/mock-data.ts
- Spec: @context/features/dashboard-items-spec.md

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
