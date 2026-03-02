# {project-name}

Next.js monorepo with Turborepo, DaisyUI v5, and TailwindCSS v4.

## Skills

| Skill            | Concern | Description                                                                                                 |
| ---------------- | ------- | ----------------------------------------------------------------------------------------------------------- |
| **ui**           | Build   | Component styling, theming (DaisyUI v5 + TailwindCSS v4), accessibility patterns                            |
| **data**         | Build   | Server state (React Query), API routes, forms (react-hook-form + Zod), Server Actions, caching/revalidation |
| **nextjs**       | Build   | Next.js App Router architecture, Server Components, routing, performance, SEO                               |
| **auth**         | Build   | Authentication, authorization, and security hardening (NextAuth.js, CSP, headers, input validation)         |
| **performance**  | Build   | Core Web Vitals, bundle analysis, rendering optimization, Lighthouse CI                                     |
| **refactoring**  | Build   | Safe code restructuring — extract, split, consolidate, migrate, dead code removal                           |
| **testing**      | Verify  | Unit/integration (Jest + RTL + MSW), E2E (Playwright), browser verification, pre-release checklist          |
| **debugging**    | Process | Systematic 4-phase debugging, root-cause tracing, verification-before-completion                            |
| **devops**       | Ship    | pnpm/Turborepo, Git workflow, GitHub Actions CI/CD, Claude Code hooks                                       |
| **bootstrap**    | Setup   | Initialize this template for a new project — configure name, branding, metadata                             |
| **skill-creator**| Meta    | Create, validate, and improve agent skills — quality audits, token optimization, skill restructuring        |

## Agents

| Agent               | Purpose                                                                                      | When to Use                                                                     |
| ------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `planner`           | Decomposes features into phased implementation plans with file paths and dependency ordering  | Before starting complex features — produces an actionable step-by-step plan     |
| `architect`         | Evaluates design decisions with trade-off analysis and Architecture Decision Records (ADRs)  | When making significant architectural choices or designing new subsystems       |
| `reviewer`          | Reviews diffs against conventions, runs verification gates, lightweight security/perf checks  | Before committing/merging — spawn for a structured code review                  |
| `security-reviewer` | OWASP-based security audit — secrets scanning, auth boundaries, CSP, injection vulnerabilities | Before merging security-sensitive changes, or for periodic security assessments |
| `e2e-runner`        | Creates, executes, and stabilizes Playwright E2E tests with flakiness detection               | When adding E2E coverage for critical user journeys                             |

## Agent-First Workflow

For complex features, use agents in sequence:

1. **Plan** — Spawn `planner` to decompose the feature into phased tasks
2. **Design** — Spawn `architect` if the feature requires new architectural decisions
3. **Build** — Implement using the relevant skills (data, ui, nextjs, auth, etc.)
4. **Review** — Spawn `reviewer` to check conventions and run verification gates
5. **Secure** — Spawn `security-reviewer` for auth/API/input-handling changes
6. **Test** — Spawn `e2e-runner` to create and stabilize E2E tests for critical flows

For simple changes (bug fixes, small UI tweaks), skip directly to Build → Review.

## Code Quality Conventions

- **TypeScript**: Always required for new features and files
- **type over interface**: Prefer `type` unless inheritance is specifically needed
- **Import ordering**: `import type` statements first, then regular imports
- **HTTP status codes**: Always use `http-status-codes` package constants (`StatusCodes.OK`, `StatusCodes.NOT_FOUND`) — never raw numeric codes
- **DaisyUI semantic colors**: Always use DaisyUI semantic color classes (`bg-base-100`, `text-primary`, `btn-primary`, etc.) instead of hardcoded hex values or raw Tailwind color classes (`bg-gray-700`). Exception: external brand colors (e.g., social login buttons)
- **Component variant maps**: Use explicit `Record<Variant, string>` objects for mapping prop values to DaisyUI class names -- never template literals like `` `btn-${variant}` ``

  ```tsx
  const variantClass: Record<ButtonVariant, string> = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'btn-ghost',
  }

  export function Button({ variant = 'primary', className = '', ...props }) {
    return <button className={`btn ${variantClass[variant]} ${className}`.trim()} {...props} />
  }
  ```

- **Dependency versions**: Use **caret ranges** (`^`) for all dependencies and devDependencies. The lockfile provides reproducibility; caret ranges allow patch/minor updates on `pnpm install`.
- **pnpm overrides**: The one exception — when adding entries to `pnpm.overrides` in root `package.json` (typically to address vulnerabilities), always pin to **exact versions** — never use range specifiers like `>=5.2.0` or `^5.2.0`
- **Verification before completion**: No completion claims without fresh verification evidence. Run the command. Read the output. THEN claim the result.
- **Readonly props**: Wrap component props with `Readonly<{...}>` and name the type `ComponentNameProps`
- **Discriminated unions over enums**: Use `type Result = { status: 'success'; data: T } | { status: 'error'; error: string }` for exhaustive narrowing
- **`satisfies` operator**: Use `satisfies Record<K, V>` to type-check without widening — preserves literal types
- **`unknown` over `any`**: Never use `any` — use `unknown` and narrow before accessing properties
- **Path aliases**: Configure `@/*` in `tsconfig.json` paths. Always import with `@/` prefix, never relative paths crossing module boundaries
- **Strict tsconfig flags**: Beyond `strict: true`, enable `noUncheckedIndexedAccess`, `noPropertyAccessFromIndexSignature`, `exactOptionalPropertyTypes`

