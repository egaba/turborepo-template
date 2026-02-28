---
name: monorepo
description: pnpm + Turborepo monorepo patterns, Docker multi-stage builds, ESLint flat config, and dependency management.
globs: ['turbo.json', 'pnpm-workspace.yaml', 'Dockerfile', '.npmrc', 'pnpm-lock.yaml']
---

# pnpm + Turborepo Monorepo Patterns

Patterns for managing monorepos with pnpm workspaces and Turborepo.

## Essential Commands

```bash
# Development (persistent, auto-builds dependencies)
pnpm turbo run dev --filter=my-app

# Build (cached, auto-builds dependencies)
pnpm turbo run build --filter=my-app

# Testing
pnpm turbo run test --filter=my-app          # Watch mode (interactive)
pnpm turbo run test:ci --filter=my-app        # CI mode (non-interactive, cached)

# Linting
pnpm turbo run lint --filter=my-app
```

## Cache Troubleshooting

```bash
# Force rebuild (ignore cache)
pnpm turbo run build --force

# Clear Turborepo cache
rm -rf .turbo

# Full reset
pnpm clean && pnpm install

# Check execution plan
pnpm turbo run build --dry-run
```

## Workspace Filtering

```bash
# Filter by app name
pnpm turbo run dev --filter=my-app

# Filter by package name
pnpm turbo run build --filter=@my-org/ui

# Filter with dependencies
pnpm turbo run build --filter=my-app...
```

## References

| Reference | Content |
|-----------|---------|
| **[turborepo-patterns.md](references/turborepo-patterns.md)** | Task config, ESLint flat config, pnpm overrides, tsconfig sharing, vulnerability audits |
| **[docker-builds.md](references/docker-builds.md)** | Multi-stage Dockerfile, BuildKit caching, standalone vs traditional deployment |
