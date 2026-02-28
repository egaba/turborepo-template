# Syntax / Protocol Template Analysis

> **Source**: https://syntax.tailwindui.com (redirects to "CacheAdvance" — the Protocol documentation template by Tailwind UI)
> **Template Type**: Documentation / Developer-focused site
> **Framework**: Next.js with React Server Components, Tailwind CSS v4
> **Dark Mode**: Class-based (`dark:` prefix) with localStorage persistence + system detection

---

## 1. Component Inventory

### 1.1 Sticky Header / Navbar

**HTML Structure**:
```html
<header class="sticky top-0 z-50 flex flex-none flex-wrap items-center justify-between bg-white px-4 py-5 shadow-md shadow-slate-900/5 transition duration-500 sm:px-6 lg:px-8 dark:shadow-none dark:bg-transparent">
  <!-- Mobile hamburger (lg:hidden) -->
  <div class="mr-6 flex lg:hidden">
    <button type="button" class="relative" aria-label="Open navigation">
      <svg class="h-6 w-6 stroke-slate-500" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round">
        <path d="M4 7h16M4 12h16M4 17h16" />
      </svg>
    </button>
  </div>

  <!-- Logo -->
  <div class="relative flex grow basis-0 items-center">
    <a aria-label="Home page" href="/">
      <!-- Mobile logo: h-9 w-9 lg:hidden -->
      <!-- Desktop logo: hidden h-9 w-auto fill-slate-700 lg:block dark:fill-sky-100 -->
    </a>
  </div>

  <!-- Search button -->
  <div class="-my-5 mr-6 sm:mr-8 md:mr-0">
    <button class="group flex h-6 w-6 items-center justify-center sm:justify-start md:h-auto md:w-80 md:flex-none md:rounded-lg md:py-2.5 md:pr-3.5 md:pl-4 md:text-sm md:ring-1 md:ring-slate-200 md:hover:ring-slate-300 lg:w-96 dark:md:bg-slate-800/75 dark:md:ring-white/5 dark:md:ring-inset dark:md:hover:bg-slate-700/40 dark:md:hover:ring-slate-500">
      <svg class="h-5 w-5 flex-none fill-slate-400 group-hover:fill-slate-500 md:group-hover:fill-slate-400 dark:fill-slate-500" />
      <span class="sr-only md:not-sr-only md:ml-2 md:text-slate-500 md:dark:text-slate-400">Search docs</span>
      <kbd class="ml-auto hidden font-medium text-slate-400 md:block dark:text-slate-500">
        <kbd class="font-sans">Cmd</kbd><kbd class="font-sans">K</kbd>
      </kbd>
    </button>
  </div>

  <!-- Right actions: theme toggle + GitHub -->
  <div class="relative flex basis-0 justify-end gap-6 sm:gap-8 md:grow">
    <!-- Theme toggle (Headless UI Listbox) -->
    <!-- GitHub link -->
  </div>
</header>
```

**Key Patterns**:
- `sticky top-0 z-50` for persistent header
- Shadow only in light mode: `shadow-md shadow-slate-900/5 dark:shadow-none`
- Dark mode: transparent bg, `dark:bg-transparent`
- Search bar: icon-only on mobile, full bar at md breakpoint
- Keyboard shortcut badge with `<kbd>`

**Props**: `logo`, `searchPlaceholder`, `themeToggle`, `rightActions[]`

---

### 1.2 Hero Section (Dark Banner with Gradient Text)

**HTML Structure**:
```html
<div class="overflow-hidden bg-slate-900 dark:-mt-19 dark:-mb-32 dark:pt-19 dark:pb-32">
  <div class="py-16 sm:px-2 lg:relative lg:px-0 lg:py-20">
    <div class="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 lg:max-w-8xl lg:grid-cols-2 lg:px-8 xl:gap-x-16 xl:px-12">

      <!-- Left: Text content -->
      <div class="relative z-10 md:text-center lg:text-left">
        <!-- Background blur image -->
        <img class="absolute right-full bottom-full -mr-72 -mb-56 opacity-50" src="blur-cyan.png" />

        <div class="relative">
          <!-- Gradient heading -->
          <p class="inline bg-linear-to-r from-indigo-200 via-sky-400 to-indigo-200 bg-clip-text font-display text-5xl tracking-tight text-transparent">
            Never miss the cache again.
          </p>

          <!-- Subtitle -->
          <p class="mt-3 text-2xl tracking-tight text-slate-400">
            Cache every single thing your app could ever do...
          </p>

          <!-- CTA Buttons -->
          <div class="mt-8 flex gap-4 md:justify-center lg:justify-start">
            <a class="rounded-full bg-sky-300 py-2 px-4 text-sm font-semibold text-slate-900 hover:bg-sky-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300/50 active:bg-sky-500">
              Get started
            </a>
            <a class="rounded-full bg-slate-800 py-2 px-4 text-sm font-medium text-white hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 active:text-slate-400">
              View on GitHub
            </a>
          </div>
        </div>
      </div>

      <!-- Right: Code preview panel -->
      <div class="relative lg:static xl:pl-10">
        <!-- Grid line SVG decoration -->
        <!-- Code window with tabs -->
      </div>
    </div>
  </div>
</div>
```

