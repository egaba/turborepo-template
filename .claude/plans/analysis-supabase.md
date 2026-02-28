# Supabase Website Analysis

**Source**: https://supabase.com (dark-first design, Next.js + Tailwind CSS)
**Design System**: Built on shadcn/ui + Radix UI primitives, custom Tailwind theme with semantic color tokens
**Theme**: `data-theme="dark"` attribute on `<html>`, supports dark/light/classic-dark

---

## 1. Component Inventory

### 1.1 Navbar

**HTML structure**: `<nav>` > `<div>` container > flex row with logo, links, CTAs
**Key Tailwind classes** (extracted from live DOM):
```
nav:       relative z-40 border-default border-b backdrop-blur-sm transition-opacity
container: relative flex justify-between h-16 mx-auto lg:container lg:px-16 xl:px-20
```

**Nav Link classes**:
```
group/menu-item flex items-center text-sm hover:text-foreground select-none gap-3
rounded-md p-2 leading-none no-underline outline-none
focus-visible:ring-2 focus-visible:ring-foreground-lighter
group-hover:bg-transparent text-foreground focus-visible:text-brand-link
```

**Dropdown trigger button classes**:
```
group relative justify-center cursor-pointer inline-flex items-center space-x-2
text-center font-regular ease-out duration-200 rounded-md outline-none transition-all
outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border text-foreground
hover:bg-surface-300 shadow-none focus-visible:outline-border-strong
data-[state=open]:bg-surface-300 data-[state=open]:outline-border-strong
border-transparent text-sm leading-4 py-2
!bg-transparent hover:text-brand-link data-[state=open]:!text-brand-link
```

**Logo link classes**: `block w-auto h-6 focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-foreground-lighter focus-visible:ring-offset-4 focus-visible:ring-offset-background-alternative focus-visible:rounded-sm`

**Props it would need**:
- `logo`: Image component (light/dark variants)
- `navItems`: Array of { label, href, dropdown?: SubMenuItem[] }
- `ctas`: Array of { label, href, variant: 'primary' | 'secondary' }
- `githubStars`: number (optional badge)

**Variants**: Desktop (full nav), Mobile (hamburger menu)

---

### 1.2 Hero Section

**HTML structure**: Container `<div>` > centered flex column > H1 heading + description `<p>` + CTA buttons row

**Heading classes** (from live DOM):
```
h1:            text-foreground text-4xl sm:text-5xl sm:leading-none lg:text-7xl
container:     flex flex-col items-center
```

**Heading spans for multi-line with accent color**:
```
line 1 span:   block text-foreground           ("Build in a weekend")
line 2 span:   text-brand block md:ml-0        ("Scale to millions")
```

**Description**: Centered paragraph below heading with muted text color.

**CTA Buttons (from nav, same button system)**:
- **Primary** (green/brand): `bg-brand-400 dark:bg-brand-500 hover:bg-brand/80 dark:hover:bg-brand/50 text-foreground border-brand-500/75 dark:border-brand/30 hover:border-brand-600 dark:hover:border-brand focus-visible:outline-brand-600`
- **Secondary** (ghost/outline): `text-foreground bg-alternative dark:bg-muted hover:bg-selection border-strong hover:border-stronger focus-visible:outline-brand-600`

**Common button base**: `relative justify-center cursor-pointer items-center space-x-2 text-center font-regular ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border`

**Size variant (small/nav)**: `text-xs px-2.5 py-1 h-[26px]`

**Props it would need**:
- `headline`: string[] (array for multi-line)
- `accentLine`: number (which line gets brand color)
- `description`: string
- `primaryCTA`: { label, href }
- `secondaryCTA`: { label, href }

---

### 1.3 Logo Cloud / Social Proof Bar

**HTML structure**: Section > animated horizontal scrolling row of company logos
**Companies shown**: Mozilla, GitHub, 1Password, PwC, Pika, Humata, Udio, LangChain, Resend, Loops, Mobbin, GoPuff, Chatbase, BetaShares, Submagic

