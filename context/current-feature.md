# Current Feature

<!-- Feature Name -->

Prisma + Neon PostgreSQL Setup

## Status

<!-- Not Started|In Progress|Completed -->

In Progress

## Goals

<!-- Goals & requirements -->

- Set up Prisma ORM (v7) with Neon PostgreSQL (serverless)
- Create initial schema based on data models in project-overview.md
- Include NextAuth models (Account, Session, VerificationToken)
- Add appropriate indexes and cascade deletes
- Use migrations (never push directly unless specified)
- Separate dev and production database branches

## Notes

<!-- Any extra notes -->

- Use Prisma 7 (has breaking changes from v6 - follow upgrade guide)
- DATABASE_URL points to Neon development branch
- Always use `prisma migrate dev` for schema changes
- Reference specs: @context/features/database-spec.md
- Data models: @context/project-overview.md

## History

<!-- Keep this updated. Earliest to latest -->

- Initial setup: Cleared Next.js boilerplate from page.tsx, globals.css, and public SVGs
- Phase 1: Initialized ShadCN UI (button, input), added dark mode, created dashboard layout with top bar, sidebar/main placeholders
- Phase 2: Added collapsible sidebar with item type filters, collection sections (favorites/all) with collapsible groups, user avatar area, minimized icon-only mode, mobile drawer, and new collection button
- Phase 3: Added dashboard main area with stats cards, recent collections grid, pinned items, and recent items list