**Key Patterns**:
- Dark bg: `bg-slate-900` always (hero is dark regardless of mode)
- Gradient text: `bg-linear-to-r from-indigo-200 via-sky-400 to-indigo-200 bg-clip-text text-transparent`
- Two CTA button styles: primary (sky-300) and secondary (slate-800)
- `rounded-full` pill buttons
- Decorative blur images positioned absolutely

**Props**: `heading`, `subheading`, `primaryCTA: {text, href}`, `secondaryCTA: {text, href}`, `codePreview`

---

### 1.3 Sidebar Navigation (Docs Nav)

**HTML Structure**:
```html
<div class="hidden lg:relative lg:block lg:flex-none">
  <!-- Light mode background fill -->
  <div class="absolute inset-y-0 right-0 w-[50vw] bg-slate-50 dark:hidden"></div>

  <!-- Dark mode decorative borders -->
  <div class="absolute top-16 right-0 bottom-0 hidden h-12 w-px bg-linear-to-t from-slate-800 dark:block"></div>
  <div class="absolute top-28 right-0 bottom-0 hidden w-px bg-slate-800 dark:block"></div>

  <!-- Scrollable sidebar -->
  <div class="sticky top-19 -ml-0.5 h-[calc(100vh-4.75rem)] w-64 overflow-x-hidden overflow-y-auto py-16 pr-8 pl-0.5 xl:w-72 xl:pr-16">
    <nav class="text-base lg:text-sm">
      <ul role="list" class="space-y-9">
        <li>
          <!-- Section heading -->
          <h2 class="font-display font-medium text-slate-900 dark:text-white">Introduction</h2>

          <!-- Section links with left border indicator -->
          <ul role="list" class="mt-2 space-y-2 border-l-2 border-slate-100 lg:mt-4 lg:space-y-4 lg:border-slate-200 dark:border-slate-800">
            <!-- Active item -->
            <li class="relative">
              <a class="block w-full pl-3.5 before:pointer-events-none before:absolute before:top-1/2 before:-left-1 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full font-semibold text-sky-500 before:bg-sky-500" href="/">
                Getting started
              </a>
            </li>
            <!-- Inactive item -->
            <li class="relative">
              <a class="block w-full pl-3.5 before:pointer-events-none before:absolute before:top-1/2 before:-left-1 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300" href="/docs/installation">
                Installation
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </div>
</div>
```

**Key Patterns**:
- Sticky sidebar: `sticky top-19 h-[calc(100vh-4.75rem)]`
- Fixed width: `w-64 xl:w-72`
- Active indicator: dot pseudo-element via `before:` classes (`before:bg-sky-500`)
- Inactive hover: `hover:text-slate-600 hover:before:block`
- Left border line: `border-l-2 border-slate-100 dark:border-slate-800`
- Section groups: `space-y-9` between groups, `space-y-2 lg:space-y-4` between items

**Props**: `sections: Array<{ title: string; links: Array<{ title: string; href: string; active?: boolean }> }>`

---

### 1.4 Quick Link Cards (Feature Grid)

