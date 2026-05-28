---
description: Read this before implementing or modifying any authentication logic in the project.
---

# Authentication — Clerk

All authentication in this project is handled exclusively by **Clerk**. Do not implement any custom auth logic, sessions, JWTs, or alternative auth providers.

## Rules

- Use `@clerk/nextjs` for all auth needs — never roll custom login, session, or token logic.
- Access the current user via Clerk helpers only: `auth()` (server) or `useAuth()` / `useUser()` (client).
- Never store passwords, tokens, or session data manually.

## Protected Routes

- `/dashboard` is a protected route — users **must** be signed in to access it.
- Enforce protection via Clerk's `clerkMiddleware` in `middleware.ts` using `createRouteMatcher`.
- Unauthenticated users attempting to access `/dashboard` must be redirected to sign in.

```ts
// proxy.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
```

## Homepage Redirect

- If a signed-in user visits `/`, redirect them to `/dashboard`.
- Implement this check in the `/` page component using `auth()` from `@clerk/nextjs/server`.

```ts
// app/page.tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const { userId } = await auth();
  if (userId) redirect("/dashboard");
  // render landing page for unauthenticated users
}
```

## Sign In / Sign Up Modals

- Sign in and sign up must always be presented as **modals**, never as full-page routes.
- Use Clerk's `<SignInButton mode="modal">` and `<SignUpButton mode="modal">` components.
- Do **not** create `/sign-in` or `/sign-up` pages or route to them directly.

```tsx
import { SignInButton, SignUpButton } from '@clerk/nextjs';

<SignInButton mode="modal">
  <button>Sign In</button>
</SignInButton>

<SignUpButton mode="modal">
  <button>Sign Up</button>
</SignUpButton>
```
