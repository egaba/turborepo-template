# Theme System

Theme configuration, CSS variables, and dark mode for DaisyUI v5 + TailwindCSS v4.

## Built-in Themes

DaisyUI v5 ships with built-in themes including `light`, `dark`, `cupcake`, `cyberpunk`, `retro`, and many more. Configure which themes are available via the CSS plugin directive:

```css
@import 'tailwindcss';
@plugin "daisyui" {
  themes:
    light --default,
    dark --prefersdark;
}
```

| Directive       | Purpose                                         |
| --------------- | ----------------------------------------------- |
| `--default`     | Applied on initial page load                    |
| `--prefersdark` | Auto-activates when user's OS prefers dark mode |

## Activating Themes at Runtime

Set `data-theme` on the root `<html>` element:

```html
<html data-theme="dark"></html>
```

In React/Next.js, use `document.documentElement.setAttribute('data-theme', theme)`.

## Custom Themes

Define custom themes by extending the plugin configuration:

```css
@import 'tailwindcss';
@plugin "daisyui" {
  themes:
    light --default,
    dark --prefersdark,
    mytheme;
}

[data-theme='mytheme'] {
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
  themes:
    light --default,
    dark --prefersdark;
}
```

The `--prefersdark` flag on the `dark` theme means:

- If no `data-theme` is set, dark mode activates automatically when the OS prefers it
- When `data-theme` is explicitly set (by ThemeToggle), it overrides the auto behavior