**Layout pattern**: Horizontally scrolling marquee/carousel with opacity fade at edges
**Caption**: "Trusted by fast-growing companies worldwide"

**Props it would need**:
- `logos`: Array of { name, src, href? }
- `caption`: string
- `scrollSpeed`: number
- `variant`: 'marquee' | 'static-grid'

---

### 1.4 Feature Product Cards

**HTML structure**: Grid of 7 product cards, each with image, title, description, and highlights

**Products**: Database, Authentication, Edge Functions, Storage, Realtime, Vector, Data APIs

Each card contains:
- Dark/light theme image variants (separate images per theme)
- Product name (heading)
- Short description
- Feature highlight pills/badges
- Link to docs

**Layout**: Cards arranged in responsive grid (likely 2-3 columns on desktop)

**Props it would need**:
- `icon`: ReactNode
- `title`: string
- `description`: string
- `image`: { dark: string, light: string }
- `highlights`: string[]
- `href`: string

---

### 1.5 Customer Story Cards

**HTML structure**: Grid/carousel of case study cards

Each card contains:
- Company logo
- Quote/testimonial text
- Person name/role
- Link to full case study

**Props it would need**:
- `companyLogo`: string
- `quote`: string
- `author`: { name, role, avatar? }
- `href`: string

---

### 1.6 Testimonial Carousel

**HTML structure**: Horizontal scrolling cards with Twitter/X testimonials

Each testimonial:
- Profile image
- User name and handle
- Tweet text
- Twitter/X link

**Props it would need**:
- `testimonials`: Array of { avatar, name, handle, text, href }
- `autoScroll`: boolean

---

### 1.7 Framework Compatibility Row

**HTML structure**: Horizontal row of framework logos/icons
**Frameworks**: React, Next.js, Redwood, Flutter, Kotlin, SvelteKit, Solid.js, Vue, Nuxt, Refine

**Props it would need**:
- `frameworks`: Array of { name, icon, href }
- `heading`: string

---

### 1.8 Footer

**HTML structure**: Multi-column grid footer with link categories, social links, trust badges

**Columns**:
- Product: Database, Auth, Functions, Realtime, Storage, Vector, Cron, Pricing, Launch Week
- Solutions: AI Builders, No Code, Beginners, Developers, Postgres Devs, Vibe Coders, Hackathon, Startups, Agencies, Enterprise
- Resources: Blog, Support, Status page, Partners, Integrations, Brand Assets, Security
- Developers: Docs, UI library, Changelog, Careers, Contributing, Open Source, SupaSquad
- Company: Terms, Privacy, DPA, SOC2, HIPAA

**Social links**: Twitter, GitHub, Discord, YouTube
**Trust badges**: "SOC2 Type 2 Certified", "HIPAA Compliant"

**Props it would need**:
- `columns`: Array of { heading, links: Array<{ label, href }> }
- `socialLinks`: Array of { platform, href, icon }
- `trustBadges`: Array of { label, icon? }
- `copyright`: string

---

### 1.9 Mobile Menu Button

**Classes** (from live DOM):
```
text-foreground-lighter focus:ring-brand bg-transparent hover:text-foreground-light
transition-colors hover:bg-overlay inline-flex items-center justify-center
rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-inset
```

---

## 2. Theme Analysis

### 2.1 Color Palette (Semantic Tokens)

Supabase uses **semantic color tokens** rather than raw Tailwind colors. These map to CSS custom properties that change with theme.

**Foreground (text) tokens**:
| Token | Usage |
|-------|-------|
| `text-foreground` | Primary text (headings, body) |
| `text-foreground-light` | Secondary text |
| `text-foreground-lighter` | Tertiary/muted text |
| `text-foreground-muted` | Disabled/placeholder text |
| `text-brand` | Accent text (green) |
| `text-brand-link` | Interactive link hover state |