**HTML Structure**:
```html
<div class="not-prose my-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
  <div class="group relative rounded-xl border border-slate-200 dark:border-slate-800">
    <!-- Hover gradient border overlay -->
    <div class="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 [background:linear-gradient(var(--quick-links-hover-bg,var(--color-sky-50)),var(--quick-links-hover-bg,var(--color-sky-50)))_padding-box,linear-gradient(to_top,var(--color-indigo-400),var(--color-cyan-400),var(--color-sky-500))_border-box] group-hover:opacity-100 dark:[--quick-links-hover-bg:var(--color-slate-800)]"></div>

    <div class="relative overflow-hidden rounded-xl p-6">
      <!-- Icon with gradient fill -->
      <svg class="h-8 w-8 [--icon-foreground:var(--color-slate-900)] [--icon-background:var(--color-white)]" viewBox="0 0 32 32" fill="none">
        <!-- SVG with radialGradient: sky-500, cyan-300, indigo-400 -->
      </svg>

      <!-- Clickable card title (entire card is clickable) -->
      <h2 class="mt-4 font-display text-base text-slate-900 dark:text-white">
        <a href="/">
          <span class="absolute -inset-px rounded-xl"></span>
          Installation
        </a>
      </h2>

      <p class="mt-1 text-sm text-slate-700 dark:text-slate-400">
        Step-by-step guides to setting up your system and installing the library.
      </p>
    </div>
  </div>
</div>
```

**Key Patterns**:
- `group` + `group-hover:opacity-100` for hover gradient border
- Gradient border: complex `[background:...]` with `padding-box` and `border-box`
- Full card clickable: `<span class="absolute -inset-px rounded-xl"></span>` inside `<a>`
- CSS custom properties for icon colors: `[--icon-foreground:...]`
- `not-prose` to escape Tailwind Typography

**Props**: `title`, `description`, `href`, `icon: ReactNode`

---

### 1.5 Callout / Alert Box

**Warning variant**:
```html
<div class="my-8 flex rounded-3xl p-6 bg-amber-50 dark:bg-slate-800/60 dark:ring-1 dark:ring-slate-300/10">
  <svg class="h-8 w-8 flex-none [--icon-foreground:var(--color-amber-900)] [--icon-background:var(--color-amber-100)]" />
  <div class="ml-4 flex-auto">
    <p class="not-prose font-display text-xl text-amber-900 dark:text-amber-500">
      Oh no! Something bad happened!
    </p>
    <div class="prose mt-2.5 text-amber-800 [--tw-prose-underline:var(--color-amber-400)] [--tw-prose-background:var(--color-amber-50)] prose-a:text-amber-900 prose-code:text-amber-900 dark:text-slate-300 dark:[--tw-prose-underline:var(--color-sky-700)] dark:prose-code:text-slate-300">
      <p>This is what a disclaimer message looks like...</p>
    </div>
  </div>
</div>
```

**Info variant**:
```html
<div class="my-8 flex rounded-3xl p-6 bg-sky-50 dark:bg-slate-800/60 dark:ring-1 dark:ring-slate-300/10">
  <svg class="h-8 w-8 flex-none [--icon-foreground:var(--color-slate-900)] [--icon-background:var(--color-white)]" />
  <div class="ml-4 flex-auto">
    <p class="not-prose font-display text-xl text-sky-900 dark:text-sky-400">
      You should know!
    </p>
    <div class="prose mt-2.5 text-sky-800 [--tw-prose-background:var(--color-sky-50)] prose-a:text-sky-900 prose-code:text-sky-900 dark:text-slate-300 dark:prose-code:text-slate-300">
      <p>This is what a disclaimer message looks like...</p>
    </div>
  </div>
</div>
```

**Key Patterns**:
- `rounded-3xl` for extra-rounded corners
- Dark mode: same bg (`slate-800/60`) for all variants + subtle ring `ring-slate-300/10`
- Icon + content flex layout with `ml-4 flex-auto`
- `not-prose` on title to escape typography plugin
- `prose` on body content for rich text formatting

**Props**: `variant: 'warning' | 'info' | 'danger'`, `title`, `children`

**Variant color mapping**:
| Variant | Light BG | Light Text | Dark Text | Icon FG | Icon BG |
|---------|----------|------------|-----------|---------|---------|
| Warning | amber-50 | amber-800 | amber-500 | amber-900 | amber-100 |
| Info | sky-50 | sky-800 | sky-400 | slate-900 | white |

---

### 1.6 Prose / Article Content Area

