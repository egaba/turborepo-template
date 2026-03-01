# Advanced Branch Patterns

## Branch Types

| Type | Pattern | Example | Purpose |
|------|---------|---------|---------|
| Feature | `{TICKET}.<summary>` | `PROJ-123.add-auth` | New features |
| Bugfix | `{TICKET}.<summary>` | `FIX-456.login-crash` | Bug fixes |
| Hotfix | `hotfix/{TICKET}.<summary>` | `hotfix/FIX-789.prod-500` | Urgent production fixes |
| Release | `release/{version}` | `release/2.1.0` | Release preparation |

## Stacked PRs

When a feature is too large for a single PR:

```
main
  └── PROJ-123.part-1-data-model
        └── PROJ-123.part-2-api-layer
              └── PROJ-123.part-3-ui-components
```

**Rules:**
- Each PR should be independently reviewable
- Base each stacked branch on the previous one, not main
- Merge in order: part-1 first, rebase part-2, merge part-2, etc.
- Keep each PR focused on one layer/concern

## Merge Strategy

- **Squash merge** for feature branches (clean history on main)
- **Merge commit** for release branches (preserve release boundary)
- **Rebase** for updating feature branches from main (linear local history)

## Protected Branch Rules

| Branch | Merge Requirements |
|--------|-------------------|
| `main` | PR required, CI passing, 1+ approval |
| `release/*` | PR required, CI passing, 2+ approvals |

## Cleanup

```bash
# Delete merged local branches
git branch --merged main | grep -v main | xargs git branch -d

# Prune remote tracking branches
git fetch --prune
```
