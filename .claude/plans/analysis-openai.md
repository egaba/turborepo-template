# OpenAI Website Analysis

**URL**: https://openai.com
**Stack**: Next.js (App Router) + Tailwind CSS + Contentful CMS + Vercel
**Font**: OpenAI Sans (custom, by ABC Dinamo) with `sans-serif` fallback
**Theme**: Light mode default with dark mode support via `light:` / `dark:` prefix variants
**Design System**: Custom Tailwind config with semantic color tokens, spacing scale, and named typography classes

---

## 1. Component Inventory

### 1.1 Sticky Navigation Bar

**HTML Structure**:
```html
<header>
  <div data-testid="hopper-header-bar" class="fixed start-0 end-0 top-0 z-[51] h-header-h bg-secondary-100 transition-colors duration-medium">
    <div class="px-sm md:px-md h-header-h lg:max-w-container-desktop mx-auto flex w-full items-center gap-0 lg:gap-2xs">
      <!-- Logo -->
      <a href="/" class="py-xs flex h-full shrink-0 items-center">
        <svg class="h-[17px] w-auto" width="90" viewBox="0 0 288 78">...</svg>
      </a>
      <!-- Nav links (hidden scrollbar, horizontal overflow) -->
      <ul class="flex h-full min-w-0 items-baseline gap-0 overflow-x-hidden whitespace-nowrap">
        <li><a class="inline-flex h-full items-center text-inherit hover:text-primary-100 duration-fast">Research</a></li>
        <!-- ...more links -->
      </ul>
      <!-- Right actions -->
      <button class="rounded-[2.5rem] bg-primary-4 text-primary-100 !py-2 !px-4">Log in</button>
      <a class="rounded-[2.5rem] bg-primary-100 text-secondary-100 !py-2 !px-4 hidden md:inline-flex">Try ChatGPT</a>
    </div>
  </div>
</header>
```

**Key Classes**: `fixed top-0 z-[51]`, `h-header-h` (3.375rem / 54px), `bg-secondary-100` (white), `lg:max-w-container-desktop`
**Props**: `links: NavLink[]`, `ctaText: string`, `ctaHref: string`, `logoSvg: ReactNode`
**Variants**: Transparent bg on scroll, mobile hamburger menu (lg:hidden)

---

### 1.2 Hero / Chat Input Section

**HTML Structure**:
```html
<div class="max-w-container h-[calc(100svh-var(--header-h))] max-h-[920px] min-h-[400px] w-full px-sm md:px-md">
  <div class="relative flex h-full w-full flex-col justify-between">
    <!-- Centered title -->
    <h1 class="text-h2 text-center">What can I help with?</h1>
    <!-- Input area -->
    <label class="rounded-2xl md:rounded-3xl border border-primary-12 bg-secondary-100 shadow-splash-chatpgpt-input py-4 pe-[52px] ps-4">
      <textarea class="placeholder:text-primary-60 text-p2 w-full resize-none bg-transparent focus:outline-none" />
    </label>
    <!-- Action pills -->
    <div class="flex gap-2">
      <button class="border border-primary-12 hover:bg-primary-4 rounded-full h-[40px] px-3 text-cta">Search with ChatGPT</button>
      <button class="border border-primary-12 hover:bg-primary-4 rounded-full h-[40px] px-3 text-cta">Talk with ChatGPT</button>
      <button class="border border-primary-12 hover:bg-primary-4 rounded-full h-[40px] px-3 text-cta">Research</button>
    </div>
  </div>
</div>
```

**Key Classes**: `h-[calc(100svh-var(--header-h))]`, `max-h-[920px]`, `flex flex-col justify-between`
**Props**: `title: string`, `placeholder: string`, `actionPills: { label: string; icon?: ReactNode }[]`
**Variants**: Full viewport height hero, centered content

---

### 1.3 Featured Content Grid (News Cards)

**HTML Structure**:
```html
<section>
  <div class="max-w-container flex items-baseline justify-between mb-md">
    <h2 class="text-h4 text-primary-100">Recent news</h2>
    <a class="text-cta">View more</a>
  </div>
  <div class="max-w-container grid w-full grid-cols-1 gap-sm @lg:grid-cols-2">
    <div class="group relative">
      <a href="/index/...">
        <div class="flex gap-sm">
          <div class="rounded-md overflow-hidden aspect-16/9">
            <img src="..." class="object-cover" />
          </div>
          <div>
            <h3 class="text-h5">Article Title</h3>
            <div class="text-meta gap-x-3xs flex flex-wrap">
              <span>Company</span>
              <span class="text-primary-44">Feb 27, 2026</span>
            </div>
          </div>
        </div>
      </a>
    </div>
  </div>
</section>
```

