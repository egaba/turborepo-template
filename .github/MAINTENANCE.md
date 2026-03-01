# Maintenance

## Automated Monitoring

`monitor-dependencies.yaml` runs daily `pnpm audit` with Claude Code assessment and advisory tracking.

> **Setup required**: Configure placeholders (`{RUNNER_LABEL}`, `{JIRA_PROJECT_KEY}`, etc.) and secrets (`ANTHROPIC_API_KEY`, `JIRA_API_KEY`) when spawning a new project. See workflow comments for details.

## Safe Upgrade Workflow

### Patch/Minor (batch)

```bash
pnpm update --recursive
pnpm turbo run check-types
pnpm turbo run lint
pnpm turbo run test:ci
pnpm turbo run build
```

### Major Versions (one at a time)

1. Read the changelog for breaking changes
2. `pnpm update {package}@latest --recursive`
3. Fix breaking changes in code
4. Run full verification (same as above)
5. Commit separately with clear message

## Vulnerability Fixes

```bash
# 1. Understand the dependency chain
pnpm why {package}

# 2. Fix
#    Direct dep: upgrade to fixed version
#    Transitive dep: add pnpm.overrides with exact pinned version

# 3. Verify
pnpm audit
pnpm turbo run check-types
pnpm turbo run test:ci
pnpm turbo run build
```
