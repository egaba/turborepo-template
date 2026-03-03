# Safe Refactoring Patterns

Incremental extraction and restructuring patterns. Each pattern follows: identify -> extract -> verify.

## Extract Function

- **When:** logic block is >10 lines or has a clear single purpose
- **How:** cut logic, create named function, call from original location
- **Verify:** same behavior, tests pass

```typescript
// Before
function processOrder(order: Order) {
  // 15 lines of validation...
  // 10 lines of pricing...
}

// After
function validateOrder(order: Order): ValidationResult {
  /* ... */
}
function calculatePrice(order: Order): number {
  /* ... */
}
function processOrder(order: Order) {
  const validation = validateOrder(order)
  const price = calculatePrice(order)
}
```

## Extract Component

- **When:** JSX block has its own state/logic or is reused
- **How:** create new file, define typed props, move JSX + logic, import in parent
- **Pattern:** always use `Readonly<Props>` naming convention

```typescript
// New file: task-status-badge.tsx
type TaskStatusBadgeProps = Readonly<{
  status: TaskStatus
}>

export function TaskStatusBadge({ status }: TaskStatusBadgeProps) {
  const badgeClass = statusClassMap[status]
  return <span className={`badge ${badgeClass}`}>{status}</span>
}
```

## Extract Hook

- **When:** `useState` + `useEffect` combo is reused or component is too complex
- **How:** create `use{Name}` hook, return state + handlers, import in component
- **Rule:** hooks own their state, components own their rendering

```typescript
// use-debounced-search.ts
export function useDebouncedSearch(delay = 300) {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, delay)
  return { query, setQuery, debouncedQuery } as const
}
```

## Extract Module

- **When:** a group of related functions/types serves a clear domain
- **How:** create directory with `index.ts` barrel, move files, update imports
- **Verify:** no circular dependencies (`madge --circular`)

## Move to Shared Package

- **When:** component/utility needed in 2+ apps
- **Steps:**
  1. Create in `packages/ui` (or `packages/shared`)
  2. Export from barrel
  3. Add as workspace dependency
  4. Update imports in consuming apps
- **Turborepo:** update `turbo.json` if needed for build ordering

## Dead Code Detection

```bash
npx knip                    # Comprehensive: unused files, exports, dependencies
npx ts-prune                # Unused TypeScript exports
npx depcheck                # Unused npm dependencies
```

**Monorepo note:** `knip` requires a `knip.config.ts` with workspace entries in a monorepo. Run from the app directory (`cd apps/web && npx knip`) or configure workspaces at the root.

Always verify before deleting -- knip can false-positive on dynamically imported code.

## Rename Patterns (preserve git history)

- Use `git mv` for file renames (preserves history tracking)
- Rename in two commits: 1) rename file, 2) update all imports
- IDE refactoring is faster but verify with `grep` for missed references

## TypeScript-Specific Refactoring

- Replace `any` with `unknown` + type guards
- Replace `interface` with `type` (project convention)
- Add discriminated unions for exhaustive narrowing
- Use `satisfies` for type-checking without widening

## Inline (Reverse Extract)

- **When:** abstraction adds complexity without benefit, or wrapper has only 1 caller
- **How:** copy body into call site, delete extracted function/component, verify tests
- **Rule:** inlining is a valid refactoring -- not every extraction is permanent