**Key Classes**: `grid grid-cols-1 @lg:grid-cols-2 gap-sm`, `rounded-md overflow-hidden`
**Props**: `title: string`, `viewMoreHref: string`, `items: NewsItem[]`
**Variants**: 2-column grid (desktop), 1-column (mobile), with/without images

---

### 1.4 Horizontal Scroll Card Row (Stories / Research / Business)

**HTML Structure**:
```html
<section>
  <div class="max-w-container flex items-baseline justify-between mb-md">
    <h2 class="text-h4 text-primary-100">Stories</h2>
    <a class="text-cta">View all</a>
  </div>
  <div class="w-full no-scrollbar snap-x snap-mandatory overflow-x-auto overflow-y-hidden">
    <div class="grid flex-none grid-cols-3 gap-sm px-sm md:px-md min-w-[56rem]">
      <div class="group relative snap-start">
        <div class="rounded-md overflow-hidden aspect-4/5">
          <img src="..." class="object-cover w-full h-full" />
        </div>
        <h3 class="text-h5 mt-xs">Card title</h3>
        <div class="text-meta text-primary-44">Category</div>
      </div>
    </div>
  </div>
</section>
```

**Key Classes**: `snap-x snap-mandatory overflow-x-auto`, `grid grid-cols-3 gap-sm min-w-[56rem]`, `no-scrollbar`
**Props**: `title: string`, `viewAllHref: string`, `items: CardItem[]`
**Variants**: 3-column snap scroll, image aspect ratios: `4/5` (stories), `16/9` (research), `1/1` (business)

---

### 1.5 CTA Banner Section

**HTML Structure**:
```html
<div class="py-3xl relative grid grid-cols-12 bg-primary-4 overflow-hidden rounded-md">
  <div class="col-span-12 text-center">
    <h2 class="text-h2 text-center">Get started with ChatGPT</h2>
    <a href="..." class="rounded-[2.5rem] bg-primary-4 text-primary-100 px-xs h-[2.5rem] hover:bg-primary-12 text-cta">Download</a>
  </div>
</div>
```

**Key Classes**: `py-3xl bg-primary-4 rounded-md grid grid-cols-12`, `text-h2 text-center`
**Props**: `heading: string`, `ctaLabel: string`, `ctaHref: string`
**Variants**: Light background (bg-primary-4), could be dark (bg-primary-100 + text-secondary-100)

---

### 1.6 Pill / Chip Buttons

**HTML Structure**:
```html
<button class="transition ease-curve-a duration-250 border border-primary-12 hover:bg-primary-4 whitespace-nowrap text-cta flex h-[40px] items-center rounded-full border-solid bg-transparent px-3 leading-none">
  <svg class="mr-2">...</svg>
  Search with ChatGPT
</button>
```

**Key Classes**: `rounded-full h-[40px] px-3 border border-primary-12 text-cta hover:bg-primary-4`
**Props**: `label: string`, `icon?: ReactNode`, `onClick?: () => void`
**Variants**: Ghost (border only), Filled (`bg-primary-4`), Dark filled (`bg-primary-100 text-secondary-100`)

---

### 1.7 Meta Label / Badge

**HTML Structure**:
```html
<div class="text-meta gap-x-3xs gap-y-4xs flex flex-wrap">
  <span>Company</span>
  <span class="text-primary-44">5 min read</span>
</div>
```

**Key Classes**: `text-meta gap-x-3xs flex flex-wrap`, secondary text `text-primary-44`
**Props**: `category: string`, `date?: string`, `readTime?: string`

---

### 1.8 Footer

**HTML Structure**:
```html
<footer class="@container mt-3xl mb-md">
  <div class="max-w-container mx-auto px-sm md:px-md">
    <div class="flex flex-col md:flex-row md:gap-sm">
      <!-- Column groups -->
      <div class="flex flex-col gap-11 md:gap-10">
        <div class="flex flex-col justify-between">
          <h3 class="text-meta text-primary-44">Our Research</h3>
          <ul class="flex flex-col gap-xs md:gap-2xs mt-2xs md:mt-3xs">
            <li><a class="text-p2 hover:text-primary-60">Research Index</a></li>
          </ul>
        </div>
      </div>
    </div>
    <!-- Bottom bar -->
    <div class="flex items-center justify-between mt-3xl">
      <span class="text-meta text-primary-44">OpenAI (c) 2018-2026</span>
      <div class="flex gap-sm"><!-- Social icons --></div>
    </div>
  </div>
</footer>
```

