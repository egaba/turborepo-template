# Vercel Website - Component & Theme Analysis

> Source: https://vercel.com and https://vercel.com/pricing
> Analyzed: 2026-02-27
> Design System: Geist (https://vercel.com/geist)

---

## 1. Component Inventory

### 1.1 Navbar

- **HTML structure**: `<nav>` with flexbox layout, logo left, links center, CTAs right
- **Key classes**: `flex`, `min-w-0`, responsive hide/show at 1150px breakpoint
- **Features**: Dropdown menus for Products, Resources, Solutions sections; mobile hamburger toggle
- **Props it would need**: `logo`, `links[]`, `ctaButtons[]`, `mobileBreakpoint`, `theme`
- **Variants**: Desktop (full links) / Mobile (hamburger + drawer)
- **Responsive**: Hidden at `max-width: 1150px`, mobile menu toggle appears at smaller sizes
- **Dark mode**: Full theme-aware with light/dark logo variants

### 1.2 Hero Section

- **HTML structure**: Centered flex container with heading, subheading, dual CTA buttons, hero image
- **Layout**: Flexbox-based centered content
- **Typography**: Large display heading ("Build and deploy on the AI Cloud"), supporting body text
- **CTAs**: Two buttons -- primary filled ("Deploy") + secondary outline ("Get a Demo")
- **Visual**: Hero illustration with light/dark SVG variants
- **Props it would need**: `heading`, `subheading`, `primaryCta`, `secondaryCta`, `heroImage`, `heroImageDark`
- **Variants**: Standard (text + image), compact (text-only)

### 1.3 Social Proof / Logo Bar

- **HTML structure**: Horizontal strip with company logos + metric text
- **Companies shown**: Runway, Leonardo AI, Zapier with performance metrics
- **Pattern**: Logo + quoted metric (e.g., "build times went from 7m to 40s", "95% reduction in page load times")
- **Props it would need**: `items[]{logo, logoLight, logoDark, metric, quote}`
- **Variants**: Logos only, logos + metrics, scrolling marquee

### 1.4 Use Case Tabs / Feature Tabs

- **HTML structure**: Tab interface with section titles and descriptions
- **Sections**: AI Apps, Web Apps, Ecommerce, Marketing, Platforms
- **Pattern**: Clickable tab header -> descriptive content panel below
- **Props it would need**: `tabs[]{id, label, title, description, link, icon}`
- **Variants**: Horizontal tabs, vertical sidebar tabs

### 1.5 Feature Showcase Cards

- **HTML structure**: Card with illustration, heading, body text, optional link
- **Components**:
  - "Agents" section with modal imagery
  - "AI Apps" with tech stack listing
  - "Web Apps" with browser mockup
  - "Composable Commerce" with product display
  - "Multi-tenant Platform" with domain diagram
- **Pattern**: SVG illustration + heading + description, light/dark image variants
- **Props it would need**: `title`, `description`, `illustration`, `illustrationDark`, `link`, `tags[]`
- **Variants**: Image top, image left, image right, full-bleed

### 1.6 Framework Pill Grid

- **HTML structure**: Horizontal scrollable list of pill-shaped links
- **Frameworks**: Svelte, Vite, Next.js, Nuxt, Turbopack
- **Props it would need**: `frameworks[]{name, icon, href}`
- **Variants**: Scrollable, wrapped grid

### 1.7 Code Example Block

- **HTML structure**: Tabbed code viewer with syntax highlighting
- **Features**: Language tabs (AI SDK, Python, OpenAI HTTP), copy button, line numbers
- **Used in**: AI Gateway section with model ranking table
- **Props it would need**: `tabs[]{language, code}`, `title`, `showLineNumbers`
- **Variants**: Single language, multi-tab, with output preview

### 1.8 Template Grid

- **HTML structure**: 6-column grid of icon + label cards
- **Templates**: Next.js, React, Astro, Svelte, Nuxt, Python
- **Props it would need**: `templates[]{name, icon, href}`
- **Variants**: 3-col, 4-col, 6-col grid

### 1.9 CTA Section / Banner

- **HTML structure**: Full-width section with heading, subtext, primary + secondary CTA
- **CTAs**: "Start Deploying" (primary), "Talk to an Expert" (secondary with chevron), "Get an Enterprise Trial"
- **Props it would need**: `heading`, `subtext`, `primaryCta`, `secondaryCta`
- **Variants**: Centered, left-aligned, with background gradient

### 1.10 Footer

- **HTML structure**: Multi-column link grid
- **Sections**: Get Started, Build, Scale, Secure, Resources, Learn, Frameworks, SDKs, Use Cases, Company, Community
- **Social links**: GitHub, LinkedIn, X (Twitter), YouTube
- **Features**: Theme selector ("system / light / dark"), status page link
- **Props it would need**: `columns[]{heading, links[]}`, `socialLinks[]`, `legalLinks[]`, `themeSelector`
- **Variants**: Full multi-column, condensed single-column

### 1.11 Pricing Cards (from /pricing)

- **Tiers**: Hobby (free), Pro ($20/user/month), Enterprise (custom)
- **Structure**: Card with tier name, price, description, CTA button, feature list
- **Feature list**: Checkmark items with included/available/not_available status
- **Tier descriptions**:
  - Hobby: "The perfect starting place for your web app or personal project"
  - Pro: "$20 of included usage credit" for professional developers
  - Enterprise: Custom pricing, "Talk to Sales" CTA
- **Props it would need**: `tierName`, `price`, `period`, `description`, `cta`, `features[]`, `highlighted`, `badge`
- **Variants**: Standard, highlighted/recommended, enterprise (custom CTA)

---

## 2. Theme Analysis

### 2.1 Color System (Geist Design Tokens)

Vercel uses a comprehensive design token system with CSS custom properties following the pattern `--ds-[color]-[scale]`.

#### Color Scale Structure (1-10 per color)

| Scale | Purpose | Example Token |
|-------|---------|---------------|
| 1-3 | Component backgrounds (default, hover, active) | `--ds-gray-100`, `--ds-gray-200`, `--ds-gray-300` |
| 4-6 | Borders (default, hover, active) | `--ds-gray-400`, `--ds-gray-500`, `--ds-gray-600` |
| 7-8 | High contrast backgrounds | `--ds-gray-700`, `--ds-gray-800` |
| 9-10 | Text and icons (secondary, primary) | `--ds-gray-900`, `--ds-gray-1000` |

#### Background Tokens
- `--ds-background-100` -- default element background
- `--ds-background-200` -- secondary/elevated background

#### Available Color Scales
- **Neutrals**: Gray, Gray Alpha
- **Accents**: Blue, Purple, Pink, Teal
- **Semantic**: Red (error/danger), Amber (warning), Green (success)

#### Specific Token Examples
| Token | Usage |
|-------|-------|
| `--ds-gray-800` | High contrast neutral |
| `--ds-blue-800` | Primary accent |
| `--ds-blue-700` | Blue text |
| `--ds-blue-900` | Blue emphasis |
| `--ds-purple-700` | Purple accent |
| `--ds-pink-800` | Pink accent |
| `--ds-red-800` | Error/destructive |
| `--ds-amber-100` | Warning background |
| `--ds-amber-400` | Warning border |
| `--ds-amber-700` | Warning text |
| `--ds-amber-900` | Warning emphasis |
| `--ds-green-700` | Success text |
| `--ds-green-800` | Success accent |
| `--ds-teal-800` | Teal accent |

#### P3 Color Support
Geist uses P3 colors on supported browsers and displays for enhanced color gamut.

### 2.2 Dark Mode Implementation

- **Storage key**: `"zeit-theme"` in localStorage
- **Values**: `"light"`, `"dark"`, `"system"`
- **CSS classes**: `.light-theme`, `.dark-theme` on root element
- **CSS property**: `color-scheme` set explicitly
- **System detection**: `window.matchMedia("(prefers-color-scheme: dark)")`
- **Implementation**: `classList.remove/add()` with theme class names
- **Asset handling**: Light/dark SVG image variants loaded conditionally

### 2.3 Typography

#### Font Families
- **Sans**: Geist Sans (custom web font), fallback: `system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`
- **Mono**: Geist Mono (custom web font)

#### Typography Scale (Geist CSS classes)

**Headings** (largest to smallest):
| Class | Approximate Use |
|-------|-----------------|
| `text-heading-72` | Hero / display heading |
| `text-heading-64` | Page title |
| `text-heading-56` | Large section heading |
| `text-heading-48` | Section heading |
| `text-heading-40` | Subsection heading |
| `text-heading-32` | Card heading |
| `text-heading-24` | Small heading |
| `text-heading-20` | Component heading |
| `text-heading-16` | Label heading |
| `text-heading-14` | Smallest heading |

**Body / Copy**:
| Class | Approximate Use |
|-------|-----------------|
| `text-copy-24` | Large body / lead text |
| `text-copy-20` | Feature description |
| `text-copy-18` | Standard body large |
| `text-copy-16` | Standard body |
| `text-copy-14` | Small body |
| `text-copy-13` | Caption / fine print |
| `text-copy-13-mono` | Code caption |

**Labels**:
| Class | Approximate Use |
|-------|-----------------|
| `text-label-20` | Large label |
| `text-label-18` | Section label |
| `text-label-16` | Standard label |
| `text-label-14` | Form label |
| `text-label-13` | Small label |
| `text-label-12` | Caps/tiny label |
| `text-label-14-mono` | Monospace label |
| `text-label-13-mono` | Monospace small label |
| `text-label-12-mono` | Monospace tiny label |

**Buttons**:
| Class | Use |
|-------|-----|
| `text-button-16` | Large button |
| `text-button-14` | Default button |
| `text-button-12` | Small / input field button |

**Modifiers**: `<strong>` for bold, "subtle" variant on headings, "tabular" on `text-label-13` for number alignment, "caps" on `text-label-12`.

**Responsive**: Mobile-first with `md:text-heading-40` pattern for breakpoint scaling.

### 2.4 Spacing System

- **CSS Custom Property**: `--gap-ratio: 1` on `.geist-container`
- **Pattern**: Multiples of 4px base unit (inferred from Geist component spacing)
- **Section spacing**: Generous vertical padding between major sections (80-120px typical)
- **Component internal spacing**: Tight internal padding with consistent gaps

### 2.5 Shadows, Borders, Gradients

- **Borders**: Subtle 1px borders using gray scale tokens (`--ds-gray-400` default, `--ds-gray-500` hover)
- **Shadows**: `shadow` prop available on Button component for elevation on marketing pages
- **Gradients**: Used in SVG hero illustrations, not heavily in UI chrome
- **Border radius**: `shape="rounded"` prop available on buttons; standard border radius across cards and inputs

---

## 3. Layout Patterns

### 3.1 Container System

- **Primary layout**: Flexbox (`flex`, `flex-1`, `min-w-0`)
- **Container queries**: `@container` class for modern CSS container queries
- **Max-width**: Responsive containers with flex-1 and padding
- **Sidebar**: Variable width 240px-400px (default 256px) via `--raw-sidebar-width`

### 3.2 Grid System

- **Template grid**: 6-column grid for framework/template cards
- **Feature grid**: 2-3 column grids for feature showcases
- **Pricing**: 3-column grid for pricing tiers
- **Footer**: Multi-column flexible grid

### 3.3 Responsive Breakpoints

```
max-width: 1150px  -> Mobile nav switch
min-width: 1151px  -> Desktop nav visible
md: prefix         -> Medium breakpoint for typography scaling
```

### 3.4 Section Spacing Rhythm

- Major sections separated by generous vertical whitespace
- Internal section padding consistent within each section type
- CTA sections have extra vertical breathing room

---

## 4. Top 5 Reusable Component Specs

### 4.1 Navbar Component

```typescript
type NavLink = {
  label: string;
  href: string;
  children?: NavDropdownSection[];
};

type NavDropdownSection = {
  heading: string;
  links: { label: string; href: string; description?: string; icon?: React.ReactNode }[];
};

type NavbarProps = {
  logo: React.ReactNode;
  links: NavLink[];
  ctaButtons: { label: string; href: string; variant: "primary" | "secondary" }[];
  mobileBreakpoint?: number; // default: 1150
  theme?: "light" | "dark" | "system";
  onThemeChange?: (theme: string) => void;
};
```

**Tailwind / DaisyUI mapping**:
```
Container:    flex items-center justify-between px-4 h-16 border-b border-base-300
Logo:         flex-shrink-0
Links:        hidden lg:flex items-center gap-6 text-sm font-medium
Mobile toggle: lg:hidden
Dropdown:     absolute top-full left-0 bg-base-100 border border-base-300 rounded-lg shadow-lg p-4
CTA:          btn btn-primary btn-sm, btn btn-ghost btn-sm
```

**Responsive**: Links hidden below lg breakpoint, hamburger appears. Dropdown menus on hover/click for desktop.

### 4.2 Hero Section Component

```typescript
type HeroProps = {
  heading: string;
  subheading?: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  image?: { light: string; dark: string; alt: string };
  align?: "center" | "left";
};
```

**Tailwind / DaisyUI mapping**:
```
Section:      py-20 md:py-32 text-center
Heading:      text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-base-content
Subheading:   text-lg md:text-xl text-base-content/60 max-w-2xl mx-auto mt-4
CTA wrapper:  flex items-center justify-center gap-4 mt-8
Primary CTA:  btn btn-primary btn-lg
Secondary CTA: btn btn-outline btn-lg
Image:        mt-16 mx-auto max-w-5xl
```

**Responsive**: Heading scales from `text-4xl` to `text-7xl`. Vertical stack on mobile, generous padding on desktop. Image below CTAs.

### 4.3 Pricing Card Component

```typescript
type PricingFeature = {
  label: string;
  included: boolean | "limited";
  detail?: string;
};

type PricingCardProps = {
  tierName: string;
  price: string | number;
  period?: string;
  description: string;
  features: PricingFeature[];
  cta: { label: string; href: string };
  highlighted?: boolean;
  badge?: string;
};
```

**Tailwind / DaisyUI mapping**:
```
Card:          card bg-base-100 border border-base-300 p-8 rounded-xl
               highlighted: ring-2 ring-primary
Badge:         badge badge-primary absolute -top-3 left-1/2 -translate-x-1/2
Tier name:     text-lg font-semibold text-base-content
Price:         text-4xl font-bold text-base-content
Period:        text-sm text-base-content/60
Description:   text-sm text-base-content/60 mt-2
Features:      mt-6 space-y-3
Feature item:  flex items-start gap-2 text-sm
Check icon:    text-success w-5 h-5 flex-shrink-0
X icon:        text-base-content/30 w-5 h-5 flex-shrink-0
CTA:           btn btn-primary w-full mt-8
               enterprise: btn btn-outline w-full mt-8
```

**Responsive**: Cards stack vertically on mobile, 3-column grid on desktop. Highlighted card can be slightly elevated.

### 4.4 Feature Showcase / Bento Grid Component

```typescript
type FeatureCardProps = {
  title: string;
  description: string;
  illustration?: { light: string; dark: string; alt: string };
  tags?: string[];
  link?: { label: string; href: string };
  size?: "default" | "large" | "wide";
};

type FeatureGridProps = {
  heading?: string;
  subheading?: string;
  features: FeatureCardProps[];
  columns?: 2 | 3;
};
```

**Tailwind / DaisyUI mapping**:
```
Grid:          grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
Card:          group bg-base-100 border border-base-300 rounded-xl overflow-hidden
               hover:border-base-content/20 transition-colors
Image area:    aspect-video bg-base-200 overflow-hidden
               img: w-full h-full object-cover
Content area:  p-6
Title:         text-lg font-semibold text-base-content
Description:   text-sm text-base-content/60 mt-2
Tags:          flex gap-2 mt-4
               badge badge-ghost badge-sm
Link:          mt-4 text-sm font-medium text-primary flex items-center gap-1
               arrow icon: group-hover:translate-x-1 transition-transform
```

**Responsive**: 1 column mobile, 2 columns tablet, 3 columns desktop. Large variant spans 2 columns.

### 4.5 Footer Component

```typescript
type FooterColumn = {
  heading: string;
  links: { label: string; href: string; external?: boolean }[];
};

type FooterProps = {
  columns: FooterColumn[];
  socialLinks: { platform: string; href: string; icon: React.ReactNode }[];
  legalLinks: { label: string; href: string }[];
  copyright: string;
  themeSelector?: boolean;
  statusPageUrl?: string;
};
```

**Tailwind / DaisyUI mapping**:
```
Footer:        bg-base-100 border-t border-base-300 py-16 px-4
Inner:         max-w-7xl mx-auto
Columns grid:  grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8
Column heading: text-sm font-semibold text-base-content mb-4
Column link:   text-sm text-base-content/60 hover:text-base-content transition-colors block py-1
Bottom bar:    mt-12 pt-8 border-t border-base-300 flex flex-wrap items-center justify-between gap-4
Social links:  flex items-center gap-4
Social icon:   text-base-content/40 hover:text-base-content transition-colors w-5 h-5
Legal:         text-xs text-base-content/40
Theme selector: flex items-center gap-2 text-xs text-base-content/60
```

**Responsive**: 2 columns mobile, 3 tablet, 6 desktop. Bottom bar stacks on mobile.

---

## 5. Geist Component Library Reference

The full Geist design system includes 50+ production components:

### Form Components
Avatar, Badge, Button, Calendar, Checkbox, Choicebox, Code Block, Collapse, Combobox, Description, Drawer, Error, Feedback, File Tree, Input, Keyboard Input, Menu, Modal, Note, Pagination, Popover, Progress, Radio, Scroll Area, Search, Select, Skeleton, Slider, Snippet, Spinner, Stack, Status Dot, Switch, Table, Tabs, Tag, Text, Textarea, Theme Switcher, Toast, Toggle, Tooltip, Window

### Button Variants (Geist)
| Variant | Use |
|---------|-----|
| `default` | Primary actions |
| `secondary` | Alternative actions |
| `tertiary` | Lowest priority |
| `error` | Destructive actions |
| `warning` | Cautionary actions |

### Button Sizes (Geist)
| Size | Use |
|------|-----|
| `small` | Compact contexts |
| `medium` | Default |
| `large` | Prominent CTAs |

### Button Props (Geist)
- `shape="rounded"` -- pill shape
- `shadow` -- elevation for marketing
- `prefix` / `suffix` -- icon slots
- `svgOnly` -- icon-only (requires `aria-label`)
- Loading and disabled states built-in
- `ButtonLink` variant for hyperlink behavior

### Badge Variants (Geist)
| Base | Subtle |
|------|--------|
| `gray` | `gray-subtle` |
| `blue` | `blue-subtle` |
| `purple` | `purple-subtle` |
| `amber` | `amber-subtle` |
| `red` | `red-subtle` |
| `pink` | `pink-subtle` |
| `green` | `green-subtle` |
| `teal` | `teal-subtle` |
| `inverted` | -- |
| `trial` | -- |
| `turbo` | -- |

Badge sizes: small, medium, large. Supports icons and "Pill" variant for link-styled badges.

---

## 6. Key Design Principles

1. **High contrast, accessible color system** -- all color scales designed for WCAG compliance
2. **Dark mode as first-class** -- every component, image, and illustration has light/dark variants
3. **Typography-driven hierarchy** -- clear heading > copy > label scale with consistent weights
4. **Minimal chrome** -- subtle borders (`--ds-gray-400`), rare use of shadows, clean whitespace
5. **Responsive by default** -- mobile-first with `md:` breakpoint prefixes for scaling
6. **Theme-aware assets** -- SVG illustrations swap between light/dark automatically via CSS or conditional rendering
7. **P3 color gamut** -- enhanced colors on supported displays for richer accent colors
8. **Container queries** -- modern `@container` for component-level responsive design

---

## 7. DaisyUI Color Mapping

For building Vercel-inspired components with DaisyUI themes:

| Geist Token | DaisyUI Equivalent | Notes |
|-------------|-------------------|-------|
| `--ds-background-100` | `bg-base-100` | Default background |
| `--ds-background-200` | `bg-base-200` | Elevated/secondary bg |
| `--ds-gray-400` | `border-base-300` | Default borders |
| `--ds-gray-900` | `text-base-content/60` | Secondary text |
| `--ds-gray-1000` | `text-base-content` | Primary text |
| `--ds-blue-800` | `text-primary` | Primary accent |
| `--ds-red-800` | `text-error` | Error state |
| `--ds-amber-700` | `text-warning` | Warning state |
| `--ds-green-700` | `text-success` | Success state |
| `--ds-teal-800` | `text-info` | Info state |