**HTML Structure**:
```html
<div class="max-w-2xl min-w-0 flex-auto px-4 py-16 lg:max-w-none lg:pr-0 lg:pl-8 xl:px-16">
  <article>
    <header class="mb-9 space-y-1">
      <p class="font-display text-sm font-medium text-sky-500">Introduction</p>
      <h1 class="font-display text-3xl tracking-tight text-slate-900 dark:text-white">Getting started</h1>
    </header>
    <div class="prose max-w-none prose-slate dark:text-slate-400 dark:prose-invert
      prose-headings:scroll-mt-28 prose-headings:font-display prose-headings:font-normal
      lg:prose-headings:scroll-mt-34
      prose-lead:text-slate-500 dark:prose-lead:text-slate-400
      prose-a:font-semibold dark:prose-a:text-sky-400
      dark:[--tw-prose-background:var(--color-slate-900)]
      prose-a:no-underline
      prose-a:shadow-[inset_0_-2px_0_0_var(--tw-prose-background,#fff),inset_0_calc(-1*(var(--tw-prose-underline-size,4px)+2px))_0_0_var(--tw-prose-underline,var(--color-sky-300))]
      prose-a:hover:[--tw-prose-underline-size:6px]
      dark:prose-a:shadow-[inset_0_calc(-1*var(--tw-prose-underline-size,2px))_0_0_var(--tw-prose-underline,var(--color-sky-800))]
      dark:prose-a:hover:[--tw-prose-underline-size:6px]
      prose-pre:rounded-xl prose-pre:bg-slate-900 prose-pre:shadow-lg
      dark:prose-pre:bg-slate-800/60 dark:prose-pre:shadow-none dark:prose-pre:ring-1 dark:prose-pre:ring-slate-300/10
      dark:prose-hr:border-slate-800">
      <!-- Markdown content renders here -->
    </div>
  </article>
</div>
```

**Key Patterns**:
- Section label + title: `font-display text-sm font-medium text-sky-500` + `text-3xl`
- Custom link underlines via `box-shadow` (not text-decoration) for animated underlines
- Code blocks: `prose-pre:rounded-xl prose-pre:bg-slate-900 prose-pre:shadow-lg`
- Scroll margin for header anchors: `prose-headings:scroll-mt-28`
- `max-w-none` overrides prose default width constraint
- `prose-slate` + `dark:prose-invert` for automatic dark mode

**Props**: `sectionLabel`, `title`, `content: ReactNode` (MDX)

---

### 1.7 Code Block with Syntax Highlighting

```html
<pre class="rounded-xl bg-slate-900 shadow-lg dark:bg-slate-800/60 dark:shadow-none dark:ring-1 dark:ring-slate-300/10">
  <code class="language-shell">npm install @tailwindlabs/cache-advance</code>
</pre>
```

**Key Patterns**:
- Always dark background
- Light mode: `bg-slate-900 shadow-lg`
- Dark mode: `bg-slate-800/60 ring-1 ring-slate-300/10` (lighter + ring border)
- Tab system in hero code block (tabbed code window)

---

### 1.8 Primary CTA Button (Pill)

```html
<a class="rounded-full bg-sky-300 py-2 px-4 text-sm font-semibold text-slate-900 hover:bg-sky-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300/50 active:bg-sky-500">
  Get started
</a>
```

### 1.9 Secondary CTA Button (Pill, Dark)

```html
<a class="rounded-full bg-slate-800 py-2 px-4 text-sm font-medium text-white hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 active:text-slate-400">
  View on GitHub
</a>
```

### 1.10 Theme Toggle

```html
<button class="flex h-6 w-6 items-center justify-center rounded-lg shadow-md ring-1 shadow-black/5 ring-black/5 dark:bg-slate-700 dark:ring-white/5 dark:ring-inset" aria-label="Theme">
  <!-- Sun icon (light mode) -->
  <!-- Moon icon (dark mode, hidden) -->
</button>
```

---

## 2. Theme Analysis

### 2.1 Color Palette

**Primary / Accent Colors**:
| Token | Hex | Usage |
|-------|-----|-------|
| sky-300 | #7dd3fc | Primary CTA bg |
| sky-400 | #38bdf8 | Gradient text, links, logo stroke |
| sky-500 | #0ea5e9 | Active nav indicator, active link text |
| cyan-400 | #22d3ee | Gradient hover border, gradient text |
| indigo-200 | #c7d2fe | Gradient text start/end |
| indigo-400 | #818cf8 | Gradient hover border |

