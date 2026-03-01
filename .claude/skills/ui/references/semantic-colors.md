# Semantic Color System

DaisyUI exposes CSS custom properties that map to semantic color roles. Use the corresponding Tailwind classes -- never reference the custom properties directly in component code.

## Base Colors (Surfaces and Text)

| Class               | CSS Variable           | Purpose                                     |
| ------------------- | ---------------------- | ------------------------------------------- |
| `bg-base-100`       | `--color-base-100`     | Primary background (page)                   |
| `bg-base-200`       | `--color-base-200`     | Slightly elevated surface (cards, sidebars) |
| `bg-base-300`       | `--color-base-300`     | Most elevated surface (inputs, wells)       |
| `text-base-content` | `--color-base-content` | Default text on base surfaces               |

## Brand / Action Colors

Each brand color has a main and a `-content` variant (text that contrasts on that color):

| Class                             | Purpose                               |
| --------------------------------- | ------------------------------------- |
| `bg-primary` / `text-primary`     | Primary brand, links, main actions    |
| `text-primary-content`            | Text on primary-colored backgrounds   |
| `bg-secondary` / `text-secondary` | Secondary brand, supporting actions   |
| `text-secondary-content`          | Text on secondary-colored backgrounds |
| `bg-accent` / `text-accent`       | Accent/highlight color                |
| `text-accent-content`             | Text on accent-colored backgrounds    |
| `bg-neutral` / `text-neutral`     | Neutral tone (headers, footers)       |
| `text-neutral-content`            | Text on neutral-colored backgrounds   |

## Status / Feedback Colors

| Class                         | Purpose                    |
| ----------------------------- | -------------------------- |
| `bg-info` / `text-info`       | Informational messages     |
| `bg-success` / `text-success` | Success states             |
| `bg-warning` / `text-warning` | Warning states             |
| `bg-error` / `text-error`     | Error/destructive states   |
| `text-info-content`           | Text on info background    |
| `text-success-content`        | Text on success background |
| `text-warning-content`        | Text on warning background |
| `text-error-content`          | Text on error background   |

## When to Use Each

| Scenario           | Classes                                                          |
| ------------------ | ---------------------------------------------------------------- |
| Page background    | `bg-base-100`                                                    |
| Card surface       | `bg-base-100 shadow-xl` or `bg-base-200`                         |
| Primary button     | `btn btn-primary`                                                |
| Destructive action | `btn btn-error`                                                  |
| Form input         | `input input-bordered`                                           |
| Status badge       | `badge badge-success`                                            |
| Alert banner       | `alert alert-warning`                                            |
| Navigation bar     | `navbar bg-base-100` or `navbar bg-neutral text-neutral-content` |

## Color Contrast Rule

When using DaisyUI semantic colors, always pair the background with its `-content` counterpart:

```tsx
// GOOD: Paired background + content
<div className="bg-primary text-primary-content" />
<div className="bg-neutral text-neutral-content" />

// BAD: Mismatched -- may not have sufficient contrast
<div className="bg-primary text-base-content" />
```
