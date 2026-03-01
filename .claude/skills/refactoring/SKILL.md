---
name: refactoring
description: 'Safe code restructuring — extract, split, consolidate, migrate, and remove dead code. Use when refactoring components, splitting features, cleaning up code, or upgrading patterns.'
globs: []
---

# Refactoring

Safe, incremental code restructuring with continuous test verification.

## The Refactoring Loop (ALWAYS follow)

1. Verify tests pass (baseline)
2. Make ONE structural change
3. Verify tests still pass
4. Commit
5. Repeat

Never combine refactoring with feature work in the same commit.

## When to Refactor

- Feature module exceeds ~500 lines total -> split into sub-features
- Component exceeds ~200 lines -> extract sub-components
- Same logic in 3+ places -> extract to `lib/` or `packages/ui`
- Pattern upgrade available (e.g., `useQuery` -> `useSuspenseQuery`)
- Dead code accumulation after feature removal

## Feature Module Splitting

When a feature grows too large, split into sub-features:

```
features/tasks/           ->  features/tasks/
  actions/                      actions/         (shared)
  components/                   components/      (shared)
  sub-features/
    task-filters/
      components/
      hooks/
      index.ts
    task-analytics/
      components/
      queries/
      index.ts
```

Each sub-feature has its own barrel export. Shared code stays at the parent level.

## Extract-to-Shared Patterns

- Component used by 2+ features -> `packages/ui`
- Utility used by 2+ apps -> `packages/shared`
- Hook used by 2+ features -> `lib/hooks/`
- Type used by 2+ features -> `lib/types/`

## Component Extraction Rules

- Extract when a component has 2+ distinct responsibilities
- New component gets its own file, typed props (`ComponentNameProps`), barrel export
- Parent passes data down, child emits events up
- Never break existing public API without updating all consumers

## Anti-Patterns (NEVER do these)

- Big-bang refactors (rewriting entire features at once)
- Refactoring without test coverage (add tests FIRST)
- Mixing refactoring with feature work in same commit
- Premature abstraction (don't extract until 3+ usages)
- Renaming for style preference (only rename for clarity)

## References

- **[safe-refactoring-patterns.md](references/safe-refactoring-patterns.md)** -- Extract function, component, hook, module; dead code detection; rename patterns
- **[migration-recipes.md](references/migration-recipes.md)** -- useQuery -> useSuspenseQuery, MSW v1 -> v2, dependency upgrade workflow
