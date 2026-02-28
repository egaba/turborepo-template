# Turborepo & Monorepo Patterns

Configuration patterns for pnpm + Turborepo monorepos including task definitions, ESLint, dependency management, and vulnerability auditing.

## turbo.json Task Configuration

### Development Tasks

```jsonc
{
  "tasks": {
    "dev": {
      "dependsOn": ["^build"],       // Build dependencies first
      "inputs": ["$TURBO_DEFAULT$", ".env.local"],
      "cache": false,                // Never cache dev server
      "persistent": true             // Long-running process
    }
  }
}
```

### Build Tasks

```jsonc
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"],       // Build dependencies first
      "inputs": [
        "app/**", "components/**", "helpers/**",
        "hooks/**", "types/**", "middleware.ts",
        "next.config.js", ".env.local",
        "!*/**/*.test.tsx"           // Exclude test files
      ],
      "outputs": [".next/**", "!.next/cache/**"]
    }
  }
}
```

### Test Tasks

```jsonc
{
  "tasks": {
    "test": {
      "dependsOn": ["^build"],
      "cache": false,
      "persistent": true             // Watch mode (interactive)
    },
    "test:ci": {
      "dependsOn": ["^build"]
      // Cached, non-interactive (CI/CD)
    }
  }
}
```

### Lint Tasks

```jsonc
{
  "tasks": {
    "lint": {
      "dependsOn": ["^lint"],        // Lint dependencies first
      "inputs": ["app/**", "components/**", "helpers/**", "hooks/**", "types/**"]
    }
  }
}
```

### Caret (`^`) Notation

- `^build` means "run `build` in all **dependency** packages first"
- Without `^`, the task runs only in the current package
- `dependsOn: ["^build"]` on `dev` ensures shared packages are compiled before the app starts

### Input/Output Configuration for Caching

- **inputs**: Files that affect the task result. Changes to these invalidate the cache.
- **outputs**: Files the task produces. These are stored/restored from cache.
- `$TURBO_DEFAULT$` matches Turborepo's default input set (all tracked files)
- Exclude test files from build inputs: `"!*/**/*.test.tsx"`
- Exclude cache from outputs: `"!.next/cache/**"`

## Workspace Filtering

```bash
# By app directory name
pnpm turbo run dev --filter=my-app

# By package.json name
pnpm turbo run build --filter=@my-org/ui

# With transitive dependencies (... suffix)
pnpm turbo run build --filter=my-app...

# Multiple filters
pnpm turbo run lint --filter=my-app --filter=@my-org/ui
```

## Composable ESLint Flat Config

Package pattern for a shared ESLint config that apps compose from:

### Shared Config Package

```javascript
// packages/eslint-config-custom/eslint.config.js
const js = require('@eslint/js')
const tsPlugin = require('@typescript-eslint/eslint-plugin')
const tsParser = require('@typescript-eslint/parser')
const importPlugin = require('eslint-plugin-import')
const reactPlugin = require('eslint-plugin-react')
const reactHooksPlugin = require('eslint-plugin-react-hooks')
const jestPlugin = require('eslint-plugin-jest')
const nextPlugin = require('@next/eslint-plugin-next')
const eslintConfigPrettier = require('eslint-config-prettier')

// Base config: JS/TS shared rules
const baseConfig = {
  plugins: { import: importPlugin, react: reactPlugin, 'react-hooks': reactHooksPlugin },
  rules: {
    ...js.configs.recommended.rules,
    'no-unused-vars': ['error', { args: 'none', varsIgnorePattern: '^_' }],
    'prefer-const': 'error',
    'object-shorthand': 'error',
    'import/order': ['error', {
      groups: [['type'], ['external', 'builtin'], ['internal', 'parent', 'sibling', 'index']],
      'newlines-between': 'always',
    }],
  },
}

// TypeScript overlay
const typescriptConfig = {
  files: ['**/*.ts', '**/*.tsx'],
  plugins: { '@typescript-eslint': tsPlugin },
  languageOptions: { parser: tsParser },
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { args: 'none', varsIgnorePattern: '^_' }],
  },
}

// Jest overlay
const jestConfig = {
  files: ['**/*.test.{js,jsx,ts,tsx}', '**/*.spec.{js,jsx,ts,tsx}', '**/mocks/**/*'],
  plugins: { jest: jestPlugin },
  languageOptions: { globals: { ...require('globals').jest } },
}

// Next.js overlay
const nextConfig = {
  plugins: { '@next/next': nextPlugin },
  rules: { ...nextPlugin.configs.recommended.rules, ...nextPlugin.configs['core-web-vitals'].rules },
}

module.exports = {
  base: baseConfig,
  typescript: typescriptConfig,
  jest: jestConfig,
  next: nextConfig,
  recommended: [baseConfig, typescriptConfig, jestConfig, eslintConfigPrettier],
}
```