**Neutral Colors (Slate)**:
| Token | Hex | Usage |
|-------|-----|-------|
| slate-50 | #f8fafc | Sidebar background (light) |
| slate-100 | #f1f5f9 | Sidebar border (light) |
| slate-200 | #e2e8f0 | Card borders, search ring |
| slate-300 | - | Inactive nav dot |
| slate-400 | #94a3b8 | Subtitle text, search text, icons |
| slate-500 | #64748b | Inactive nav text, hamburger icon |
| slate-700 | #334155 | Card description text (light), logo fill |
| slate-800 | #1e293b | Secondary button bg, dark mode borders, sidebar dark borders |
| slate-900 | #0f172a | Body/heading text (light), hero bg, code block bg |
| white | #ffffff | Body bg (light), headings (dark) |

**Alert Colors**:
| Variant | Light BG | Text | Heading |
|---------|----------|------|---------|
| Warning | amber-50 | amber-800 | amber-900 / dark:amber-500 |
| Info | sky-50 | sky-800 | sky-900 / dark:sky-400 |

**Dark Mode Overrides**:
- Background: `bg-white` -> `dark:bg-slate-900` (body)
- Cards/overlays: `dark:bg-slate-800/60` (semi-transparent)
- Text: `text-slate-900` -> `dark:text-white` (headings), `dark:text-slate-400` (body)
- Borders: `border-slate-200` -> `dark:border-slate-800`
- Ring borders: `dark:ring-1 dark:ring-slate-300/10`

### 2.2 Typography

**Font Families**:
- `font-display` (custom variable `__variable_f367f3`): Used for headings, nav section titles, display text — Lexend (woff2)
- `font-sans` (custom variable `__variable_b436a8`): Body text — Inter (woff2)

**Scale**:
| Class | Usage |
|-------|-------|
| `text-5xl tracking-tight` | Hero heading |
| `text-3xl tracking-tight` | Page title (h1) |
| `text-2xl tracking-tight` | Hero subtitle |
| `text-xl` | Callout title |
| `text-base` | Card title, sidebar nav text |
| `text-sm` | Card description, nav labels, buttons, kbd |

**Weights**:
| Class | Usage |
|-------|-------|
| `font-semibold` | Primary button, active nav link |
| `font-medium` | Section nav headings, secondary button, kbd |
| `font-normal` | Prose headings (via typography plugin) |

### 2.3 Spacing System

| Pattern | Value | Usage |
|---------|-------|-------|
| `py-16` | 4rem | Section vertical padding |
| `py-20` | 5rem | Hero padding (lg) |
| `px-4` | 1rem | Content horizontal padding |
| `px-8 / lg:px-8` | 2rem | Container padding |
| `xl:px-12` | 3rem | Container padding (xl) |
| `gap-6` | 1.5rem | Card grid gap |
| `gap-4` | 1rem | Button group gap |
| `gap-x-8` | 2rem | Hero grid column gap |
| `gap-y-16` | 4rem | Hero grid row gap (mobile) |
| `space-y-9` | 2.25rem | Nav section spacing |
| `space-y-2 / lg:space-y-4` | 0.5rem / 1rem | Nav item spacing |
| `my-12` | 3rem | Card grid vertical margin |
| `my-8` | 2rem | Callout vertical margin |
| `p-6` | 1.5rem | Card padding, callout padding |
| `mt-4` | 1rem | Card title top margin |
| `mt-1` | 0.25rem | Card description top margin |
| `mt-3` | 0.75rem | Hero subtitle top margin |
| `mt-8` | 2rem | CTA buttons top margin |
| `mb-9` | 2.25rem | Article header bottom margin |
| `ml-4` | 1rem | Callout content left margin |

### 2.4 Border Radius and Shadows

| Class | Usage |
|-------|-------|
| `rounded-full` | Pill buttons |
| `rounded-3xl` | Callout boxes |
| `rounded-xl` | Cards, code blocks |
| `rounded-lg` | Search bar (md), theme toggle |
| `shadow-lg` | Code blocks (light) |
| `shadow-md shadow-slate-900/5` | Header (light) |
| `shadow-md ring-1 shadow-black/5 ring-black/5` | Theme toggle (light) |

### 2.5 Dark Mode Implementation

