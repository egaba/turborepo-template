# DaisyUI + TailwindCSS Theming Patterns

Architecture and patterns for building a design system with DaisyUI v5 and TailwindCSS v4.

## Theme System

### Built-in Themes

DaisyUI v5 ships with built-in themes including `light`, `dark`, `cupcake`, `cyberpunk`, `retro`, and many more. Configure which themes are available via the CSS plugin directive:

```css
@import "tailwindcss";
@plugin "daisyui" {
  themes: light --default, dark --prefersdark;
}
```

| Directive | Purpose |
|-----------|---------|
| `--default` | Applied on initial page load |
| `--prefersdark` | Auto-activates when user's OS prefers dark mode |

### Activating Themes at Runtime

Set `data-theme` on the root `<html>` element:

```html
<html data-theme="dark">
```

In React/Next.js, use `document.documentElement.setAttribute('data-theme', theme)`.

### Custom Themes

Define custom themes by extending the plugin configuration:

```css
@import "tailwindcss";
@plugin "daisyui" {
  themes: light --default, dark --prefersdark, mytheme;
}

[data-theme="mytheme"] {
  --color-base-100: oklch(98% 0.02 240);
  --color-base-200: oklch(95% 0.02 240);
  --color-base-300: oklch(90% 0.02 240);
  --color-base-content: oklch(20% 0.02 240);
  --color-primary: oklch(55% 0.25 260);
  --color-primary-content: oklch(98% 0.02 260);
  --color-secondary: oklch(65% 0.15 330);
  --color-secondary-content: oklch(98% 0.02 330);
  --color-accent: oklch(70% 0.18 150);
  --color-accent-content: oklch(20% 0.02 150);
  --color-neutral: oklch(30% 0.02 240);
  --color-neutral-content: oklch(90% 0.02 240);
  --rounded-btn: 0.5rem;
  --rounded-box: 1rem;
}
```

---

## Semantic Color System

DaisyUI exposes CSS custom properties that map to semantic color roles. Use the corresponding Tailwind classes -- never reference the custom properties directly in component code.

### Base Colors (Surfaces and Text)

| Class | CSS Variable | Purpose |
|-------|-------------|---------|
| `bg-base-100` | `--color-base-100` | Primary background (page) |
| `bg-base-200` | `--color-base-200` | Slightly elevated surface (cards, sidebars) |
| `bg-base-300` | `--color-base-300` | Most elevated surface (inputs, wells) |
| `text-base-content` | `--color-base-content` | Default text on base surfaces |

### Brand / Action Colors

Each brand color has a main and a `-content` variant (text that contrasts on that color):

| Class | Purpose |
|-------|---------|
| `bg-primary` / `text-primary` | Primary brand, links, main actions |
| `text-primary-content` | Text on primary-colored backgrounds |
| `bg-secondary` / `text-secondary` | Secondary brand, supporting actions |
| `text-secondary-content` | Text on secondary-colored backgrounds |
| `bg-accent` / `text-accent` | Accent/highlight color |
| `text-accent-content` | Text on accent-colored backgrounds |
| `bg-neutral` / `text-neutral` | Neutral tone (headers, footers) |
| `text-neutral-content` | Text on neutral-colored backgrounds |

### Status / Feedback Colors

| Class | Purpose |
|-------|---------|
| `bg-info` / `text-info` | Informational messages |
| `bg-success` / `text-success` | Success states |
| `bg-warning` / `text-warning` | Warning states |
| `bg-error` / `text-error` | Error/destructive states |
| `text-info-content` | Text on info background |
| `text-success-content` | Text on success background |
| `text-warning-content` | Text on warning background |
| `text-error-content` | Text on error background |

### When to Use Each

| Scenario | Classes |
|----------|---------|
| Page background | `bg-base-100` |
| Card surface | `bg-base-100 shadow-xl` or `bg-base-200` |
| Primary button | `btn btn-primary` |
| Destructive action | `btn btn-error` |
| Form input | `input input-bordered` |
| Status badge | `badge badge-success` |
| Alert banner | `alert alert-warning` |
| Navigation bar | `navbar bg-base-100` or `navbar bg-neutral text-neutral-content` |

---

## Light / Dark Mode Implementation

### ThemeToggle Pattern

The shared `@repo/ui` package provides a `ThemeToggle` component:

```tsx
'use client'

import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    const saved = localStorage.getItem('theme') as Theme | null
    const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
    const initial = saved ?? preferred
    setTheme(initial)
    document.documentElement.setAttribute('data-theme', initial)
  }, [])

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    localStorage.setItem('theme', next)
    document.documentElement.setAttribute('data-theme', next)
  }

  return (
    <label className="swap swap-rotate">
      <input
        type="checkbox"
        checked={theme === 'dark'}
        onChange={toggleTheme}
        aria-label="Toggle theme"
      />
      {/* Sun icon for light mode */}
      <svg className="swap-off h-6 w-6 fill-current" ... />
      {/* Moon icon for dark mode */}
      <svg className="swap-on h-6 w-6 fill-current" ... />
    </label>
  )
}
```

