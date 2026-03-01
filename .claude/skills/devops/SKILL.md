---
name: devops
description: 'Ship code: pnpm/Turborepo local dev, Git workflow, GitHub Actions CI/CD, and deployment.'
globs:
  ['turbo.json', 'pnpm-workspace.yaml', '.npmrc', 'pnpm-lock.yaml', '.github/**/*', '.gitignore']
---

# DevOps — Local Dev to Production

How to ship code: from local development through Git to CI to deployment.

## Local Development (pnpm + Turborepo)

| Command                                          | Purpose                                   |
| ------------------------------------------------ | ----------------------------------------- |
| `pnpm turbo run dev --filter={app-name}`         | Dev server (persistent, auto-builds deps) |
| `pnpm turbo run build --filter={app-name}`       | Build (cached)                            |
| `pnpm turbo run test --filter={app-name}`        | Test (watch mode)                         |
| `pnpm turbo run test:ci --filter={app-name}`     | Test (CI, non-interactive)                |
| `pnpm turbo run lint --filter={app-name}`        | Lint                                      |
| `pnpm turbo run check-types --filter={app-name}` | Type check                                |

**Cache troubleshooting:** `pnpm turbo run build --force` | `rm -rf .turbo` | `pnpm clean && pnpm install` | `pnpm turbo run build --dry-run`

**Filtering:** `--filter={app}` (by app) | `--filter=@{org}/ui` (by package) | `--filter={app}...` (with deps)

## Git Workflow

- **Branch:** `{TICKET-KEY}.<short-summary-dasherized>` (e.g. `PROJ-1234.add-password-strength`)
- **Commit:** `{TICKET-KEY}: {concise summary}` (imperative, lowercase)
- **PRs:** Create as drafts until CI passes. Use `gh pr create --draft`
- **Pre-commit:** `git status && git diff --cached` → `pnpm turbo run check-types` → `pnpm turbo run lint`

See [git-patterns.md](references/git-patterns.md) for stacked PRs, hotfix branches, release flow.

## CI/CD (GitHub Actions)

**Build monitoring:** `gh run list --branch={branch}` | `gh run view {run-id} --log-failed`

**Failure recovery:** Flaky → `gh run rerun {run-id} --failed` (max 3). Code error → fix and push. Infrastructure → wait 5 min, rerun.

**Deployment flow:** Push → CI builds → Deploy to staging → Verify. Before: CI green. After: smoke tests pass.

See [github-actions.md](references/github-actions.md) for workflows, matrix, caching.

## Pre-Release Verification

Run in order (fast-fail):

```bash
pnpm turbo run check-types
pnpm turbo run lint
pnpm turbo run test:ci
pnpm turbo run build
```

## References

- **[monorepo-turborepo.md](references/monorepo-turborepo.md)** — turbo.json tasks, pipelines, workspace filtering
- **[monorepo-eslint-prettier.md](references/monorepo-eslint-prettier.md)** — ESLint flat config, Prettier
- **[monorepo-typescript-deps.md](references/monorepo-typescript-deps.md)** — tsconfig, pnpm overrides, vulnerability audit
- **[git-patterns.md](references/git-patterns.md)** — Stacked PRs, hotfix branches, release flow
- **[github-actions.md](references/github-actions.md)** — CI/CD workflows, matrix, deployments, caching
- **[claude-hooks.md](references/claude-hooks.md)** — Claude Code hooks for workflow automation
