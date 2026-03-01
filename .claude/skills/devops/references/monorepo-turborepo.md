# Turborepo Task Configuration

turbo.json task definitions, pipelines, and workspace filtering.

## Development Tasks

```jsonc
{
  "tasks": {
    "dev": {
      "dependsOn": ["^build"],
      "inputs": ["$TURBO_DEFAULT$", ".env.local"],
      "cache": false,
      "persistent": true,
    },
  },
}
```

## Build Tasks

```jsonc
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "inputs": [
        "app/**",
        "components/**",
        "helpers/**",
        "hooks/**",
        "types/**",
        "middleware.ts",
        "next.config.js",
        ".env.local",
        "!*/**/*.test.tsx",
      ],
      "outputs": [".next/**", "!.next/cache/**"],
    },
  },
}
```

## Test Tasks

```jsonc
{
  "tasks": {
    "test": {
      "dependsOn": ["^build"],
      "cache": false,
      "persistent": true,
    },
    "test:ci": {
      "dependsOn": ["^build"],
    },
  },
}
```

## Lint Tasks

```jsonc
{
  "tasks": {
    "lint": {
      "dependsOn": ["^lint"],
      "inputs": ["app/**", "components/**", "helpers/**", "hooks/**", "types/**"],
    },
  },
}
```

## Caret (`^`) Notation

- `^build` means "run `build` in all **dependency** packages first"
- Without `^`, the task runs only in the current package
- `dependsOn: ["^build"]` on `dev` ensures shared packages are compiled before the app starts

## Input/Output Configuration

- **inputs**: Files that affect the task result. Changes invalidate the cache.
- **outputs**: Files the task produces. Stored/restored from cache.
- `$TURBO_DEFAULT$` matches Turborepo's default input set
- Exclude test files: `"!*/**/*.test.tsx"`
- Exclude cache from outputs: `"!.next/cache/**"`

## Workspace Filtering

```bash
pnpm turbo run dev --filter=my-app
pnpm turbo run build --filter=@my-org/ui
pnpm turbo run build --filter=my-app...
pnpm turbo run lint --filter=my-app --filter=@my-org/ui
```
