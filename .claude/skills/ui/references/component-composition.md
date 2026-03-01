# Component Composition Patterns

Variant maps, component patterns, responsive design, and composing DaisyUI components.

## Variant Record Maps (Preferred)

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

## Card Pattern

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

## className Pass-Through Convention

All shared `@repo/ui` components accept an optional `className` prop that is appended to the component's base classes. This allows consumers to add layout utilities (margin, width) without overriding internal styling:

```tsx
// Consumer adds layout-level utility
<Card className="w-full max-w-md mx-auto" title="Settings">
  ...
</Card>
```

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

## DaisyUI Accessibility Defaults

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