**Key Classes**: `@container mt-3xl`, columns via `flex flex-col md:flex-row`, link groups with `gap-xs`
**Props**: `columns: FooterColumn[]`, `copyright: string`, `socialLinks: SocialLink[]`

---

## 2. Theme Analysis

### 2.1 Color Palette (Semantic Opacity System)

OpenAI uses a unique opacity-based color system rather than distinct hex colors. Primary = black, Secondary = white.

| Token | Light Mode Value | Usage |
|-------|-----------------|-------|
| `primary-100` | `rgb(0,0,0)` / `#000000` | Primary text, filled buttons |
| `primary-80` | `rgba(0,0,0,0.8)` | Strong secondary text |
| `primary-60` | `rgba(0,0,0,0.6)` | Muted text, hover states |
| `primary-44` | `rgba(0,0,0,0.44)` | Placeholder, meta text, disabled icons |
| `primary-12` | `rgba(0,0,0,0.12)` | Borders, dividers, focus outlines |
| `primary-4` | `rgba(0,0,0,0.04)` | Subtle backgrounds, hover fills |
| `secondary-100` | `rgb(255,255,255)` / `#FFFFFF` | Page background, card bg, nav bg |
| `secondary-60` | `rgba(255,255,255,0.6)` | Overlay text on dark |
| `background` | `rgb(255,255,255)` | Body background |
| `gray-40` | Disabled state text | |
| `gray-60` | Decoration underlines | |

**DaisyUI Mapping**:
```
base-100     -> secondary-100 (#FFFFFF)
base-200     -> primary-4 (rgba(0,0,0,0.04))
base-300     -> primary-12 (rgba(0,0,0,0.12))
base-content -> primary-100 (#000000)
primary      -> primary-100 (#000000)
primary-content -> secondary-100 (#FFFFFF)
neutral      -> primary-60 (rgba(0,0,0,0.6))
```

### 2.2 Typography Scale

Font family: `"OpenAI Sans", sans-serif` (all weights use 500 for headings, 400 for body)

| Token | Size | Weight | Line Height | Letter Spacing |
|-------|------|--------|-------------|----------------|
| `text-h1` | 59.19px (~3.7rem) | 500 | 59.87px (1.01) | -1.78px (-0.03em) |
| `text-h2` | 45.60px (~2.85rem) | 500 | 52.80px (1.16) | -1.32px (-0.03em) |
| `text-h3` | 29.10px (~1.82rem) | 500 | 38.41px (1.32) | -0.29px (-0.01em) |
| `text-h4` | 21.70px (~1.36rem) | 500 | 27.16px (1.25) | -0.22px (-0.01em) |
| `text-h5` | 17.70px (~1.11rem) | 500 | 23.20px (1.31) | -0.18px (-0.01em) |
| `text-p1` | 17px (~1.06rem) | 400 | 28.00px (1.65) | -0.17px (-0.01em) |
| `text-p2` | 14px (0.875rem) | 400 | 22.96px (1.64) | -0.14px (-0.01em) |
| `text-cta` | 14px (0.875rem) | 500 | 14px (1.0) | normal |
| `text-meta` | 14px (0.875rem) | 500 | 19.6px (1.4) | normal |
| `text-nav-hopper` | 12px (0.75rem) | 500 | 19.68px (1.64) | normal |

**Generic Tailwind Mapping** (using Inter or system font):
- h1: `text-6xl font-medium tracking-tight`
- h2: `text-5xl font-medium tracking-tight`
- h3: `text-3xl font-medium tracking-tight`
- h4: `text-xl font-medium tracking-tight`
- h5: `text-lg font-medium`
- p1: `text-base leading-relaxed`
- p2: `text-sm leading-relaxed`
- cta: `text-sm font-medium leading-none`
- meta: `text-sm font-medium`

### 2.3 Spacing System (CSS Custom Properties)

| Token | Value | Tailwind Equivalent |
|-------|-------|-------------------|
| `5xs` | 0.25rem (4px) | `1` |
| `4xs` | 0.5rem (8px) | `2` |
| `3xs` | 0.75rem (12px) | `3` |
| `2xs` | 1rem (16px) | `4` |
| `xs` | 1.25rem (20px) | `5` |
| `sm` | 1.5rem (24px) | `6` |
| `md` | 2rem (32px) | `8` |
| `lg` | 3rem (48px) | `12` |
| `xl` | 4rem (64px) | `16` |
| `2xl` | 5rem (80px) | `20` |
| `3xl` | 7.5rem (120px) | `30` |
| `4xl` | 10rem (160px) | `40` |
| `5xl` | 12.5rem (200px) | `50` |

