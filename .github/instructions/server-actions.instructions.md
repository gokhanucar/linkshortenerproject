---
description: Follow these rules whenever creating or modifying server actions in this project.
---

# Server Actions

## File Naming & Location

- Server action files **must** be named `actions.ts`.
- Each `actions.ts` file must be **colocated** in the same directory as the client component that calls it.

## Calling Server Actions

- Server actions **must only be called from client components** (`"use client"`).

## TypeScript Types

- All data passed to server actions must have **explicit TypeScript types**.
- **Never** use the `FormData` TypeScript type for server action arguments.

## Validation

- **All incoming data must be validated with [Zod](https://zod.dev/)** before any logic is executed.

## Authentication

- Every server action **must verify a logged-in user** (via Clerk) as its first step before performing any database operations.

## Database Access

- **Never** call Drizzle queries directly inside server actions.
- All database operations must go through **helper functions located in the `/data` directory**.

## Error Handling

- Server actions **must never throw errors**.
- Instead, always return a typed result object with either a `success` or `error` property, for example:
  ```ts
  { success: true, data: ... }
  { error: "Something went wrong." }
  ```
