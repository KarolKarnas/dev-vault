# DevVault

A developer knowledge hub for snippets, commands, prompts, notes, files, images, links and custom types.

## Context Files

Read the following to get the full context of the project:

- @context/project-overview.md
- @context/coding-standards.md
- @context/ai-interaction.md
- @context/current-feature.md

## Commands

- **Dev server**: `npm run dev` (runs on http://localhost:3000)
- **Build**: `npm run build`
- **Production server**: `npm run start`
- **Lint**: `npm run lint`

## Commit Messages

Follow the **Conventional Commits** standard. Rules:

- **Do NOT add Claude or AI attribution** to any commit messages
- Use a type prefix: `feat:`, `fix:`, `chore:`, `refactor:`, `docs:`, `style:`, `test:`, `perf:`, `ci:`, `build:`
- Keep the subject line short (under 72 characters)
- Use imperative mood ("add" not "added")
- Use bullet points with `-` in the body for multiple changes
- No period at the end of the subject line

Example:

```
feat: add sidebar navigation and collection filters

- Add collapsible sidebar component with item type filters
- Add collection list with favorite/all sections
- Add active state highlighting for selected filters
```