### 2.4 Animation / Transition System

| Duration Token | Value |
|---------------|-------|
| `duration-fast` | ~150ms |
| `duration-short` | ~200ms |
| `duration-medium` | ~300ms |
| `duration-normal` | ~400ms |
| `duration-long` | ~500ms |
| `duration-sidebar` | ~300ms |

| Easing Token | Description |
|-------------|-------------|
| `ease-curve-a` | Primary interaction easing (hover, focus) |
| `ease-curve-c` | Content reveal / opacity transitions |
| `ease-curve-d` | Background/image scale transitions |
| `ease-curve-out-cubic` | Overlay/modal exit |
| `ease-curve-sidebar` | Sidebar slide transitions |
| `ease-primary` | General purpose |

**Animation Patterns**:
- Hover on images: `[&_img]:duration-300` with scale transform
- Button hover: `transition duration-short ease-curve-a`
- Nav color transitions: `transition-colors duration-medium`
- Card media reveal: `ease-curve-c duration-normal transition-opacity`

### 2.5 Dark Mode Handling

OpenAI uses custom `light:` and `dark:` Tailwind prefixes (not standard `dark:` media query):
- `light:border-primary-12` - border only in light mode
- `light:bg-secondary-100` - white bg in light mode
- `light:shadow-splash-chatpgpt-input` - shadow only in light mode
- `dark:bg-primary-4` - subtle bg in dark mode
- `dark:decoration-gray-60` - underline color in dark mode

In dark mode, the primary/secondary colors would invert (primary becomes white, secondary becomes black).

---

## 3. Layout Patterns

### 3.1 Container Strategy

| Token | Description | Width |
|-------|-------------|-------|
| `max-w-container` | Content container | ~1216px (68rem) |
| `max-w-container-desktop` | Full-width container | ~1280px (--document-width) |

**CSS Variables**:
```css
--document-width: 1280px;
--gutter-size: max(20px, calc((var(--document-width) - 68rem) / 2));
--media-gutter-size: max(20px, calc((var(--document-width) - 1728px) / 2));
```

**Container pattern**: `max-w-container mx-auto px-sm md:px-md` (24px / 32px side padding)

### 3.2 Grid Patterns

| Pattern | Classes |
|---------|---------|
| 2-column news grid | `grid grid-cols-1 @lg:grid-cols-2 gap-sm` |
| 3-column card scroll | `grid grid-cols-3 gap-sm min-w-[56rem]` |
| 4-column featured | `grid grid-cols-1 @lg:grid-cols-4 gap-sm` |
| 12-column CTA layout | `grid grid-cols-12` |

### 3.3 Responsive Breakpoints

Uses Tailwind container queries (`@container`, `@md:`, `@lg:`) alongside standard responsive prefixes:
- `md:` (768px) - medium screens
- `lg:` (1024px) - large screens / desktop
- `@md:` - container query medium
- `@lg:` - container query large

### 3.4 Section Rhythm

Sections use consistent vertical spacing:
- Between sections: `mt-3xl` (120px) or `gap-2xl` (80px)
- Section header to content: `mb-md` (32px)
- Between cards: `gap-sm` (24px)

---

## 4. Reusable Component Specs (Top 5)

### 4.1 StickyNav

A minimal fixed-position navigation bar with logo, horizontal link list, and CTA buttons.

```tsx
type NavLink = {
  label: string;
  href: string;
  external?: boolean;
};

type StickyNavProps = {
  logo: React.ReactNode;
  links: NavLink[];
  ctaLabel?: string;
  ctaHref?: string;
  loginLabel?: string;
  onLogin?: () => void;
};
```

**Tailwind Implementation**:
```tsx
// Container
"fixed inset-x-0 top-0 z-50 h-14 bg-white transition-colors duration-300"

// Inner row
"mx-auto flex h-14 max-w-7xl items-center px-6 md:px-8 gap-1"

// Logo link
"flex h-full shrink-0 items-center py-3"

// Nav link
"inline-flex h-full items-center text-sm text-black/60 hover:text-black transition-colors duration-150"

// Login button (ghost)
"rounded-full bg-black/[0.04] px-4 py-2 text-xs font-medium text-black hover:bg-black/[0.12]"

// CTA button (filled)
"rounded-full bg-black px-4 py-2 text-xs font-medium text-white hidden md:inline-flex"
```

**DaisyUI**: Could use `navbar` base with custom `btn-ghost` / `btn-primary` variants.

---

### 4.2 PillButton

Rounded pill-shaped button used for actions, filters, and CTAs throughout the site.

