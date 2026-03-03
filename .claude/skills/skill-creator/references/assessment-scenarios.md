# Assessment Scenarios

Concrete prompts with pass criteria for each skill and agent.
Scoring rubric and methodology: [skill-assessment.md](skill-assessment.md)

## Skills

### ui -- A: Variant Component (P0)

**Prompt**: "Create an Alert component with info, success, warning, error variants and a closable prop."
**Criteria**: `Record<AlertVariant, string>` map (not template literal) / DaisyUI semantic classes / `Readonly<AlertProps>` / keyboard-accessible close

### ui -- B: Fix Color Violation (P1)

**Prompt**: "Refactor the CTA section hardcoded colors to DaisyUI semantic tokens."
**Criteria**: Identifies hardcoded colors / replaces with semantic tokens / visual appearance preserved

### ui -- C: Responsive Verification (P1)

**Prompt**: "Verify the dashboard works on mobile (375px), tablet (768px), desktop."
**Criteria**: Screenshots at each breakpoint / sidebar collapse on mobile / no horizontal overflow

### data -- A: Query Hook (P0)

**Prompt**: "Add a useFilteredTasks hook that accepts a status filter."
**Criteria**: `useSuspenseQuery` (not `useQuery`) / parameterized key `['tasks', { status }]` / barrel export

### data -- B: API Endpoint (P0)

**Prompt**: "Create a PATCH /api/tasks/[id]/status endpoint."
**Criteria**: Zod `safeParse` / `StatusCodes` constants (no raw numbers) / `ApiError` shape for errors

### data -- C: Form (P1)

**Prompt**: "Create a task creation form."
**Criteria**: `zodResolver` / `'use client'` directive / `register` + `handleSubmit` pattern

### nextjs -- A: Feature Scaffold (P0)

**Prompt**: "Scaffold a new 'projects' feature."
**Criteria**: `features/projects/` with actions/, components/, data/, hooks/, queries/, schemas/, types/, index.ts / no cross-feature imports

### nextjs -- B: Server vs Client (P1)

**Prompt**: "Should a filterable task list be a Server or Client Component?"
**Criteria**: Identifies `'use client'` need (useState) / suggests composition pattern / Server Components for data

### nextjs -- C: Page Metadata (P1)

**Prompt**: "Add SEO metadata for the dashboard."
**Criteria**: Static `metadata: Metadata` export / title + description / no deprecated `<Head>`

### auth -- A: Security Headers (P0)

**Prompt**: "Add security headers to next.config.ts."
**Criteria**: HSTS, X-Content-Type-Options, X-Frame-Options / CSP recommendation / preserves `poweredByHeader: false`

### auth -- B: Debug 401 (P1)

**Prompt**: "My API route returns 401. How do I debug?"
**Criteria**: Structured checklist / specific inspection commands / references symptom-cause table

### auth -- C: Env Validation (P1)

**Prompt**: "Set up runtime validation for auth env vars."
**Criteria**: Zod schema / validates at server startup / no `NEXT_PUBLIC_` on secrets

### testing -- A: Component Test (P0)

**Prompt**: "Write tests for a TaskForm component."
**Criteria**: `it()` not `test()` / custom render from `@/__tests__/render` / `getByRole` priority / `userEvent`

### testing -- B: E2E Test (P1)

**Prompt**: "Write Playwright E2E tests for tasks CRUD."
**Criteria**: `request` API context / covers CRUD + error cases / tests are isolated

### testing -- C: Browser Verification (P1)

**Prompt**: "Verify the dashboard looks correct after a change."
**Criteria**: Screenshots at multiple viewports / console error check / interactive element verification

### debugging -- A: Failing Test (P0)

**Prompt**: "E2E test says 'Total Skills' not found."
**Criteria**: Reads BOTH test and component / identifies mismatch / traces data flow / runs verification

### debugging -- B: Hydration Error (P1)

**Prompt**: "Getting 'Text content does not match' on dashboard."
**Criteria**: Follows 4-phase process / identifies server/client divergence / does NOT suggest `suppressHydrationWarning`

### debugging -- C: 3-Fix Rule (P1)

