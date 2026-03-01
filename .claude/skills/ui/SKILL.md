---
name: ui
description: Component styling, theming, and accessibility patterns. DaisyUI v5 + TailwindCSS v4 semantic color system, variant maps, responsive design, and ARIA/keyboard accessibility.
globs: ['**/shared-styles.css', '**/tailwind.config.*', '**/components/common/*', '**/packages/ui/**/*']
---

# UI — Styling, Components & Accessibility

How to build accessible, theme-aware components with DaisyUI v5 and TailwindCSS v4.

## Component Variant Maps

Use explicit `Record` maps for variant-to-class lookups -- never template literals like `` `btn-${variant}` ``. See [component-composition.md](references/component-composition.md).

## Semantic Color Classes

```tsx
// Surface colors
<div className="bg-base-100 text-base-content" />     // primary surface
<div className="bg-base-200" />                         // slightly elevated
<div className="bg-base-300" />                         // most elevated

// Brand action colors
<button className="btn btn-primary" />
<div className="bg-primary text-primary-content" />     // primary surface with contrast text

// Status colors
<div className="alert alert-success" />
<div className="alert alert-error" />
<span className="badge badge-info" />
```

## Responsive Breakpoints

```tsx
// TailwindCSS v4 mobile-first breakpoints
<div className="block md:flex" />                       // stack on mobile, flex on desktop
<div className="p-4 sm:p-6 md:p-8 lg:p-12" />          // responsive padding
<div className="hidden md:block" />                      // desktop only
<div className="block md:hidden" />                      // mobile only
```

## Anti-Patterns

```tsx
// BAD: Template literal for class variants
<button className={`btn btn-${variant}`} />
// GOOD: Explicit Record map
<button className={`btn ${variantClass[variant]}`} />

// BAD: Hardcoded hex for theme colors
<div className="bg-[#1d232a]" />
// GOOD: Semantic DaisyUI tokens
<div className="bg-base-100 text-base-content" />

// BAD: Mixing DaisyUI semantic + raw Tailwind colors
<div className="bg-base-100 text-gray-700" />
// GOOD: Stay within DaisyUI semantic system
<div className="bg-base-100 text-base-content" />
```

## Accessibility Essentials

- Use semantic HTML elements (`<button>`, `<nav>`, `<main>`, `<dialog>`) over generic `<div>`
- DaisyUI components provide built-in ARIA roles -- don't override them unless extending behavior
- All interactive elements must be keyboard-reachable (tab order) and have visible focus indicators
- Color is never the sole indicator of state -- combine with icons, text, or border changes
- Modals must trap focus and restore it on close

## DaisyUI Component Reference

| Component | Base Class | Key Variants |
|-----------|-----------|----------|
| Button | `btn` | `btn-primary`, `btn-secondary`, `btn-accent`, `btn-ghost`, `btn-link`, `btn-outline` |
| Card | `card` | `bg-base-100 shadow-xl`, `card-bordered`, `card-compact` |
| Badge | `badge` | `badge-primary`, `badge-info`, `badge-success`, `badge-warning`, `badge-error` |
| Alert | `alert` | `alert-info`, `alert-success`, `alert-warning`, `alert-error` |
| Modal | `modal` | Use `<dialog>` with `modal-box`, `modal-action` |
| Input | `input` | `input-bordered`, `input-primary`, `input-ghost` |
| Tabs | `tabs` | `tabs-boxed`, `tabs-bordered`, `tabs-lifted` |
| Loading | `loading` | `loading-spinner`, `loading-dots`, `loading-ring` |

## Design Thinking

Before building, establish intentional design direction:

- **Purpose & audience**: Who uses this interface? What problem does it solve? Let context drive choices.
- **Visual hierarchy**: Guide the eye with size, contrast, and placement. F-pattern for content-heavy pages, Z-pattern for landing pages.
- **Typography**: Limit to 2-3 typefaces. Pair a distinctive display font with a clean body font via `next/font`. Establish clear size/weight hierarchy.
- **Color**: Commit to a dominant color with sharp accents. Evenly-distributed palettes feel indecisive. Use DaisyUI semantic tokens as the foundation, accent sparingly with custom values.
- **White space**: Not empty -- essential for clarity. Generous spacing between sections reduces cognitive load and creates visual breathing room.

## Motion & Micro-Interactions

Add purposeful motion to guide users and provide feedback. Every animation should have a reason.

```tsx
<button className="btn btn-primary transition-all duration-200 ease-out hover:scale-105 hover:shadow-lg">
  Submit
</button>
```

- **Duration**: 150-300ms for micro-interactions, 200-500ms for transitions
- **Easing**: `ease-out` for entry, `ease-in` for exit, never `linear`
- **Performance**: Prefer `transform` and `opacity` (hardware-accelerated) over layout properties
- **Accessibility**: Always respect `prefers-reduced-motion` with `motion-reduce:` variants

## Theme Configuration

See [theming-system.md](references/theming-system.md) for `@plugin` config, `data-theme` switching, and dark mode.

## References

**Theming:** [theming-system](references/theming-system.md) · [semantic-colors](references/semantic-colors.md) · [component-composition](references/component-composition.md) · [monorepo-theming](references/monorepo-theming.md)

**Accessibility:** [aria-patterns](references/aria-patterns.md) · [keyboard-focus](references/keyboard-focus.md)

**Motion:** [micro-interactions](references/micro-interactions.md)