- **Method**: Class-based (`dark:` prefix) with `next-themes` or custom script
- **Color scheme**: `style="color-scheme: light"` on `<html>` (updated dynamically)
- **Script**: Inline script in `<body>` reads `localStorage.getItem('theme')`, supports system preference
- **html classes**: `"h-full antialiased light"` (toggled to `"dark"`)
- **Pattern**: Dark mode uses same `slate` palette shifted darker:
  - `bg-white` -> `dark:bg-slate-900`
  - `bg-slate-50` -> `dark:hidden` (sidebar bg removed)
  - `bg-slate-900` (code) -> `dark:bg-slate-800/60`
  - Many elements gain `dark:ring-1 dark:ring-slate-300/10` for subtle borders

---

## 3. Layout Patterns

### 3.1 Overall Page Structure

```
<body class="flex min-h-full bg-white dark:bg-slate-900">
  <div class="flex w-full flex-col">
    <header> <!-- Sticky nav --> </header>
    <div> <!-- Hero (bg-slate-900) --> </div>
    <div class="relative mx-auto flex w-full max-w-8xl flex-auto justify-center sm:px-2 lg:px-8 xl:px-12">
      <aside> <!-- Left sidebar (w-64, xl:w-72) --> </aside>
      <main class="max-w-2xl min-w-0 flex-auto px-4 py-16 lg:max-w-none lg:pr-0 lg:pl-8 xl:px-16">
        <article> <!-- Content --> </article>
      </main>
      <aside> <!-- Right TOC sidebar --> </aside>
    </div>
  </div>
</body>
```

### 3.2 Max Widths

| Class | Usage |
|-------|-------|
| `max-w-8xl` | Main container (custom, likely 88rem) |
| `max-w-2xl` | Content area (mobile), hero text column |
| `max-w-none` | Content area at lg+ (fills available space) |

### 3.3 Grid Systems

- **Hero**: `grid grid-cols-1 lg:grid-cols-2` with `items-center`
- **Card grid**: `grid grid-cols-1 sm:grid-cols-2 gap-6`
- **Three-column layout**: Flex-based (sidebar + content + TOC), not CSS Grid

### 3.4 Responsive Breakpoints Used

| Breakpoint | Key Changes |
|-----------|-------------|
| `sm:` | Card grid 2-col, container padding |
| `md:` | Search bar expands, text alignment |
| `lg:` | Sidebar visible, hero 2-col, header padding |
| `xl:` | Wider sidebar, more padding |

---

## 4. Reusable Component Specs (Top 5)

### 4.1 Callout / Alert Component

```tsx
type CalloutVariant = 'info' | 'warning' | 'danger';

type CalloutProps = {
  variant: CalloutVariant;
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
};
```

**Tailwind classes by variant**:
```tsx
const variantStyles = {
  info: {
    container: 'bg-sky-50 dark:bg-slate-800/60 dark:ring-1 dark:ring-slate-300/10',
    title: 'text-sky-900 dark:text-sky-400',
    body: 'text-sky-800 prose-a:text-sky-900 prose-code:text-sky-900 dark:text-slate-300',
  },
  warning: {
    container: 'bg-amber-50 dark:bg-slate-800/60 dark:ring-1 dark:ring-slate-300/10',
    title: 'text-amber-900 dark:text-amber-500',
    body: 'text-amber-800 prose-a:text-amber-900 prose-code:text-amber-900 dark:text-slate-300',
  },
};
// Shared: my-8 flex rounded-3xl p-6
// Icon: h-8 w-8 flex-none
// Content wrapper: ml-4 flex-auto
// Title: not-prose font-display text-xl
// Body: prose mt-2.5
```

**DaisyUI mapping**: `bg-info/10`, `bg-warning/10`, `text-info-content`, `text-warning-content`

---

### 4.2 Quick Link / Feature Card

```tsx
type QuickLinkProps = {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
};
```

**Tailwind implementation**:
```tsx
// Container: group relative rounded-xl border border-slate-200 dark:border-slate-800
// Hover overlay: absolute -inset-px rounded-xl border-2 border-transparent opacity-0 group-hover:opacity-100
//   + gradient background for border effect
// Content: relative overflow-hidden rounded-xl p-6
// Icon: h-8 w-8
// Title: mt-4 font-display text-base text-slate-900 dark:text-white
// Link: absolute -inset-px rounded-xl (full card clickable)
// Description: mt-1 text-sm text-slate-700 dark:text-slate-400
```

**DaisyUI mapping**: `card card-bordered bg-base-100`, hover via `hover:border-primary`

**Responsive**: 1 column mobile, 2 columns at `sm:`