### How Apps Compose Configs

```javascript
// apps/my-app/eslint.config.js
const { recommended, next } = require('@my-org/eslint-config-custom')

module.exports = [
  ...recommended,
  next,
  {
    // App-specific overrides
    ignores: ['node_modules/', '.next/'],
  },
]
```

## Prettier Config Pattern

```javascript
// .prettierrc.js (root)
module.exports = {
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 100,
  overrides: [
    { files: '*.json', options: { printWidth: 200 } },
    { files: '*.md', options: { proseWrap: 'always' } },
  ],
}
```

## pnpm Workspace Patterns

### pnpm-workspace.yaml

```yaml
packages:
  - "apps/*"
  - "packages/*"
```

### workspace:* References

```jsonc
// apps/my-app/package.json
{
  "dependencies": {
    "@my-org/ui": "workspace:*"       // Link to local package
  }
}
```

### .npmrc Patterns

```ini
auto-install-peers=true
save-exact=true
```

## pnpm Overrides

For fixing transitive dependency vulnerabilities:

```jsonc
// root package.json
"pnpm": {
  "overrides": {
    "basic-ftp": "5.2.0",                         // ALWAYS exact versions
    "minimatch@<3.1.4": "3.1.4",                  // Scoped: only override old versions
    "glob@>=10.2.0 <10.5.0": "10.5.0"             // Scoped: target specific range
  }
}
```

**Rules:**
- Override values must be **exact versions** (never `>=`, `^`, `~`)
- Scoped selectors on the key side are OK for targeting version ranges
- After updating: `pnpm install` to regenerate lockfile

## Shared tsconfig Pattern

### Base Config

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
    "skipLibCheck": true
  },
  "exclude": ["node_modules"]
}
```

### Framework Extension

```jsonc
// packages/ts-config/nextjs.json
{
  "extends": "./base.json",
  "compilerOptions": {
    "noEmit": true
  }
}
```

### App Consumption

```jsonc
// apps/my-app/tsconfig.json
{
  "extends": "@my-org/ts-config/nextjs.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

## Vulnerability Audit Workflow

### Running the Audit

```bash
# Production dependencies (highest priority)
pnpm audit --audit-level=high --prod

# All dependencies (includes dev -- supply chain risk)
pnpm audit
```

### Fix Methods

1. **Try parent bump first** -- check if upgrading the direct parent resolves the transitive vulnerability
2. **pnpm overrides** -- pin exact version in root `package.json` (for transitive deps)
3. **Direct bump** -- update the package version directly (for direct deps)

### Verification

```bash
pnpm install                                    # Regenerate lockfile
pnpm audit --audit-level=high                   # Should show 0 high/critical
pnpm turbo run build                            # Ensure nothing broke
pnpm turbo run test:ci --filter=<affected-apps> # Run tests
```

### Priority

| Severity | Dep Type | Action |
|----------|----------|--------|
| critical | production | Fix immediately |
| critical | devDependency | Fix within current sprint |
| high | production | Fix within current sprint |
| high | devDependency | Fix within current sprint |
| moderate | any | Batch into next audit |
| low | any | Batch into next audit |
