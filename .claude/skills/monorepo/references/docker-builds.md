# Docker Builds for Next.js Monorepos

Multi-stage Dockerfile patterns optimized for pnpm + Turborepo monorepos.

## Multi-Stage Dockerfile Architecture

### Stage 1: Base

Install system dependencies, pnpm, and turbo globally:

```dockerfile
# syntax=docker/dockerfile:1.4
FROM node:24-alpine AS base
WORKDIR /app

ARG APP_NAME
ARG PNPM_VERSION=10.20.0
ARG TURBO_VERSION=2.6.0
ARG CI=true

ENV PNPM_HOME="/root/.pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN apk add --no-cache libc6-compat

RUN corepack enable && \
    corepack prepare pnpm@$PNPM_VERSION --activate && \
    pnpm config set store-dir /root/.pnpm/store/v3 && \
    pnpm config set package-import-method copy && \
    pnpm config set auto-install-peers true && \
    pnpm config set prefer-offline true

RUN pnpm add -g turbo@$TURBO_VERSION
```

### Stage 2: Pruner

Use `turbo prune` to create a minimal Docker context containing only the target app and its workspace dependencies:

```dockerfile
FROM base AS pruner

COPY ./apps ./apps
COPY ./packages ./packages
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json .npmrc ./

RUN turbo prune --scope=$APP_NAME --docker
```

`turbo prune --docker` outputs two directories:
- `out/json/` -- package.json files only (for dependency install layer)
- `out/full/` -- full source code (for build layer)

This separation maximizes Docker layer caching -- dependencies only reinstall when package.json files change.

### Stage 3: Dependencies (Production Only)

Install only production dependencies for the runtime image:

```dockerfile
FROM base AS dependencies

COPY .gitignore ./.gitignore
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

RUN --mount=type=cache,id=pnpm-store,target=/root/.pnpm/store/v3 \
    pnpm install --prod --node-linker=hoisted --reporter=append-only
```

### Stage 4: Build

Full install (including devDependencies) plus turbo build with cache mounts:

```dockerfile
FROM base AS build

COPY .gitignore ./.gitignore
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=pruner /app/out/full/ .

RUN --mount=type=cache,id=pnpm-store,target=/root/.pnpm/store/v3 \
    pnpm install --reporter=append-only

RUN --mount=type=cache,id=turbo-cache,target=/app/.turbo \
    --mount=type=cache,id=next-cache,target=/app/apps/$APP_NAME/.next/cache \
    turbo build --filter=$APP_NAME... --cache-dir=/app/.turbo
```

### Stage 5a: Runtime - App Router (Standalone Output)

For Next.js apps using `output: 'standalone'` in `next.config.js`:

```dockerfile
FROM node:24-alpine AS runtime
ARG APP_NAME

ENV NODE_ENV=production
ENV PORT=3000

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

WORKDIR /app

# Standalone output includes a minimal server + only necessary node_modules
COPY --from=build --chown=nextjs:nodejs /app/apps/$APP_NAME/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/apps/$APP_NAME/.next/static ./apps/$APP_NAME/.next/static
COPY --from=build --chown=nextjs:nodejs /app/apps/$APP_NAME/public ./apps/$APP_NAME/public

WORKDIR /app/apps/$APP_NAME
EXPOSE $PORT
CMD node server
```

### Stage 5b: Runtime - Legacy/Pages Router (Full Copy)

For apps without standalone output (e.g., custom servers):

```dockerfile
FROM node:24-alpine AS runtime-legacy
ARG APP_NAME

ENV NODE_ENV=production
ENV PORT=3000

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

WORKDIR /app/apps/$APP_NAME

COPY --from=build /app/apps/$APP_NAME/next.config.js ./
COPY --from=build /app/apps/$APP_NAME/package.json ./
COPY --from=build --chown=nextjs:nodejs /app/apps/$APP_NAME/.next ./.next
COPY --from=build --chown=nextjs:nodejs /app/apps/$APP_NAME/public ./public
COPY --from=build --chown=nextjs:nodejs /app/apps/$APP_NAME/server ./server
COPY --from=build --chown=nextjs:nodejs /app/apps/$APP_NAME/config ./config

# Need full node_modules since no standalone output
COPY --from=dependencies --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=dependencies --chown=nextjs:nodejs /app/apps/$APP_NAME/node_modules ./node_modules

EXPOSE $PORT
CMD node server
```

## BuildKit Cache Mounts

Three cache mounts for maximum build speed:

| Cache ID | Target | Purpose |
|----------|--------|---------|
| `pnpm-store` | `/root/.pnpm/store/v3` | Shared pnpm package cache (persistent across builds) |
| `turbo-cache` | `/app/.turbo` | Turborepo incremental build cache |
| `next-cache` | `/app/apps/$APP_NAME/.next/cache` | Next.js incremental compilation cache |

```dockerfile
RUN --mount=type=cache,id=pnpm-store,target=/root/.pnpm/store/v3 \
    --mount=type=cache,id=turbo-cache,target=/app/.turbo \
    --mount=type=cache,id=next-cache,target=/app/apps/$APP_NAME/.next/cache \
    turbo build --filter=$APP_NAME...
```

## Performance Optimizations

### turbo prune --docker

Creates minimal Docker context. Without it, COPY of the full monorepo invalidates caches on any file change. With it, dependency install only reruns when package.json changes.

### GHA Cache Backend

For CI/CD, use GitHub Actions cache:

```bash
docker buildx build \
  --cache-from type=gha \
  --cache-to type=gha,mode=max \
  --build-arg APP_NAME=my-app \
  --platform linux/amd64 \
  -t my-app:latest .
```

### Platform Targeting

Always specify platform for deterministic builds:

```bash
docker buildx build --platform linux/amd64 ...
```

## Security

- **Non-root user**: Create a `nextjs` user with UID 1001 and run the app as that user
- **Minimal runtime**: Alpine base, standalone output includes only necessary files
- **No dev dependencies in runtime**: Separate `dependencies` stage installs `--prod` only

## Standalone vs Traditional Deployment

| Feature | Standalone (`output: 'standalone'`) | Traditional (Full Copy) |
|---------|-------------------------------------|------------------------|
| Image size | Small (minimal node_modules) | Large (full node_modules) |
| Server | Built-in minimal server | Custom `server/` directory |
| Static files | Must copy `.next/static` + `public` separately | Included in `.next` |
| Use when | App Router apps, standard Next.js | Custom server, legacy Pages Router |
| Config | `next.config.js`: `output: 'standalone'` | No special config |

## ARG/ENV Patterns

```dockerfile
# Build-time configurable
ARG APP_NAME                    # Which app to build (required)
ARG PNPM_VERSION=10.20.0       # Pin tool versions
ARG TURBO_VERSION=2.6.0
ARG CI=true                     # Optimize for CI behavior
ARG ASSET_HOST_PREFIX           # CDN prefix for static assets

# Runtime environment
ENV NODE_ENV=production
ENV PORT=3000
ENV ASSET_HOST_PREFIX=$ASSET_HOST_PREFIX
```