---

### 4.3 Sidebar Navigation

```tsx
type NavSection = {
  title: string;
  links: Array<{
    title: string;
    href: string;
  }>;
};

type SidebarNavProps = {
  sections: NavSection[];
  currentPath: string;
};
```

**Tailwind implementation**:
```tsx
// Wrapper: sticky top-[4.75rem] h-[calc(100vh-4.75rem)] w-64 overflow-y-auto py-16 pr-8 xl:w-72
// Nav: text-base lg:text-sm
// Section list: space-y-9
// Section title: font-display font-medium text-slate-900 dark:text-white
// Link list: mt-2 space-y-2 border-l-2 border-slate-100 lg:mt-4 lg:space-y-4 lg:border-slate-200 dark:border-slate-800
// Active link: pl-3.5 font-semibold text-sky-500 before:bg-sky-500
// Inactive link: pl-3.5 text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400
// Dot indicator: before:absolute before:top-1/2 before:-left-1 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full
```

**DaisyUI mapping**: `menu bg-base-200`, active via `menu-active`

---

### 4.4 Pill Button

```tsx
type ButtonVariant = 'primary' | 'secondary';

type PillButtonProps = {
  variant: ButtonVariant;
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
};
```

**Tailwind classes**:
```tsx
const buttonStyles = {
  base: 'rounded-full py-2 px-4 text-sm focus-visible:outline-2 focus-visible:outline-offset-2',
  primary: 'bg-sky-300 font-semibold text-slate-900 hover:bg-sky-200 focus-visible:outline-sky-300/50 active:bg-sky-500',
  secondary: 'bg-slate-800 font-medium text-white hover:bg-slate-700 focus-visible:outline-white/50 active:text-slate-400',
};
```

**DaisyUI mapping**: `btn btn-primary rounded-full`, `btn btn-neutral rounded-full`

---

### 4.5 Sticky Header with Search

```tsx
type HeaderProps = {
  logo: React.ReactNode;
  mobileLogo: React.ReactNode;
  searchPlaceholder?: string;
  onSearch?: () => void;
  rightActions?: React.ReactNode;
  onMobileMenuToggle?: () => void;
};
```

**Tailwind implementation**:
```tsx
// Header: sticky top-0 z-50 flex flex-none flex-wrap items-center justify-between
//   bg-white px-4 py-5 shadow-md shadow-slate-900/5 transition duration-500
//   sm:px-6 lg:px-8 dark:shadow-none dark:bg-transparent
// Mobile menu btn: relative (visible lg:hidden)
// Logo area: relative flex grow basis-0 items-center
// Search: group flex h-6 w-6 ... md:w-80 md:rounded-lg md:ring-1 md:ring-slate-200 lg:w-96
//   dark:md:bg-slate-800/75 dark:md:ring-white/5
// Right actions: relative flex basis-0 justify-end gap-6 sm:gap-8 md:grow
```

**DaisyUI mapping**: `navbar bg-base-100 shadow-sm sticky top-0 z-50`

---

## 5. Summary of Key Design Decisions

### What makes this template excellent:

1. **Minimal color palette**: Primarily slate + sky accent. Only 2-3 accent colors total.
2. **Dark mode as first-class**: Every component has dark mode variants. Dark mode uses `slate-800/60` with ring borders instead of solid backgrounds.
3. **Typography-driven design**: Heavy use of `@tailwindcss/typography` (`prose`) for content areas with extensive customization via prose modifiers.
4. **Subtle interactions**: Hover effects use `group` + `opacity` transitions, not color changes. Gradient border on card hover is premium.
5. **Accessibility**: `focus-visible` outlines on all interactive elements, `sr-only` labels, `aria-*` attributes.
6. **Custom font pairing**: Display font (Lexend) for headings, sans font (Inter) for body.
7. **CSS custom properties**: `[--icon-foreground:...]` pattern for theming SVG icons per-context.

### Patterns to reuse:
- Gradient text: `bg-linear-to-r bg-clip-text text-transparent`
- Hover gradient border: padding-box/border-box technique
- Dot indicator nav with `before:` pseudo-elements
- `rounded-3xl` for softer card variants (callouts)
- Semi-transparent dark backgrounds: `bg-slate-800/60`
- Inline ring borders in dark mode: `dark:ring-1 dark:ring-slate-300/10`
- Custom underline links via `box-shadow` inset
