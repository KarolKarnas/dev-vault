# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Start development server (http://localhost:3000)
- `npm run build` — Production build
- `npm run lint` — Run ESLint (flat config with Next.js core-web-vitals + TypeScript rules)

## Architecture

This is a Next.js 16 app using the App Router (`src/app/`). Key choices:

- **React Compiler** is enabled (`reactCompiler: true` in next.config.ts) — avoid manual `useMemo`/`useCallback`; the compiler handles memoization.
- **Tailwind CSS v4** via `@tailwindcss/postcss` plugin — styles go in `src/app/globals.css`.
- **Path alias**: `@/*` maps to `./src/*`.
- **Fonts**: Geist and Geist Mono loaded via `next/font/google` in the root layout.
- **TypeScript**: Strict mode enabled. No test framework is configured yet.
