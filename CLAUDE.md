# {project-name}

Next.js monorepo with Turborepo, DaisyUI v5, and TailwindCSS v4.

## Skills

| Skill | Concern | Description |
|-------|---------|-------------|
| **ui** | Build | Component styling, theming (DaisyUI v5 + TailwindCSS v4), accessibility patterns |
| **data** | Build | Server state (React Query), API routes, forms (react-hook-form + Zod), Server Actions, caching/revalidation |
| **nextjs** | Build | Next.js App Router architecture, Server Components, routing, performance, SEO |
| **auth** | Build | Authentication, authorization, and security hardening (NextAuth.js, CSP, headers, input validation) |
| **testing** | Verify | Unit/integration (Jest + RTL + MSW), E2E (Playwright), browser verification, pre-release checklist |
| **debugging** | Process | Systematic 4-phase debugging, root-cause tracing, verification-before-completion |
| **devops** | Ship | pnpm/Turborepo, Git workflow, GitHub Actions CI/CD |
## Agents

| Agent | Purpose | When to Use |
|-------|---------|-------------|
| `reviewer` | Reviews diffs against CLAUDE.md conventions, runs verification gates (`check:types`, `lint`, `test:ci`) | Before committing/merging — spawn to get a structured code review |

## Code Quality Conventions

- **TypeScript**: Always required for new features and files
- **type over interface**: Prefer `type` unless inheritance is specifically needed
- **Import ordering**: `import type` statements first, then regular imports
- **HTTP status codes**: Always use `http-status-codes` package constants (`StatusCodes.OK`, `StatusCodes.NOT_FOUND`) — never raw numeric codes
- **DaisyUI semantic colors**: Always use DaisyUI semantic color classes (`bg-base-100`, `text-primary`, `btn-primary`, etc.) instead of hardcoded hex values or raw Tailwind color classes (`bg-gray-700`). Exception: external brand colors (e.g., social login buttons)
- **Component variant maps**: Use explicit `Record<Variant, string>` objects for mapping prop values to DaisyUI class names -- never template literals like `` `btn-${variant}` ``

  ```tsx
  const variantClass: Record<ButtonVariant, string> = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    ghost: "btn-ghost",
  }

  export function Button({ variant = "primary", className = "", ...props }) {
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

## Skill Dependencies

| Skill | Commonly co-loads with | Shared concepts |
|-------|----------------------|-----------------|
| **data** | testing, nextjs | API response shapes, React Query testing, Zod validation |
| **nextjs** | data, auth, ui | Route handlers, middleware, Server Components |
| **auth** | nextjs, data | Middleware, session management, API authorization, security headers |
| **testing** | data, ui | MSW handlers, component rendering, browser verification |
| **ui** | testing, nextjs | Component composition, accessibility, responsive design |
| **devops** | testing | CI/CD, build commands, pre-release verification |
| **debugging** | any skill | Stack-agnostic process, pairs with any domain skill |

## Project Structure

### Applications

- `apps/{app-1}` - Primary application (**App Router**)
- `apps/{app-2}` - Secondary application (**App Router**)

### Shared Packages

- `packages/ui` - Shared component library
- `packages/ts-config` - TypeScript configuration
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

pnpm turbo run check:types --filter={app-name}
```

## MCP Servers

### Browser Automation

| Environment | MCP Server | Notes |
|-------------|-----------|-------|
| Claude Code | Chrome DevTools MCP (`chrome-devtools-mcp`) | Headless mode, `--isolated` flag |
| Cursor | Cursor IDE Browser MCP (`cursor-ide-browser`) | Built-in, no installation needed |

### Other MCP Servers

- **Ticket system MCP** (optional): JIRA (Atlassian MCP), Linear, or other — setup varies by environment
- **Next.js DevTools MCP**: Next.js 16+ server discovery, runtime diagnostics, error detection

### Installation (Claude Code)

```bash
claude mcp add chrome-devtools npx chrome-devtools-mcp@latest
claude mcp add next-devtools npx next-devtools-mcp@latest
```