**Background tokens**:
| Token | Usage |
|-------|-------|
| `bg-background` | Page background |
| `bg-background-alternative` | Offset sections |
| `bg-alternative` | Secondary buttons |
| `bg-muted` | Dark mode secondary buttons |
| `bg-surface-300` | Hover states, dropdown open states |
| `bg-selection` | Selected/active items |
| `bg-overlay` | Overlays, mobile menu button hover |
| `bg-brand-400` | Primary CTA (light mode) |
| `bg-brand-500` | Primary CTA (dark mode) |
| `bg-brand/80` | Primary CTA hover (light) |
| `bg-brand/50` | Primary CTA hover (dark) |

**Border tokens**:
| Token | Usage |
|-------|-------|
| `border-default` | Standard borders |
| `border-strong` | Emphasized borders |
| `border-stronger` | Hover state borders |
| `border-transparent` | Invisible borders (for consistent sizing) |
| `border-brand-500/75` | Primary button border (light) |
| `border-brand/30` | Primary button border (dark) |

**Dark mode theme color**: `#1E1E1E` (from meta theme-color)
**Brand color**: Emerald/green (#3ECF8E approximate, expressed as `text-brand`)

### 2.2 Typography

| Element | Classes |
|---------|---------|
| Hero heading | `text-4xl sm:text-5xl sm:leading-none lg:text-7xl` |
| Hero accent line | `text-brand block` |
| Nav items | `text-sm leading-4` |
| Nav buttons | `text-xs` |
| Body font | Sans-serif (system/custom), `font-regular` utility |

**Responsive typography scale**:
- Mobile: `text-4xl` (2.25rem / 36px)
- SM breakpoint: `text-5xl` (3rem / 48px) with `leading-none`
- LG breakpoint: `text-7xl` (4.5rem / 72px)

### 2.3 Spacing System

**Container**: `lg:container lg:px-16 xl:px-20` (Tailwind default container + custom padding)
**Nav height**: `h-16` (4rem / 64px)
**Button padding (small)**: `px-2.5 py-1` with `h-[26px]`
**Nav item padding**: `p-2` with `gap-3`
**Focus ring offset**: `focus-visible:ring-offset-4`

### 2.4 Border Radius

- **Buttons**: `rounded-md` (0.375rem / 6px)
- **Focus indicators**: `focus-visible:rounded-sm`
- **Nav items**: `rounded-md`

### 2.5 Shadows

- Nav buttons: `shadow-none` (deliberately removed)
- Backdrop: `backdrop-blur-sm` on navbar for glass effect
- Minimal shadow usage -- dark theme relies on borders and background contrast

### 2.6 Transitions/Animations

- All interactive elements: `transition-all ease-out duration-200`
- Navbar: `transition-opacity`
- Mobile menu button: `transition-colors`
- Logo carousel: CSS marquee/scroll animation

---

## 3. Layout Patterns

### 3.1 Page Container System

```
Max-width container: lg:container (Tailwind default max-width system)
Horizontal padding:  lg:px-16 xl:px-20
```

This gives approximately:
- Mobile: Full bleed with content-specific padding
- LG (1024px+): Container with 4rem (64px) side padding
- XL (1280px+): Container with 5rem (80px) side padding

### 3.2 Section Spacing

- Sections are vertically stacked with consistent large gaps
- Hero area uses generous vertical padding
- Feature sections have clear visual separation via background color changes

### 3.3 Responsive Breakpoints

Standard Tailwind breakpoints observed:
- `sm:` (640px) - Typography scale up
- `md:` (768px) - Layout adjustments
- `lg:` (1024px) - Full desktop nav, container width
- `xl:` (1280px) - Wider padding

### 3.4 Content Centering

Hero: `flex flex-col items-center` with text-center
Feature grid: CSS Grid or flex-wrap within constrained container
Footer: Multi-column grid within container

---

## 4. Reusable Component Specs (Top 5)

### 4.1 `<Navbar />`

**Tailwind composition**:
```tsx
// Outer nav
"relative z-40 border-b backdrop-blur-sm transition-opacity"
// Inner container
"relative flex justify-between h-16 mx-auto lg:container lg:px-16 xl:px-20"
// Nav link
"flex items-center text-sm hover:text-foreground rounded-md p-2 leading-none no-underline outline-none focus-visible:ring-2 focus-visible:ring-foreground-lighter"
// Dropdown trigger
"inline-flex items-center text-sm rounded-md py-2 px-2 border-transparent hover:text-brand-link data-[state=open]:text-brand-link transition-all duration-200"
```

**Props interface**:
```ts
type NavItem = {
  label: string
  href?: string
  children?: { label: string; href: string; description?: string; icon?: ReactNode }[]
}

type NavbarProps = {
  logo: { light: string; dark: string; href: string }
  items: NavItem[]
  ctas: { label: string; href: string; variant: "primary" | "secondary" }[]
  badge?: { icon: ReactNode; label: string; href: string }
  sticky?: boolean
}
```

**Responsive**: Desktop shows full nav; mobile shows hamburger button. Breakpoint: `lg:` (hidden/block toggle).

**DaisyUI adaptation**: Use `navbar` base, `btn-primary`/`btn-ghost` for CTAs, `dropdown` for menus. Map semantic tokens to DaisyUI theme colors.

---

### 4.2 `<HeroSection />`

**Tailwind composition**:
```tsx
// Container
"flex flex-col items-center text-center py-20 lg:py-32"
// Headline
"text-4xl sm:text-5xl sm:leading-none lg:text-7xl font-bold"
// Accent line
"text-primary block"  // maps to text-brand in Supabase
// Description
"text-base-content/70 text-lg max-w-2xl mt-4"
// CTA wrapper
"flex gap-3 mt-8"
```

**Props interface**:
```ts
type HeroSectionProps = {
  headline: string[]          // Multi-line heading
  accentLineIndex?: number    // Which line gets primary color (default: last)
  description: string
  primaryCTA: { label: string; href: string }
  secondaryCTA?: { label: string; href: string }
}
```

**Responsive**: Font size scales from 4xl -> 5xl -> 7xl across breakpoints. Centered on all sizes.

**DaisyUI adaptation**: Use `btn btn-primary` and `btn btn-outline` for CTAs. Use DaisyUI `text-primary` for accent text.

---

### 4.3 `<LogoCloud />`

**Tailwind composition**:
```tsx
// Section
"py-12 overflow-hidden"
// Caption
"text-center text-sm text-base-content/50 mb-8"
// Logo row (marquee)
"flex gap-12 items-center animate-marquee"
// Individual logo
"h-6 w-auto opacity-50 hover:opacity-100 transition-opacity grayscale"
```

**Props interface**:
```ts
type LogoCloudProps = {
  logos: { name: string; src: string; href?: string }[]
  caption?: string
  variant?: "marquee" | "grid"     // scrolling vs static
  grayscale?: boolean
  columns?: 3 | 4 | 5 | 6
}
```

**Responsive**: Marquee works at all sizes. Grid variant uses responsive columns.

**DaisyUI adaptation**: No DaisyUI base needed. Pure Tailwind + custom marquee CSS animation.

---

### 4.4 `<FeatureCard />`

**Tailwind composition**:
```tsx
// Card container
"group rounded-xl border border-base-300 bg-base-200/50 p-6 hover:border-primary/30 transition-all"
// Image area
"rounded-lg overflow-hidden mb-4"
// Title
"text-lg font-semibold text-base-content"
// Description
"text-sm text-base-content/70 mt-2"
// Feature pills
"inline-flex items-center rounded-full bg-primary/10 text-primary text-xs px-2 py-0.5"
```

**Props interface**:
```ts
type FeatureCardProps = {
  icon?: ReactNode
  title: string
  description: string
  image?: { dark: string; light: string }
  highlights?: string[]
  href?: string
}
```

**Responsive**: Cards in responsive grid (1 col mobile, 2 col md, 3 col lg).

**DaisyUI adaptation**: Use `card` base with `card-body`. Highlight pills can use `badge badge-primary badge-outline badge-sm`.

---

### 4.5 `<Footer />`

**Tailwind composition**:
```tsx
// Outer footer
"border-t border-base-300 bg-base-200/50"
// Container
"mx-auto lg:container lg:px-16 xl:px-20 py-16"
// Columns grid
"grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8"
// Column heading
"text-sm font-semibold text-base-content uppercase tracking-wider mb-4"
// Column links
"space-y-3"
// Link item
"text-sm text-base-content/60 hover:text-base-content transition-colors"
// Bottom bar
"flex flex-col sm:flex-row items-center justify-between mt-12 pt-8 border-t border-base-300"
// Social icons
"flex gap-4"
// Trust badges
"flex gap-4 items-center"
```

**Props interface**:
```ts
type FooterColumn = {
  heading: string
  links: { label: string; href: string; external?: boolean }[]
}

type FooterProps = {
  columns: FooterColumn[]
  socialLinks: { platform: string; href: string; icon: ReactNode }[]
  trustBadges?: { label: string; icon?: ReactNode }[]
  copyright: string
  logo?: ReactNode
}
```

**Responsive**: 2 cols on mobile, 3 on md, 5 on lg. Bottom bar stacks vertically on mobile.

**DaisyUI adaptation**: Use `footer` base component. Map `text-base-content/60` to DaisyUI's semantic color system.

---

## 5. Button System Summary

Supabase has a well-defined button system. Here's the consolidated pattern:

**Base (all buttons)**:
```
relative justify-center cursor-pointer items-center space-x-2 text-center
font-regular ease-out duration-200 rounded-md outline-none transition-all
outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border
```

**Variants**:
| Variant | Key Classes |
|---------|-------------|
| Primary (brand/green) | `bg-brand-400 dark:bg-brand-500 text-foreground border-brand-500/75 dark:border-brand/30` |
| Secondary (outline) | `bg-alternative dark:bg-muted text-foreground border-strong hover:border-stronger` |
| Ghost (transparent) | `border-transparent shadow-none hover:bg-surface-300` |

**Sizes**:
| Size | Classes |
|------|---------|
| XS (nav) | `text-xs px-2.5 py-1 h-[26px]` |

**DaisyUI mapping**:
| Supabase | DaisyUI |
|----------|---------|
| Primary brand | `btn btn-primary` |
| Secondary outline | `btn btn-outline` |
| Ghost | `btn btn-ghost` |

---

## 6. Key Design Principles Observed

1. **Dark-first design**: Default theme is dark with `data-theme="dark"` on HTML root
2. **Semantic color tokens**: Never raw colors in markup -- always `foreground`, `brand`, `surface-*`, `border-*` tokens
3. **Backdrop blur navbar**: `backdrop-blur-sm` creates frosted glass effect
4. **Minimal shadows**: Dark theme uses borders and background contrast instead of shadows
5. **Generous focus states**: Every interactive element has explicit `focus-visible:ring-*` styles
6. **Radix UI primitives**: Dropdown menus use `data-[state=open]` for state-based styling
7. **Image theming**: Separate dark/light image assets, toggled by theme
8. **Consistent transition timing**: `ease-out duration-200` everywhere
9. **Container + padding pattern**: `lg:container lg:px-16 xl:px-20` for content constraint

---

## 7. DaisyUI Semantic Color Mapping

| Supabase Token | DaisyUI Equivalent | CSS Variable |
|----------------|-------------------|--------------|
| `text-foreground` | `text-base-content` | `--bc` |
| `text-foreground-light` | `text-base-content/70` | `--bc` with opacity |
| `text-foreground-lighter` | `text-base-content/50` | `--bc` with opacity |
| `bg-background` | `bg-base-100` | `--b1` |
| `bg-background-alternative` | `bg-base-200` | `--b2` |
| `bg-surface-300` | `bg-base-300` | `--b3` |
| `text-brand` / `bg-brand-*` | `text-primary` / `bg-primary` | `--p` |
| `border-default` | `border-base-300` | `--b3` |
| `border-strong` | `border-base-content/20` | `--bc` with opacity |
