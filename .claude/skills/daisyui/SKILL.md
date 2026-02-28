---
name: daisyui
description: DaisyUI v5 + TailwindCSS v4 component and styling patterns. Semantic color system, theme configuration, responsive design, component composition.
globs: ['**/shared-styles.css', '**/tailwind.config.*', '**/components/common/*', '**/packages/ui/**/*']
---

# DaisyUI v5 + TailwindCSS v4 Patterns

Patterns for building and consuming a design system with DaisyUI v5 and TailwindCSS v4.

## Quick Patterns

### Component Variant Maps (Preferred)

Use explicit `Record` maps for variant-to-class lookups -- never template literals:

```tsx
type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'ghost'

const variantClass: Record<ButtonVariant, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  accent: 'btn-accent',
  ghost: 'btn-ghost',
}

// Usage
<button className={`btn ${variantClass[variant]} ${className}`} />
```

### Semantic Color Classes

```tsx
// Surface colors -- use DaisyUI semantic tokens
<div className="bg-base-100 text-base-content" />     // primary surface
<div className="bg-base-200" />                         // slightly elevated
<div className="bg-base-300" />                         // most elevated

// Brand action colors
<button className="btn btn-primary" />                  // primary action
<span className="text-primary" />                       // primary-colored text
<div className="bg-primary text-primary-content" />     // primary surface with contrast text

// Status colors
<div className="alert alert-success" />
<div className="alert alert-warning" />
<div className="alert alert-error" />
<span className="badge badge-info" />
```

### Responsive Breakpoints

```tsx
// TailwindCSS v4 mobile-first breakpoints
<div className="block md:flex" />                       // stack on mobile, flex on desktop
<div className="p-4 sm:p-6 md:p-8 lg:p-12" />          // responsive padding
<div className="hidden md:block" />                      // desktop only
<div className="block md:hidden" />                      // mobile only
<div className="text-sm md:text-base lg:text-lg" />     // responsive typography
```

## Anti-Patterns

```tsx
// BAD: Template literal for class variants (not type-safe, hard to search)
<button className={`btn btn-${variant}`} />
// GOOD: Explicit Record map
const variantClass: Record<ButtonVariant, string> = { primary: 'btn-primary', ... }
<button className={`btn ${variantClass[variant]}`} />

// BAD: Hardcoded hex for theme colors
<div className="bg-[#1d232a] text-[#a6adba]" />
// GOOD: Semantic DaisyUI tokens
<div className="bg-base-100 text-base-content" />

// BAD: Inline style objects for things Tailwind handles
<div style={{ display: 'flex', gap: '8px', padding: '16px' }} />
// GOOD: Tailwind utility classes
<div className="flex gap-2 p-4" />

// BAD: Mixing DaisyUI semantic + raw Tailwind colors inconsistently
<div className="bg-base-100 text-gray-700" />
// GOOD: Stay within DaisyUI semantic system for theme-aware colors
<div className="bg-base-100 text-base-content" />
```

## DaisyUI Component Classes

| Component | Base Class | Variants |
|-----------|-----------|----------|
| Button | `btn` | `btn-primary`, `btn-secondary`, `btn-accent`, `btn-ghost`, `btn-link`, `btn-outline` |
| Card | `card` | `bg-base-100 shadow-xl`, `card-bordered`, `card-compact` |
| Badge | `badge` | `badge-primary`, `badge-secondary`, `badge-accent`, `badge-info`, `badge-success`, `badge-warning`, `badge-error` |
| Alert | `alert` | `alert-info`, `alert-success`, `alert-warning`, `alert-error` |
| Modal | `modal` | Use `<dialog>` element with `modal-box`, `modal-action` |
| Drawer | `drawer` | `drawer-toggle`, `drawer-content`, `drawer-side` |
| Navbar | `navbar` | `navbar-start`, `navbar-center`, `navbar-end` |
| Input | `input` | `input-bordered`, `input-primary`, `input-ghost` |
| Select | `select` | `select-bordered`, `select-primary` |
| Toggle | `toggle` | `toggle-primary`, `toggle-secondary` |
| Tabs | `tabs` | `tabs-boxed`, `tabs-bordered`, `tabs-lifted` |
| Swap | `swap` | `swap-rotate`, `swap-flip` |
| Loading | `loading` | `loading-spinner`, `loading-dots`, `loading-ring`, `loading-ball` |

## Theme Configuration

Theme is configured in the shared CSS entry point (`shared-styles.css`):

```css
@import "tailwindcss";
@plugin "daisyui" {
  themes: light --default, dark --prefersdark;
}
```

- `--default` marks the default theme applied on page load
- `--prefersdark` auto-activates when `prefers-color-scheme: dark` matches
- Switch themes at runtime by setting `data-theme` on `<html>`

## Reference

See **[theming-patterns.md](references/theming-patterns.md)** for the full design system architecture: theme system, semantic colors, dark mode implementation, component composition, and monorepo patterns.
