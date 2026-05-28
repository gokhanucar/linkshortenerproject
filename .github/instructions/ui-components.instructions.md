---
description: Read this before implementing or modifying any UI components in the project.
---

# UI Components (shadcn/ui)

All UI elements in this project use **shadcn/ui**. This is a strict rule with no exceptions.

## Rules

- **Never** hand-write custom UI primitives (buttons, inputs, dialogs, cards, etc.).
- **Always** use the shadcn/ui component that matches the need.
- Add new components via the CLI: `npx shadcn@latest add <component>`.
- Compose and extend shadcn components using Tailwind utility classes only.
- Do not create wrapper components that duplicate shadcn functionality.

## Available Components

Check `components/ui/` to see which shadcn components are already installed before adding new ones.

## Styling

Use Tailwind CSS utility classes via the `className` prop. Do not write custom CSS files outside of `globals.css`.
