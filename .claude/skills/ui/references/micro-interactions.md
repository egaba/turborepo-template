# Micro-Interactions & Motion

Guidelines for adding purposeful motion to UI components using CSS transitions and TailwindCSS utilities.

## Duration Guidelines

| Context | Duration | Tailwind Class |
|---------|----------|----------------|
| Micro-interactions (hover, focus) | 150-300ms | `duration-150` to `duration-300` |
| Standard transitions (expand, slide) | 200-500ms | `duration-200` to `duration-500` |
| Page-level animations (enter/exit) | 300-700ms | `duration-300` to `duration-700` |

Rule of thumb: a tenth of a second makes a big difference; half a second wrong feels jarring.

## Easing Curves

| Curve | Use For | Tailwind Class |
|-------|---------|----------------|
| **ease-out** | Elements entering the screen -- feels responsive | `ease-out` |
| **ease-in** | Elements leaving the screen -- natural exit | `ease-in` |
| **ease-in-out** | Elements changing state in place | `ease-in-out` |
| **spring/bounce** | Playful emphasis (use sparingly) | Custom `cubic-bezier` |

Linear motion feels robotic. Always use easing for natural feel.

## Common Patterns with Tailwind

### Hover Feedback

```tsx
<button className="btn btn-primary transition-all duration-200 ease-out hover:scale-105 hover:shadow-lg">
  Submit
</button>
```

### Fade In

```tsx
<div className="animate-in fade-in duration-300">
  {content}
</div>
```

### Staggered Reveal

Use `animation-delay` to create sequential entrance effects:

```tsx
{items.map((item, i) => (
  <div
    key={item.id}
    className="animate-in fade-in slide-in-from-bottom-4 duration-300"
    style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'backwards' }}
  >
    {item.content}
  </div>
))}
```

### Expand/Collapse

```tsx
<div
  className={`overflow-hidden transition-all duration-300 ease-in-out ${
    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
  }`}
>
  {children}
</div>
```

## Performance

Prefer hardware-accelerated properties that don't trigger layout recalculation:

| Safe (Composite Only) | Avoid (Triggers Layout) |
|----------------------|------------------------|
| `transform` (translate, scale, rotate) | `width`, `height` |
| `opacity` | `top`, `left`, `right`, `bottom` |
| `filter` | `margin`, `padding` |

Target 60fps. If animations cause frame drops, simplify or remove them.

## Accessibility: Reduced Motion

Always provide alternatives for users who prefer reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Or per-component with Tailwind:

```tsx
<div className="transition-transform duration-300 motion-reduce:transition-none motion-reduce:transform-none">
  {content}
</div>
```

## When to Add Motion

- **Do**: Button hover/press feedback, page transitions, loading state changes, element enter/exit, toast notifications
- **Don't**: Purely decorative animation with no purpose, motion that delays the user, animation on every element (visual noise)

Every animation should guide the user or provide feedback -- never just decoration.