**Key implementation details:**
- Uses `localStorage` to persist user preference
- Falls back to `prefers-color-scheme` media query on first visit
- Sets `data-theme` attribute on `<html>` for DaisyUI theme switching
- The `swap` DaisyUI component handles icon toggle animation
- Marked `'use client'` since it uses browser APIs

### CSS Configuration for Auto Dark Mode

```css
@plugin "daisyui" {
  themes: light --default, dark --prefersdark;
}
```

The `--prefersdark` flag on the `dark` theme means:
- If no `data-theme` is set, dark mode activates automatically when the OS prefers it
- When `data-theme` is explicitly set (by ThemeToggle), it overrides the auto behavior

---

## Component Composition Patterns

### Variant Record Maps (Preferred)

Always use explicit `Record` objects for mapping prop values to class names:

```tsx
type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'ghost'
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg'

const variantClass: Record<ButtonVariant, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  accent: 'btn-accent',
  ghost: 'btn-ghost',
}

const sizeClass: Record<ButtonSize, string> = {
  xs: 'btn-xs',
  sm: 'btn-sm',
  md: 'btn-md',
  lg: 'btn-lg',
}

export function Button({ variant = 'primary', size = 'md', className = '', ...props }) {
  return (
    <button
      className={`btn ${variantClass[variant]} ${sizeClass[size]} ${className}`.trim()}
      {...props}
    />
  )
}
```

**Why not template literals?**
- `btn-${variant}` is not type-safe -- typos compile but produce broken classes
- Tailwind's class detection cannot statically analyze template literals for purging
- Explicit maps are searchable, refactorable, and self-documenting

### Card Pattern

```tsx
type CardProps = Readonly<{
  children: ReactNode
  title?: string
  className?: string
}>

export function Card({ children, title, className = '' }: CardProps) {
  return (
    <div className={`card bg-base-100 shadow-xl ${className}`.trim()}>
      <div className="card-body">
        {title && <h2 className="card-title">{title}</h2>}
        {children}
      </div>
    </div>
  )
}
```

### className Pass-Through Convention

All shared `@repo/ui` components accept an optional `className` prop that is appended to the component's base classes. This allows consumers to add layout utilities (margin, width) without overriding internal styling:

```tsx
// Consumer adds layout-level utility
<Card className="w-full max-w-md mx-auto" title="Settings">
  ...
</Card>
```

---

## Extending DaisyUI with Custom Tailwind Utilities

### Custom Utilities via CSS

Add project-specific utilities in `shared-styles.css` after the DaisyUI plugin:

```css
@import "tailwindcss";
@plugin "daisyui" {
  themes: light --default, dark --prefersdark;
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

### Custom Component Classes

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

---

## Monorepo Theme Sharing

### Package Structure

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

### How Apps Consume the Shared Config

Each app imports the shared stylesheet in its root CSS file:

```css
/* apps/web/app/globals.css */
@import "@repo/tailwind-config/shared-styles.css";

/* App-specific overrides or additions below */
```

This ensures all apps share the same DaisyUI theme configuration and custom utilities.

### Shared UI Components

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

---

## Responsive Design

### TailwindCSS v4 Breakpoints

| Prefix | Min Width | Description |
|--------|----------|-------------|
| *(none)* | 0px | Mobile (default) |
| `sm:` | 640px | Small tablets |
| `md:` | 768px | Tablets / small desktop |
| `lg:` | 1024px | Desktop |
| `xl:` | 1280px | Large desktop |
| `2xl:` | 1536px | Extra large |

### Common Responsive Patterns

```tsx
// Responsive grid
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" />

// Responsive padding
<div className="p-4 sm:p-6 md:p-8 lg:p-12" />

// Show/hide
<div className="hidden md:block" />    // Desktop only
<div className="block md:hidden" />     // Mobile only

// Responsive text
<h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold" />

// Responsive flex direction
<div className="flex flex-col md:flex-row gap-4" />
```

### Container Queries (TailwindCSS v4)

For component-level responsiveness:

```tsx
<div className="@container">
  <div className="flex flex-col @md:flex-row gap-4">
    ...
  </div>
</div>
```

---

## Accessibility Considerations

### DaisyUI Accessibility Defaults

- **Focus states**: DaisyUI components include visible focus rings by default (`:focus-visible` outline)
- **Color contrast**: Built-in themes meet WCAG 2.1 AA contrast ratios for `-content` color pairs
- **Semantic markup**: Use DaisyUI's recommended HTML structure (e.g., `<dialog>` for modals, `<label>` for swap)

### Additional Patterns

```tsx
// Always provide aria-label for icon-only buttons
<button className="btn btn-ghost btn-circle" aria-label="Open menu">
  <svg ... />
</button>

// Use semantic alert roles
<div className="alert alert-error" role="alert">
  <span>Error: Something went wrong</span>
</div>

// Toggle accessibility
<label className="swap swap-rotate">
  <input type="checkbox" aria-label="Toggle theme" />
  ...
</label>
```

### Color Contrast Rule

When using DaisyUI semantic colors, always pair the background with its `-content` counterpart:

```tsx
// GOOD: Paired background + content
<div className="bg-primary text-primary-content" />
<div className="bg-neutral text-neutral-content" />

// BAD: Mismatched -- may not have sufficient contrast
<div className="bg-primary text-base-content" />
```