**Prompt**: "I've tried 3 fixes for CSS not loading in prod, none worked."
**Criteria**: Invokes 3-Fix Rule / stops quick fixes / investigates architecture / discusses before proceeding

### devops -- A: Pre-Release (P0)

**Prompt**: "Run the full pre-release sequence."
**Criteria**: Runs check-types, lint, test:ci, build in order / reports actual output / stops on first failure

### devops -- B: Workspace Package (P1)

**Prompt**: "Add a shared @repo/utils package."
**Criteria**: `@repo/*` naming / caret ranges / extends shared tsconfig / resolves in Turborepo

### devops -- C: Cache Diagnosis (P1)

**Prompt**: "Build isn't caching."
**Criteria**: Uses `--dry-run` / checks `turbo.json` inputs/outputs / identifies cause

### performance -- A: Diagnose Slow Page (P0)

**Prompt**: "The dashboard takes 5 seconds to load. Diagnose and fix."
**Criteria**: Measures first (Lighthouse/CWV) / identifies specific bottleneck / applies targeted recipe / re-measures

### performance -- B: Image Audit (P1)

**Prompt**: "Audit all images on the marketing page for performance."
**Criteria**: Checks `next/image` usage / `sizes` attribute / `priority` on LCP image / no raw `<img>`

### performance -- C: Bundle Analysis (P1)

**Prompt**: "Our bundle is too large. Find the biggest contributors."
**Criteria**: Notes `@next/bundle-analyzer` setup required / explains treemap / identifies actionable targets

### refactoring -- A: Split Large Component (P0)

**Prompt**: "TaskList.tsx is 350 lines. Refactor it."
**Criteria**: Verifies tests pass first / ONE change at a time / runs tests after each / commits incrementally

### refactoring -- B: Extract Shared Hook (P1)

**Prompt**: "useTaskFilters is used in 3 features. Extract it."
**Criteria**: Moves to `lib/hooks/` / updates all imports / runs tests / no cross-feature imports remain

### refactoring -- C: Dead Code (P1)

**Prompt**: "We removed the inbox feature. Clean up dead code."
**Criteria**: Identifies orphaned imports/types/tests / removes systematically / runs check-types + test:ci

### bootstrap -- A: Initialize Project (P0)

**Prompt**: "Initialize this template for a project called NovaPay."
**Criteria**: Asks for name + description + demo pages / replaces in all listed files / runs check-types + lint

### bootstrap -- B: Remove Demo Pages (P1)

**Prompt**: "Remove the demo pages."
**Criteria**: Deletes inbox, pipeline, trips / removes demo nav links / keeps dashboard

### skill-creator -- A: Audit Skill (P0)

**Prompt**: "Audit the auth skill for quality."
**Criteria**: Runs validation checklist / checks all line counts / reports pass/fail per criterion

### skill-creator -- B: Create Skill (P1)

**Prompt**: "Create an analytics skill."
**Criteria**: Valid YAML / description <200 chars / SKILL.md <150 lines / references for detail

### skill-creator -- C: Fix Oversized (P1)

**Prompt**: "Testing SKILL.md is 152 lines. Fix it."
**Criteria**: Moves content to references / updates pointers / final <150

## Agents

### reviewer -- Catch Violations (P0)

**Setup**: Create branch with raw `200`, `` `btn-${v}` ``, `any` type, `text-gray-700`, `interface` for props.
**Criteria**: All 5 violations caught / correct severity / gates run with real output / BLOCK verdict

### planner -- Feature Plan (P0)

**Prompt**: "Plan a notifications feature for the dashboard."
**Criteria**: Phased delivery / exact file paths / skill tags / independently mergeable / risks identified

### architect -- Technology Decision (P1)

**Prompt**: "Should we use Zustand or React Context for global UI state?"
**Criteria**: ADR format / trade-off table / recommendation with rationale / references existing patterns

### e2e-runner -- Test Suite (P0)

**Prompt**: "Create E2E tests for the dashboard page."
**Criteria**: P0/P1 journey identification / `getByRole` priority / independent tests / flakiness check

### security-reviewer -- Security Audit (P1)

**Prompt**: "Review the current codebase for security issues."
**Criteria**: OWASP checks / Next.js-specific checks / severity levels / remediation / >90% confidence
