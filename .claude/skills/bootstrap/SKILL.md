---
name: bootstrap
description: Initialize this template for a new project. Configures project name, branding, and metadata across the codebase.
user_invocable: true
---

# Bootstrap — Template Initialization

Configure this template for a new project. Walks through Day 1 decisions and applies them across the codebase.

## Process

### 1. Gather project identity

Ask the user for:

- **Project name** — used in UI, metadata, headers (e.g., "Acme", "Skyward", "NovaPay")
- **Description** — one-line description for metadata and README (e.g., "Aviation charter management platform")
- **Keep demo pages?** — the template includes demo pages at `/inbox`, `/pipeline`, `/trips`. Ask whether to keep them as reference, or remove them.

Do NOT ask about theme colors, auth, hosting, or database. Those are handled by other skills when the user is ready.

### 2. Apply project name

Replace `"Project"` (case-sensitive, whole-word) with the chosen name in these files:

```
apps/web/app/layout.tsx                          — metadata title, template, siteName
apps/web/components/layouts/marketing-header.tsx  — logo text
apps/web/app/(marketing)/layout.tsx               — footer logo and copyright
apps/web/app/(app)/layout.tsx                     — sidebar logo
apps/web/components/layouts/app-sidebar.tsx        — logo text (if separate)
```

Replace `{project-name}` in:
```
CLAUDE.md                                         — document title
```

Replace the metadata description `"Next.js monorepo template with Turborepo and DaisyUI"` with the user's description in:
```
apps/web/app/layout.tsx
```

### 3. Update README

Replace the README title and description to reflect the new project. Keep the setup instructions, commands, and structure documentation intact.

### 4. Update root package.json

Change the `"name"` field in the root `package.json` from `"my-skills"` to a kebab-case version of the project name.

### 5. Handle demo pages

If the user wants to **remove** demo pages:
- Delete `apps/web/app/(app)/inbox/`
- Delete `apps/web/app/(app)/pipeline/`
- Delete `apps/web/app/(app)/trips/`
- Remove the demo links from `marketing-header.tsx` (the `DEMO_LINKS` array and the Demos dropdown)
- Update the sidebar navigation in `apps/web/app/(app)/layout.tsx` to remove demo-specific nav items (AI Inbox, Pipeline, Trips, Scheduling, Fleet, Browse, Saved)
- Keep `apps/web/app/(app)/dashboard/page.tsx` as the default app page

If the user wants to **keep** demo pages, leave them as-is for reference.

### 6. Update TEMPLATE.md

Check off the completed items in `TEMPLATE.md`:
- [x] Project name
- [x] Description
- [x] Demo pages (kept / removed)

### 7. Verify

Run `pnpm turbo run check-types` and `pnpm turbo run lint` to confirm no breakage.

### 8. Summary

Print a summary of what was configured and what's still pending. Point the user to `TEMPLATE.md` for the remaining checklist, and mention which skills to use:
- `/ui` for theme colors
- `/auth` for authentication
- `/data` for database setup
- `/devops` for CI/CD and deployment

## Important

- Do NOT modify theme colors, component code, or package structure during bootstrap
- Do NOT set up auth, database, or hosting — those are separate concerns
- Do NOT rename the `@repo/*` package scope — it's a convention, not a placeholder
- Do NOT delete `TEMPLATE.md` — the user does that when fully configured