```tsx
type PillButtonProps = {
  children: React.ReactNode;
  variant?: 'ghost' | 'subtle' | 'filled' | 'outline';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
};
```

**Tailwind Implementation**:
```tsx
const baseClasses = "inline-flex items-center justify-center gap-[0.3em] rounded-full font-medium whitespace-nowrap transition ease-out duration-200";

const variants = {
  ghost: "bg-transparent text-black hover:bg-black/[0.04]",
  subtle: "bg-black/[0.04] text-black hover:bg-black/[0.12]",
  filled: "bg-black text-white hover:bg-black/80",
  outline: "border border-black/[0.12] bg-transparent text-black hover:bg-black/[0.04]",
};

const sizes = {
  sm: "h-7 px-3 text-xs",   // nav buttons: 28px
  md: "h-10 px-5 text-sm",  // action pills: 40px
};
```

**DaisyUI**: Maps to `btn btn-sm btn-ghost`, `btn btn-sm btn-primary`, `btn btn-outline`.

---

### 4.3 ContentCard

Versatile card for news articles, stories, research papers, and business showcases.

```tsx
type ContentCardProps = {
  title: string;
  href: string;
  image?: { src: string; alt: string };
  category?: string;
  date?: string;
  readTime?: string;
  aspectRatio?: '1/1' | '4/5' | '16/9';
  layout?: 'vertical' | 'horizontal';
};
```

**Tailwind Implementation**:
```tsx
// Card wrapper
"group relative"

// Image container
"overflow-hidden rounded-md"

// Image with hover scale
"object-cover w-full h-full transition-transform duration-300 ease-out group-hover:scale-105"

// Aspect ratio variants
"aspect-video"    // 16/9 - research
"aspect-[4/5]"   // 4/5 - stories (tall)
"aspect-square"   // 1/1 - business

// Title
"text-lg font-medium tracking-tight mt-3"

// Meta row
"flex flex-wrap gap-x-3 text-sm font-medium mt-1"

// Category label
"text-black"

// Date / read time (muted)
"text-black/[0.44]"
```

**DaisyUI**: `card card-compact` with custom image handling.

---

### 4.4 SectionHeader

Consistent section header with title and optional "View more" link, used before every content row.

```tsx
type SectionHeaderProps = {
  title: string;
  viewMoreLabel?: string;
  viewMoreHref?: string;
};
```

**Tailwind Implementation**:
```tsx
// Container
"mx-auto max-w-5xl flex items-baseline justify-between mb-8 px-6 md:px-8"

// Title
"text-xl font-medium tracking-tight text-black"

// View more link
"text-sm font-medium text-black hover:text-black/60 transition-colors"
```

---

### 4.5 HorizontalScrollRow

Snap-scrolling horizontal carousel used for Stories, Research, and Business sections.

```tsx
type HorizontalScrollRowProps = {
  title: string;
  viewAllHref?: string;
  children: React.ReactNode; // ContentCard items
  columns?: 3 | 4;
};
```

**Tailwind Implementation**:
```tsx
// Scroll container
"w-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory scrollbar-none"

// Inner grid (forces horizontal scroll)
"grid grid-cols-3 gap-6 min-w-[56rem] px-6 md:px-8"

// Individual item
"snap-start"

// Hide scrollbar (add to globals.css or Tailwind plugin)
".scrollbar-none::-webkit-scrollbar { display: none; }"
".scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }"
```

---

## 5. Key Design Principles (for Reproduction)

1. **Opacity-based color system**: Instead of many hex colors, use black at different opacities (100%, 80%, 60%, 44%, 12%, 4%) for a unified, elegant palette.

2. **Tight negative letter-spacing**: All headings use negative tracking (`-0.01em` to `-0.03em`), creating a premium typographic feel.

3. **Generous vertical spacing**: Sections are separated by 80-120px, giving content room to breathe.

4. **Container queries over media queries**: Uses `@container` / `@md:` / `@lg:` for more component-scoped responsiveness.

5. **Minimal borders and shadows**: Borders are `rgba(0,0,0,0.12)` (barely visible). Shadows are sparse and subtle (`shadow-splash-*`). Visual hierarchy comes from spacing and typography, not decoration.

6. **Horizontal scroll with snap**: Content rows use native scroll-snap for touch-friendly carousels without JavaScript dependencies.

7. **Named transitions**: Custom easing curves (`ease-curve-a`, `ease-curve-c`) and duration tokens (`duration-fast`, `duration-medium`) ensure consistent motion design.

8. **Aspect ratio variety**: Different content types use different aspect ratios (`1/1`, `4/5`, `16/9`) to create visual rhythm across sections.
