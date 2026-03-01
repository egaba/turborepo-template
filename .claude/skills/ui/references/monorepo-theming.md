# Monorepo Theme Sharing

Sharing themes and design tokens across monorepo apps.

## Extending DaisyUI with Custom Utilities

Add project-specific utilities in `shared-styles.css` after the DaisyUI plugin:

```css
@import 'tailwindcss';
@plugin "daisyui" {
  themes:
    light --default,
    dark --prefersdark;
}

/* Custom utilities */
@utility text-balance {
  text-wrap: balance;
}

@utility scrollbar-hidden {
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}
```

For repeated multi-class patterns, define custom components in CSS:

```css
@layer components {
  .card-elevated {
    @apply card bg-base-100 shadow-xl;
  }
  .section-container {
    @apply mx-auto max-w-7xl px-4 sm:px-6 lg:px-8;
  }
}
```

Use sparingly -- prefer composing Tailwind/DaisyUI classes directly in JSX for most cases.

## Package Structure

```
packages/
  tailwind-config/
    shared-styles.css     # @import "tailwindcss" + DaisyUI plugin config
    package.json          # exports shared-styles.css
  ui/
    src/
      button.tsx          # shared components using DaisyUI classes
      card.tsx
      theme-toggle.tsx
    package.json          # depends on @repo/tailwind-config
```

## How Apps Consume the Shared Config

Each app imports the shared stylesheet in its root CSS file:

```css
/* apps/web/app/globals.css */
@import '@repo/tailwind-config/shared-styles.css';

/* App-specific overrides or additions below */
```

This ensures all apps share the same DaisyUI theme configuration and custom utilities.

## Shared UI Components

The `@repo/ui` package exports components that use DaisyUI classes:

```tsx
// apps/web/app/page.tsx
import { Button, Card, ThemeToggle } from '@repo/ui'

export default function Page() {
  return (
    <Card title="Welcome">
      <p className="text-base-content/70">Get started by editing this page.</p>
      <div className="card-actions justify-end">
        <Button variant="primary">Get Started</Button>
      </div>
      <ThemeToggle />
    </Card>
  )
}
```