## Production Checklist

Before shipping to production, verify:

- [ ] No hydration warnings in browser console
- [ ] All images use `next/image` with correct `sizes` attribute
- [ ] Fonts loaded via `next/font` (no layout shift)
- [ ] CSP and security headers configured
- [ ] No secrets in client code (`NEXT_PUBLIC_` prefix only for public values)
- [ ] Lighthouse scores green (Performance, Accessibility, SEO)
- [ ] Error boundaries (`error.tsx`) and not-found pages in place

## Architecture Decisions

Key decisions and their rationale. When bootstrapping a new project, add entries for project-specific choices.

| Decision          | Choice                          | Rationale                                                                                       |
| ----------------- | ------------------------------- | ----------------------------------------------------------------------------------------------- |
| Server state      | React Query                     | Automatic caching, background refetching, Suspense integration. No manual cache normalization.  |
| Client state      | Zustand (when needed)           | Minimal API, no boilerplate. Most apps need very little client state with React Query.           |
| Styling           | DaisyUI v5 + TailwindCSS v4    | Semantic color system, accessible defaults, rapid prototyping. No CSS-in-JS SSR complexity.     |
| Forms             | react-hook-form + Zod           | Minimal re-renders, schemas shared between client and server, strong TypeScript inference.       |
| Feature structure | Feature modules + barrel exports | Self-contained, testable, no cross-feature coupling. Routes are thin wrappers.                  |
| Monorepo          | Turborepo + pnpm               | Task caching, dependency graph awareness, fast installs with content-addressable storage.        |
| Unit testing      | Jest + RTL + MSW               | Fast unit/integration cycles. MSW mocks at the network level for realistic API testing.          |
| E2E testing       | Playwright                     | Cross-browser, auto-wait, trace viewer for debugging. Runs in CI with GitHub Actions.            |
| Auth              | NextAuth.js (JWT)              | Standards-based, provider ecosystem, middleware integration, server-side session access.          |

## Skill Dependencies

| Skill            | Commonly co-loads with    | Shared concepts                                                     |
| ---------------- | ------------------------- | ------------------------------------------------------------------- |
| **data**         | testing, nextjs           | API response shapes, React Query testing, Zod validation            |
| **nextjs**       | data, auth, ui            | Route handlers, middleware, Server Components                       |
| **auth**         | nextjs, data              | Middleware, session management, API authorization, security headers  |
| **performance**  | nextjs, testing           | Core Web Vitals, Lighthouse CI, bundle analysis, rendering          |
| **refactoring**  | testing, nextjs           | Safe restructuring, migration recipes, dead code detection          |
| **testing**      | data, ui                  | MSW handlers, component rendering, browser verification             |
| **ui**           | testing, nextjs           | Component composition, accessibility, responsive design             |
| **devops**       | testing                   | CI/CD, build commands, pre-release verification, hooks              |
| **debugging**    | any skill                 | Stack-agnostic process, pairs with any domain skill                 |
| **skill-creator**| any skill                 | Skill auditing, token analysis, reference restructuring             |

## Project Structure

### Applications

- `apps/{app-1}` - Primary application (**App Router**)
- `apps/{app-2}` - Secondary application (**App Router**)

### Shared Packages

- `packages/ui` - Shared component library
- `packages/typescript-config` - TypeScript configuration
- `packages/eslint-config` - ESLint rules

### File Structure

```
apps/*/app/                # App Router routes
apps/*/components/         # React components
apps/*/types/              # TypeScript definitions
apps/*/queries/            # React Query hooks
apps/*/actions/            # Server Actions
apps/*/mocks/              # MSW handlers
```

## Essential Commands

```bash
pnpm install

pnpm turbo run dev --filter={app-name}

# Server Ready Indicator: "Ready in XXXms"

pnpm turbo run build --filter={app-name}

pnpm turbo run test --filter={app-name}              # Watch mode
pnpm turbo run test:ci --filter={app-name}           # CI mode (non-interactive)

pnpm turbo run lint --filter={app-name}

pnpm turbo run check-types --filter={app-name}
```

## MCP Servers

### Browser Automation

| Environment | MCP Server                                    | Notes                            |
| ----------- | --------------------------------------------- | -------------------------------- |
| Claude Code | Chrome DevTools MCP (`chrome-devtools-mcp`)   | Headless mode, `--isolated` flag |
| Cursor      | Cursor IDE Browser MCP (`cursor-ide-browser`) | Built-in, no installation needed |

**Screenshots**: Always save browser screenshots to `/tmp/` — never into the project directory. This prevents test artifacts from being committed.

### Other MCP Servers

- **Ticket system MCP** (optional): JIRA (Atlassian MCP), Linear, or other — setup varies by environment
- **Next.js DevTools MCP**: Next.js 16+ server discovery, runtime diagnostics, error detection

### Installation (Claude Code)

```bash
claude mcp add chrome-devtools npx chrome-devtools-mcp@latest
claude mcp add next-devtools npx next-devtools-mcp@latest
```
