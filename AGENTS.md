# Agent Instructions — Link Shortener Project

This file is the entry point for LLM coding agents working in this repository.

## Project Stack & Structure

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 (strict) |
| Auth | Clerk (`@clerk/nextjs`) |
| Database | Neon (serverless PostgreSQL) |
| ORM | Drizzle ORM — schema at `db/schema.ts`, config at `drizzle.config.ts` |
| UI | shadcn/ui + Radix UI + Tailwind CSS v4 |
| Icons | Lucide React |

**Folder layout:**
```
app/                  # Next.js App Router pages & layouts
  layout.tsx          # Root layout (ClerkProvider, global nav)
  page.tsx            # Homepage
  dashboard/          # Authenticated dashboard route
components/
  ui/                 # shadcn/ui components (generated via CLI)
db/
  index.ts            # Drizzle client instance
  schema.ts           # Drizzle table definitions
lib/
  utils.ts            # Shared utility helpers (cn, etc.)
```

## Environment Prerequisites

> [!WARNING]
> **Node.js version: 24.14 is REQUIRED.** Before running ANY `node`, `npm`, or `npx` command, run `nvm use 24` to switch to the correct version. Commands run on the wrong Node version may silently fail or produce unexpected results.

## Quick Rules

- **NEVER use `middleware.ts`** — it is deprecated and not supported in Next.js 16 (the version used in this project). ALWAYS Use `proxy.ts` instead for any middleware/proxy logic.
- This is a **Next.js App Router** project — never use the `pages/` directory.
- All components are **React Server Components by default**. Add `"use client"` only when strictly necessary.
- Use the `@/` path alias for all internal imports (maps to the project root).
- Use **Drizzle ORM** for all database access. Never write raw SQL strings outside of Drizzle query builders.
- Authentication is handled entirely by **Clerk**. Never roll custom auth logic.
- UI components come from **shadcn/ui**. Add new components via the `shadcn` CLI; do not hand-write primitives that shadcn provides.
- Use **Tailwind CSS** utility classes for all styling. Do not write custom CSS files (except `globals.css`).
- Maintain **strict TypeScript**. No `any` types, no `@ts-ignore` unless accompanied by a comment explaining why.
