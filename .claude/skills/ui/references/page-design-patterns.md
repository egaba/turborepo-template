# Page Design Patterns

Visual design guidance for generating distinctive, intentional pages using DaisyUI + TailwindCSS v4. Complements component-level patterns in [component-composition.md](component-composition.md) and motion in [micro-interactions.md](micro-interactions.md).

## Design Direction

Before writing markup, establish intent. Generic pages come from skipping this step.

**Ask first:**

- Who is the audience and what are they trying to do?
- What is the visual tone? (Clean/professional, bold/energetic, warm/approachable, minimal/editorial)
- What is the single most important element on the page?

Then commit to that direction with every choice — typography, spacing, color weight, layout.

## Typography System

Use `next/font` to load a distinctive display font paired with a clean body font. Avoid defaulting to system fonts or Inter for everything.

```tsx
import { Outfit, Merriweather } from 'next/font/google'

const display = Outfit({ subsets: ['latin'], variable: '--font-display' })
const body = Merriweather({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '700'],
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

```css
/* In your global CSS or tailwind config */
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: var(--font-display);
}
body {
  font-family: var(--font-body);
}
```

**Type scale hierarchy:**

| Element          | Classes                                      | Purpose              |
| ---------------- | -------------------------------------------- | -------------------- |
| Page title       | `text-4xl sm:text-5xl lg:text-6xl font-bold` | Dominant, anchor     |
| Section heading  | `text-2xl sm:text-3xl font-semibold`         | Structure, scannable |
| Card title       | `text-lg font-semibold`                      | Local emphasis       |
| Body text        | `text-base leading-relaxed`                  | Readability          |
| Caption/metadata | `text-sm text-base-content/60`               | Secondary info       |

Use no more than 3-4 distinct sizes per page. Restraint creates hierarchy; too many sizes create noise.

## Page Archetypes

### Landing / Marketing

F-pattern or Z-pattern layout. Hero section dominates above the fold.

```tsx
<main>
  {/* Hero — full-width, generous vertical padding */}
  <section className="hero bg-base-200 min-h-[70vh]">
    <div className="hero-content max-w-4xl text-center">
      <div>
        <h1 className="text-5xl font-bold lg:text-6xl">Headline</h1>
        <p className="text-base-content/70 mt-6 text-lg leading-relaxed">
          Supporting copy — one or two sentences max.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button className="btn btn-primary btn-lg">Primary CTA</button>
          <button className="btn btn-ghost btn-lg">Secondary</button>
        </div>
      </div>
    </div>
  </section>

  {/* Feature grid — asymmetric emphasis */}
  <section className="mx-auto max-w-6xl px-4 py-20">
    <div className="grid gap-8 md:grid-cols-3">
      {/* First card larger for visual hierarchy */}
      <div className="card bg-base-100 shadow-xl md:col-span-2">...</div>
      <div className="card bg-base-100 shadow-xl">...</div>
    </div>
  </section>
</main>
```

### Dashboard / App

Dense information, clear visual zones, predictable navigation.

```tsx
<div className="flex min-h-screen">
  <aside className="bg-base-200 w-64 p-4">{/* Nav */}</aside>
  <main className="flex-1 p-6 lg:p-8">
    {/* Stats row — equal weight */}
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div className="stat bg-base-100 rounded-box shadow">...</div>
    </div>

    {/* Content area — primary + secondary zones */}
    <div className="mt-8 grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">{/* Primary content */}</div>
      <div>{/* Sidebar/secondary */}</div>
    </div>
  </main>
</div>
```

### Content / Article

Narrow column, generous whitespace, typography-forward.

```tsx
<article className="prose prose-lg mx-auto max-w-2xl px-4 py-16">
  <h1>Article Title</h1>
  <p className="lead text-base-content/70">Subtitle or summary.</p>
  {/* Content flows naturally via prose plugin */}
</article>
```

## Spatial Composition

### Asymmetry Creates Interest

Evenly spaced, evenly sized grids feel flat. Break symmetry intentionally:

```tsx
{
  /* 2:1 ratio instead of 1:1 */
}
;<div className="grid gap-6 md:grid-cols-3">
  <div className="md:col-span-2">...</div>
  <div>...</div>
</div>

{
  /* Offset vertical rhythm */
}
;<div className="grid gap-6 md:grid-cols-2">
  <div className="md:mt-12">...</div>
  <div>...</div>
</div>
```

### Generous Whitespace

Whitespace is structure, not emptiness. Sections need breathing room:

```tsx
{
  /* Section-level spacing: py-16 to py-24 between major sections */
}
;<section className="py-20">...</section>

{
  /* Component-level: gap-6 to gap-8 between cards */
}
;<div className="grid gap-8">...</div>

{
  /* Text-level: leading-relaxed for body, mt-6 between paragraphs */
}
;<p className="mt-6 leading-relaxed">...</p>
```

### Visual Weight Distribution

Guide the eye by concentrating visual weight (size, color, contrast) on the most important element:

- **One dominant element** per viewport — the hero headline, the primary stat, the main CTA
- **Supporting elements** at lower contrast — `text-base-content/60` or `text-base-content/70`
- **Negative space** around the dominant element amplifies its importance

## Atmospheric Details

Elevate pages beyond flat cards-on-white using DaisyUI tokens:

### Gradient Overlays

```tsx
{
  /* Subtle gradient on hero */
}
;<section className="bg-base-200 relative">
  <div className="from-primary/5 absolute inset-0 bg-gradient-to-b to-transparent" />
  <div className="relative z-10">...</div>
</section>
```

### Layered Depth

```tsx
{
  /* Card with subtle border + shadow for depth */
}
;<div className="card bg-base-100 ring-base-content/5 shadow-xl ring-1">...</div>

{
  /* Elevated section with contrast */
}
;<section className="bg-neutral text-neutral-content py-20">...</section>
```

### Accent Sparingly

Accent color draws attention. Use it for one element per section, not everywhere:

```tsx
{
  /* Accent bar on a card */
}
;<div className="card bg-base-100 border-primary border-l-4 shadow-xl">...</div>

{
  /* Accent dot for status */
}
;<span className="bg-success inline-block h-2 w-2 rounded-full" />
```

## Anti-Patterns

- **Uniform card grids**: Every card same size, same padding, same shadow → monotonous. Vary at least one dimension.
- **Color everywhere**: Using `btn-primary`, `bg-primary`, `badge-primary` all on one page → nothing stands out. Reserve primary for the one action that matters most.
- **Missing vertical rhythm**: Inconsistent spacing between sections creates visual tension. Pick a scale (e.g., multiples of 8: `py-8`, `py-16`, `py-24`) and stick to it.
- **No focal point**: If every element has equal visual weight, the eye wanders. Establish hierarchy through size and contrast.
- **Generic placeholder feel**: Stock-photo heroes, lorem-ipsum-length copy, centered-everything layouts. Tailor structure to actual content dimensions.
