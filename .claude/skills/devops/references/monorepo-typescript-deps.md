# TypeScript, pnpm, and Vulnerability Audits

Shared tsconfig, pnpm workspace patterns, overrides, and audit workflow.

## pnpm-workspace.yaml

```yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

## workspace:\* References

```jsonc
// apps/my-app/package.json
{
  "dependencies": {
    "@my-org/ui": "workspace:*",
  },
}
```

## .npmrc Patterns

```ini
auto-install-peers=true
save-exact=true
```

## pnpm Overrides

```jsonc
// root package.json
"pnpm": {
  "overrides": {
    "basic-ftp": "5.2.0",
    "minimatch@<3.1.4": "3.1.4",
    "glob@>=10.2.0 <10.5.0": "10.5.0"
  }
}
```

**Rules:** Override values must be **exact versions**. Scoped selectors on the key side OK. After updating: `pnpm install`.

## Shared tsconfig

```jsonc
// packages/ts-config/base.json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "target": "es6",
    "strict": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "skipLibCheck": true,
  },
  "exclude": ["node_modules"],
}
```

```jsonc
// packages/ts-config/nextjs.json
{
  "extends": "./base.json",
  "compilerOptions": { "noEmit": true },
}
```

```jsonc
// apps/my-app/tsconfig.json
{
  "extends": "@my-org/ts-config/nextjs.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] },
  },
  "include": ["**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"],
}
```

## Vulnerability Audit

```bash
pnpm audit --audit-level=high --prod
pnpm audit
```

**Fix methods:** 1) Parent bump first. 2) pnpm overrides (transitive). 3) Direct bump (direct deps).

```bash
pnpm install
pnpm audit --audit-level=high
pnpm turbo run build
pnpm turbo run test:ci --filter=<affected-apps>
```

| Severity     | Dep Type      | Action                    |
| ------------ | ------------- | ------------------------- |
| critical     | production    | Fix immediately           |
| critical     | devDependency | Fix within current sprint |
| high         | production    | Fix within current sprint |
| high         | devDependency | Fix within current sprint |
| moderate/low | any           | Batch into next audit     |
