# Template Configuration

This project is a template. Use `/bootstrap` to configure it for a new project, then work through the remaining sections as decisions are made.

## Day 1 — Project Identity

Run `/bootstrap` to configure these. All are required before meaningful development starts.

- [ ] **Project name** — replaces "Project" across layouts, metadata, headers, footers
- [ ] **Description** — replaces template description in metadata and README
- [ ] **Theme colors** — configure primary, accent, and base palette in `shared-styles.css`
- [ ] **Marketing content** — replace placeholder hero text and feature cards
- [ ] **Demo pages** — decide which to keep, modify, or remove (`/inbox`, `/pipeline`, `/trips`)

### Files touched by bootstrap

| Placeholder | Current value | Files |
|-------------|---------------|-------|
| Brand name | `"Project"` | `apps/web/app/layout.tsx`, `apps/web/components/layouts/marketing-header.tsx`, `apps/web/app/(marketing)/layout.tsx`, `apps/web/app/(app)/layout.tsx`, `apps/web/components/layouts/app-sidebar.tsx`, `CLAUDE.md` |
| Metadata description | `"Next.js monorepo template..."` | `apps/web/app/layout.tsx`, `README.md` |
| OpenGraph siteName | `"Project"` | `apps/web/app/layout.tsx` |
| Copyright text | `"Project"` | `apps/web/app/(marketing)/layout.tsx` |
| CLAUDE.md title | `{project-name}` | `CLAUDE.md` |

## When Ready — Infrastructure

Configure these as decisions are made. No specific order required.

### Hosting & Deployment

- [ ] **Hosting platform** — Vercel, AWS, Cloudflare, etc.
- [ ] **Production URL** — set `NEXT_PUBLIC_APP_URL` in `.env` and `metadataBase` in layout
- [ ] **Domain & DNS** — configure with hosting provider
- [ ] **Environment variables** — populate `.env` from `.env.example` for each environment

Use the `devops` skill (`/devops`) for guidance on deployment configuration.

### Authentication

- [ ] **Auth provider** — NextAuth.js provider(s): GitHub, Google, credentials, etc.
- [ ] **Session strategy** — JWT vs database sessions
- [ ] **Protected routes** — which routes require authentication

Use the `auth` skill (`/auth`) for guidance on auth setup.

### Database

- [ ] **Database provider** — Postgres, MySQL, SQLite, PlanetScale, Supabase, etc.
- [ ] **ORM** — Prisma, Drizzle, or direct queries
- [ ] **Connection string** — set `DATABASE_URL` in `.env`

Use the `data` skill (`/data`) for guidance on data layer setup.

### CI/CD

- [ ] **CI platform** — GitHub Actions (included), GitLab CI, CircleCI, etc.
- [ ] **Pipeline stages** — lint, type-check, test, build, deploy
- [ ] **Branch protection** — required checks, review requirements
- [ ] **Preview deployments** — per-PR preview environments

Use the `devops` skill (`/devops`) for guidance on CI/CD configuration.

### Monitoring & Analytics

- [ ] **Error tracking** — Sentry, Datadog, etc.
- [ ] **Analytics** — Vercel Analytics, PostHog, Plausible, etc.
- [ ] **Performance monitoring** — Core Web Vitals, Lighthouse CI

## Pre-Launch

Final checks before going live.

- [ ] **Security headers** — CSP, HSTS, X-Frame-Options configured
- [ ] **SEO** — sitemap, robots.txt, OpenGraph images, structured data
- [ ] **Favicon & brand assets** — replace default icon.svg
- [ ] **Error pages** — customize `error.tsx` and `not-found.tsx`
- [ ] **Legal pages** — privacy policy, terms of service (real content, not placeholder links)
- [ ] **Lighthouse audit** — Performance, Accessibility, SEO all green
- [ ] **Production environment variables** — all set, no defaults leaking

## Reference

### What stays as-is

These are conventions, not placeholders — no need to change them:

- **Package scope** `@repo/*` — standard monorepo convention for internal packages
- **Theme names** `obsidian-light` / `obsidian-dark` — can be renamed via the `ui` skill but not required
- **Tailwind/DaisyUI setup** — configured and ready to use
- **Skills system** — all skills work regardless of project name
- **Component library** — all `packages/ui` components are project-agnostic

### Template distribution

This repo is configured as a **GitHub Template Repository**. To create a new project:

1. Click **"Use this template"** on GitHub (or clone manually)
2. Run `/bootstrap` in Claude Code to configure project identity
3. Work through the checklist above as decisions are made
4. Delete this file (`TEMPLATE.md`) when all sections are configured
