# Loom Website Component Analysis

**Source**: https://www.loom.com and https://www.loom.com/pricing
**Date**: 2026-02-27

---

## 1. Component Inventory

### 1.1 Navbar

**Purpose**: Top-level navigation with logo, menu toggle, and account links.

**HTML Structure**:
```html
<nav>
  <a href="/">
    <svg><!-- Loom wordmark SVG --></svg>
  </a>
  <button aria-label="Toggle menu"><!-- hamburger icon --></button>
  <div class="nav-links">
    <a href="/pricing">Pricing</a>
    <a href="/enterprise">Enterprise</a>
    <!-- dynamic account links -->
  </div>
</nav>
```

**Key CSS/Styling**:
- CSS-in-JS (Emotion) with hashed class names (`.css-pws6wr`, `.css-kxjlgc`)
- Logo color: `var(--thd-color-black)` (black)
- Icon size: 16x16px via `var(--ds-space-200)`
- Icon padding: `var(--ds--button--new-icon-padding-end/start)`
- Forced-colors mode support: `color: CanvasText`

**Props Interface**:
```typescript
type NavbarProps = {
  logo: React.ReactNode
  links: Array<{ label: string; href: string }>
  cta?: { label: string; href: string }
  onMenuToggle?: () => void
  transparent?: boolean
}
```

**Variants**: Default (white bg), Transparent (over hero), Dark (enterprise sections)

---

### 1.2 HeroSection

**Purpose**: Primary value proposition with headline, subtext, CTA, and embedded video.

**HTML Structure**:
```html
<section class="hero">
  <h1>One video is worth a thousand words</h1>
  <p>Easily record and share AI-powered video messages...</p>
  <a href="/signup" class="cta-button">
    Get Loom for free
    <svg><!-- arrow icon --></svg>
  </a>
  <div class="hero-media">
    <video src="..." autoplay muted loop />
  </div>
</section>
```

**Key CSS/Styling**:
- Heading: ~48-56px, bold, black
- Body: ~16-18px, regular, gray
- CTA icon container: `.css-ilx5r9` (24x24px SVG)
- Centered layout, max-width constrained
- Video: full-width below CTA

**Props Interface**:
```typescript
type HeroSectionProps = {
  heading: string
  subheading: string
  cta: { label: string; href: string }
  media?: { type: "video" | "image"; src: string }
  alignment?: "center" | "left"
}
```

**Variants**: Centered (landing page), Split (half image + half text)

---

### 1.3 LogoCloud

**Purpose**: Social proof via company logo grid (400,000+ companies messaging).

**HTML Structure**:
```html
<section class="logo-cloud">
  <h2>Millions of people across 400,000 companies choose Loom</h2>
  <div class="logo-grid">
    <img src="hubspot.svg" alt="HubSpot" />
    <img src="lacoste.svg" alt="Lacoste" />
    <!-- 25+ logos -->
  </div>
  <button>View more</button>
</section>
```

**Key CSS/Styling**:
- Logo grid: CSS Grid, centered alignment
- Logos: grayscale by default, SVG format primarily
- Dimensions vary (84x25 to 550x160), maintaining aspect ratios
- Forced-colors: `filter: grayscale(1)`

**Props Interface**:
```typescript
type LogoCloudProps = {
  heading?: string
  logos: Array<{ src: string; alt: string; width?: number; height?: number }>
  maxVisible?: number
  showMoreLabel?: string
}
```

**Variants**: Scrolling marquee, Static grid, Expandable (with "View more")

---

### 1.4 FeatureShowcase

**Purpose**: Alternating image/content blocks highlighting key product features.

**HTML Structure**:
```html
<section class="feature-showcase">
  <div class="section-header">
    <h2>The easiest screen recorder you'll ever use</h2>
    <p>Record in a few clicks. Share anywhere. Collaborate better.</p>
  </div>
  <div class="feature-block">
    <div class="feature-content">
      <h3>Edit your videos like a pro</h3>
      <p>Loom's intuitive editor...</p>
      <a href="#">Record now <svg /></a>
    </div>
    <div class="feature-media">
      <img src="editor.jpg" alt="..." />
    </div>
  </div>
  <!-- alternating layout blocks -->
</section>
```

**Key CSS/Styling**:
- Flex/Grid container, alternating `row` / `row-reverse` direction
- Feature heading: ~24-28px, semi-bold
- Body: 16px, regular
- CTA icons: 24x24 (`.css-ilx5r9`)
- Image: ~50% width desktop, 100% mobile
- Gap: 40-48px between image and content
- Section padding: 60-80px vertical
- Custom animations: `chatUnfurl`, `commentsConversation`

**Props Interface**:
```typescript
type FeatureShowcaseProps = {
  sectionHeading?: string
  sectionSubheading?: string
  features: Array<{
    heading: string
    description: string
    cta?: { label: string; href: string }
    media: { type: "image" | "video"; src: string; alt?: string }
  }>
  alternating?: boolean
}
```

**Variants**: Alternating left/right, Stacked, With video autoplay

---

### 1.5 FeatureGrid

**Purpose**: Grid of key product capabilities with icons and labels.

**HTML Structure**:
```html
<section class="feature-grid">
  <h2>Powerful features for easy, custom recordings</h2>
  <ul class="grid">
    <li>
      <svg class="feature-icon"><!-- icon --></svg>
      <span>Screen and camera recording</span>
    </li>
    <!-- 8 total features -->
  </ul>
</section>
```

**Key CSS/Styling**:
- Icon: `.css-1qjg2na` -- 24x24px, `color: var(--lns-color-body)`
- Grid: 3-4 columns desktop, responsive
- Gap: 24-32px
- Icon-text gap: 12-16px
- Padding: 40-60px top/bottom

**Props Interface**:
```typescript
type FeatureGridProps = {
  heading?: string
  features: Array<{ icon: React.ReactNode; label: string; description?: string }>
  columns?: 2 | 3 | 4
}
```

**Variants**: Icon + Label only, Icon + Label + Description, With links

---

### 1.6 UseCaseCards

**Purpose**: Color-themed cards linking to use-case pages (Sales, Engineering, Support, Design).

**HTML Structure**:
```html
<section class="use-cases">
  <h2>Video messaging for all use cases</h2>
  <div class="card-grid">
    <a href="/use-case/sales" class="use-case-card" data-theme="green-10">
      <img src="sales.png" alt="" />
      <h3>Sales</h3>
      <p>Personalize your pitch with video outreach...</p>
    </a>
    <!-- Engineering (violet-10), Support (blue-10), Design (yellow-10) -->
  </div>
  <a href="/use-case">See all use cases</a>
</section>
```

**Key CSS/Styling**:
- Cards use `colorTheme` data attributes: `green-10`, `violet-10`, `blue-10`, `yellow-10`
- Image: 580x480px, ~1.2:1 aspect ratio, PNG format
- Card heading: 20-24px, semi-bold
- Card description: 16px, regular
- Grid: 4 columns (desktop), 2 (tablet), 1 (mobile)
- Gap: 32px
- Card padding: 32-40px
- Hover: subtle opacity/scale change

**Props Interface**:
```typescript
type UseCaseCardProps = {
  heading: string
  description: string
  image: string
  href: string
  colorTheme: "green" | "violet" | "blue" | "yellow" | "magenta" | "red"
}

type UseCaseGridProps = {
  heading?: string
  cards: UseCaseCardProps[]
  viewAllHref?: string
}
```

**Variants**: Standard card, Compact (no image), With badge/tag

---

### 1.7 TestimonialCarousel

**Purpose**: Rotating customer testimonials with avatar, quote, company logo, and color theming.

**HTML Structure**:
```html
<section class="testimonials">
  <div class="carousel">
    <blockquote class="testimonial-card" data-theme="violet">
      <img src="company-logo.svg" alt="Company" class="company-logo" />
      <p class="quote">"Loom has been the light of my life..."</p>
      <div class="attribution">
        <img src="avatar.webp" alt="Name" class="avatar" />
        <div>
          <strong>Alexis Ohanian</strong>
          <span>Founder, SevenSevenSix</span>
        </div>
      </div>
    </blockquote>
    <!-- 6 total testimonials -->
  </div>
</section>
```

**Key CSS/Styling**:
- Avatar: `.css-ztipld` -- 1.5em, circular, `display: block`
- Color themes per card: violet, green, magenta, blue
- Quote text: ~18-20px, italic, semi-bold
- Name: 16px, bold
- Title: 14px, regular, gray
- Company logo sizes vary: 50x50 to 450x450 (responsive)
- Card padding: 32-40px
- Carousel: flex with scroll/snap or auto-advance
- Fade transitions between slides

**Props Interface**:
```typescript
type Testimonial = {
  quote: string
  name: string
  title: string
  company: string
  companyLogo?: string
  avatar?: string
  colorTheme?: "violet" | "green" | "magenta" | "blue"
}

type TestimonialCarouselProps = {
  testimonials: Testimonial[]
  autoAdvance?: boolean
  autoAdvanceInterval?: number
}
```

**Variants**: Single card (centered), Multi-card (3 visible), Scrolling strip

---

### 1.8 BlogCardGrid

**Purpose**: Featured blog articles in a grid with headings, excerpts, and links.

**HTML Structure**:
```html
<section class="blog-section">
  <span class="eyebrow">From our blog</span>
  <h2>How to use async video messaging to improve communication</h2>
  <div class="article-grid">
    <article>
      <h3>When to Choose Synchronous Vs. Asynchronous Communication</h3>
      <p>This guide explores the intricacies...</p>
      <a href="...">Read the article <svg /></a>
    </article>
  </div>
  <a href="/blog">Explore our blog</a>
</section>
```

**Key CSS/Styling**:
- Eyebrow: 12-13px, uppercase, gray
- Main heading: 32-40px, semi-bold
- Article heading: 20-24px, semi-bold
- Body: 16px, regular
- Link icon: `.css-11llgp4` -- 1.25em
- Grid: 2 columns desktop, 1 column mobile
- Gap: 24-32px
- Card: white background, subtle shadow
- Card padding: 24-32px

**Props Interface**:
```typescript
type BlogCard = {
  title: string
  excerpt?: string
  href: string
  image?: string
  category?: string
}

type BlogCardGridProps = {
  eyebrow?: string
  heading?: string
  articles: BlogCard[]
  viewAllHref?: string
  columns?: 2 | 3
}
```

**Variants**: Text-only, With thumbnail image, Featured (large) + secondary (small)

---

### 1.9 PricingTable

**Purpose**: Side-by-side pricing tier cards with billing toggle and feature lists.

**HTML Structure**:
```html
<section class="pricing">
  <h1>Choose the plan that fits your needs.</h1>

  <div class="controls">
    <div class="team-size">
      <label>Team size:</label>
      <input type="number" placeholder="users" />
    </div>
    <div class="billing-toggle">
      <label>Bill me:</label>
      <div class="radio-group">
        <label><input type="radio" name="billing" value="monthly" /> Monthly</label>
        <label><input type="radio" name="billing" value="annually" /> Annually</label>
      </div>
      <span class="badge">SAVE UP TO 17%</span>
    </div>
  </div>

  <div class="tier-grid">
    <div class="tier-card">
      <div class="tier-header">
        <h2>Business + AI</h2>
        <span class="badge">MOST POPULAR</span>
      </div>
      <div class="price">
        <span class="amount">$24</span>
        <span class="period">per user / month</span>
      </div>
      <a href="/signup" class="cta-primary">Try for free</a>
      <div class="features">
        <p class="intro">Everything in Business, and</p>
        <ul>
          <li>
            <svg class="check-icon" />
            <span>Auto-video enhancement</span>
            <span class="new-badge">NEW</span>
          </li>
          <!-- more features -->
        </ul>
      </div>
      <button class="see-all">See all features</button>
    </div>
    <!-- Starter, Business, Enterprise cards -->
  </div>
</section>
```

**Key CSS/Styling**:
- Radio group: `.css-1gt4iho` -- `display: grid; grid-auto-flow: column; gap: var(--lns-space-small)`
- Radio button visual: `.css-7rp1uf` -- `calc(2.25 * 8px)` = 18px circle, `border-radius: var(--lns-radius-full)`, border: `2px solid var(--lns-color-body)`
- Checked state: inner dot `background-color: var(--lns-color-blurple)`
- Focus ring: `box-shadow: 0 0 0 2px var(--lns-color-focusRing)`
- Badge: `.css-1drq7fw` -- `display: inline-grid; padding: 0 12px; min-height: 26px; color: var(--lns-color-grey8); background: var(--thd-color-blue-20); border-radius: var(--lns-radius-100); font-size: small; font-weight: bold`
- Input: `.css-hfhd1p` -- `height: var(--lns-formFieldHeight); border-radius: var(--lns-radius-175); box-shadow: inset 0 0 0 var(--lns-formFieldBorderWidth) var(--lns-color-formFieldBorder); transition: 0.3s box-shadow`
- Input hover: `box-shadow: inset 0 0 0 var(--lns-formFieldBorderWidthFocus) var(--lns-color-blurple)`
- Check icon: `.css-1rqgczm` -- 1em, `color: var(--lns-color-body)`
- Tier grid: 4 columns desktop, responsive

**Props Interface**:
```typescript
type PricingFeature = {
  label: string
  isNew?: boolean
  tooltip?: string
}

type PricingTier = {
  name: string
  price: number | "Custom"
  billingPeriod: string
  badge?: string
  cta: { label: string; href: string }
  introText?: string
  features: PricingFeature[]
  highlighted?: boolean
}

type PricingTableProps = {
  heading: string
  tiers: PricingTier[]
  billingOptions?: Array<{ label: string; value: string; discount?: string }>
  teamSizeInput?: boolean
  showComparison?: boolean
}
```

**Variants**: 3-tier, 4-tier, With comparison table, With team-size calculator

---

### 1.10 FeatureComparisonTable

**Purpose**: Detailed feature breakdown across all pricing tiers.

**HTML Structure**:
```html
<table class="comparison-table">
  <thead>
    <tr>
      <th>Feature</th>
      <th>Starter</th>
      <th>Business</th>
      <th>Business + AI</th>
      <th>Enterprise</th>
    </tr>
  </thead>
  <tbody>
    <tr class="category-row">
      <td colspan="5">Workspace Members & Videos</td>
    </tr>
    <tr>
      <td>Members</td>
      <td>Up to 50</td>
      <td>Unlimited</td>
      <td>Unlimited</td>
      <td>Unlimited</td>
    </tr>
    <!-- more rows -->
  </tbody>
</table>
```

**Key CSS/Styling**:
- Table: `width: 100%; border-collapse: collapse`
- Header row: light gray background, sticky top
- Category header: `background: var(--thd-color-blue-10); font-weight: bold`
- Feature cell: left-aligned, 500 weight
- Tier cells: center-aligned
- Checkmark: `color: var(--lns-color-primary)` (blurple)
- Cell padding: `var(--lns-space-small)`

**Props Interface**:
```typescript
type ComparisonFeature = {
  name: string
  values: Record<string, string | boolean>
  tooltip?: string
}

type ComparisonCategory = {
  name: string
  features: ComparisonFeature[]
}

type FeatureComparisonTableProps = {
  tiers: string[]
  categories: ComparisonCategory[]
  highlightedTier?: string
  stickyHeader?: boolean
}
```

**Variants**: Full table, Collapsible categories, Mobile-friendly (horizontal scroll or stacked)

---

### 1.11 EyebrowFeatureBlock

**Purpose**: Highlighted feature announcement with "New!" label (e.g., Loom Rewind 2025).

**HTML Structure**:
```html
<section class="eyebrow-feature">
  <span class="eyebrow">New!</span>
  <h2>Loom Rewind 2025</h2>
  <p>Loom customers recorded 93M videos...</p>
  <img src="..." alt="" />
  <a href="...">Read the review</a>
</section>
```

**Key CSS/Styling**:
- Eyebrow: 12-13px, uppercase, semi-bold, accent color (violet/magenta)
- Heading: 28-32px, semi-bold
- Image: square (1:1 aspect ratio)
- Vertical gap: 16-24px

**Props Interface**:
```typescript
type EyebrowFeatureBlockProps = {
  eyebrow: string
  heading: string
  description: string
  image?: { src: string; alt: string; aspectRatio?: string }
  cta?: { label: string; href: string }
}
```

---

### 1.12 EnterpriseBanner

**Purpose**: Dark-themed enterprise feature section with image/video and CTA.

**HTML Structure**:
```html
<section class="enterprise-banner dark">
  <div class="content">
    <h2>Loom for Enterprise</h2>
    <p>Loom for Enterprise helps teams securely manage...</p>
    <a href="/enterprise">Learn more</a>
  </div>
  <div class="visual">
    <img src="enterprise.webp" alt="Results Overview" />
    <video autoplay muted loop />
  </div>
</section>
```

**Key CSS/Styling**:
- Background: dark (navy/black)
- Text: white/light gray
- Grid: 2 columns (content + visual)
- Content max-width: 500-600px
- Image: WebP 3840x3840 optimized
- Glow effect background image
- Section padding: 80-120px vertical

**Props Interface**:
```typescript
type EnterpriseBannerProps = {
  heading: string
  description: string
  cta: { label: string; href: string }
  media: { type: "image" | "video"; src: string }
  darkMode?: boolean
}
```

---

### 1.13 CTAFooterBanner

**Purpose**: Final conversion section before footer.

**HTML Structure**:
```html
<section class="cta-footer">
  <h2>Loom powers great campaigns.</h2>
  <a href="/signup" class="cta-button">Get Loom for free</a>
  <p>For Mac, Windows, iOS, and Android</p>
</section>
```

**Key CSS/Styling**:
- Center-aligned
- Heading: 32-40px, semi-bold
- CTA: primary button style (blurple bg, white text)
- Subtext: 14px, gray
- Section padding: 80-100px vertical
- Button hover: scale or background color shift

**Props Interface**:
```typescript
type CTAFooterBannerProps = {
  heading: string
  cta: { label: string; href: string }
  subtext?: string
}
```

---

### 1.14 FooterNavigation

**Purpose**: Multi-column sitemap navigation and legal links.

**HTML Structure**:
```html
<footer>
  <div class="footer-grid">
    <div class="column">
      <h3>App</h3>
      <ul>
        <li><a href="/pricing">Pricing</a></li>
        <li><a href="/sdk">loomSDK</a></li>
        <!-- 10+ links -->
      </ul>
    </div>
    <!-- Solutions, For Business, Downloads, Resources, Company -->
  </div>
  <div class="legal">
    <a href="/legal">Loom Terms & Policies</a>
    <a href="#">Privacy Policy</a>
  </div>
</footer>
```

**Key CSS/Styling**:
- Grid: 5-6 columns desktop, stacked mobile
- Column heading: 14px, semi-bold, uppercase
- Links: 14px, regular
- Legal: 12px, gray
- Column gap: 40-60px
- Footer padding: 60-80px vertical
- Legal border-top: 1px gray

**Props Interface**:
```typescript
type FooterColumn = {
  heading: string
  links: Array<{ label: string; href: string }>
}

type FooterNavigationProps = {
  columns: FooterColumn[]
  legalLinks?: Array<{ label: string; href: string }>
  logo?: React.ReactNode
  socialLinks?: Array<{ platform: string; href: string; icon: React.ReactNode }>
}
```

---

### 1.15 LoadingSpinner

**Purpose**: Animated dot spinner for async operations.

**HTML Structure**:
```html
<div class="spinner-container">
  <div class="spinner-grid">
    <div class="dot dot-1" />
    <div class="dot dot-2" />
    <!-- 8 dots total -->
    <div class="dot dot-8" />
  </div>
</div>
```

**Key CSS/Styling**:
- Container: 48x48px
- Grid: `grid-template-areas: 'stack'` (all dots overlap)
- Dots: 8px diameter, `color: var(--lns-color-body)`
- Animation: scale 0.65 -> 1.0 -> 0.65, duration 1s, ease-in-out, infinite
- 8 dots at 45-degree intervals, staggered by 0.125s each
- Translate: 20px from center along rotation axis

**Props Interface**:
```typescript
type LoadingSpinnerProps = {
  size?: "sm" | "md" | "lg"
  color?: string
}
```

---

## 2. Theme Analysis

### 2.1 Color Palette

Loom uses a CSS custom properties design system (`--lns-*` for Loom design system, `--thd-*` for theming).

| Token | Role | Estimated Value |
|-------|------|-----------------|
| `--lns-color-blurple` / `--lns-color-primary` | Primary brand color (Loom "blurple") | `#625DF5` (purple-blue) |
| `--thd-color-black` | Headings, primary text | `#1A1A2E` or `#000000` |
| `--lns-color-body` | Body text | `#2D2D3A` (dark gray) |
| `--lns-color-bodyDimmed` | Secondary/muted text, placeholders | `#6B6B80` (medium gray) |
| `--lns-color-grey8` | Badge text, tertiary | `#4A4A5C` (dark gray) |
| `--thd-color-blue-10` | Links, info accents | `#2E5CFF` (bright blue) |
| `--thd-color-blue-20` | Badge backgrounds, light accent | `#E8EDFF` (pale blue) |
| `--lns-color-focusRing` | Accessibility focus rings | `#625DF5` with opacity |
| `--lns-color-formFieldBackground` | Input backgrounds | `#F5F5F7` (very light gray) |
| `--lns-color-formFieldBorder` | Input borders | `#D1D1DB` (light gray) |
| `--lns-color-disabledBackground` | Disabled state bg | `#E8E8ED` |
| `--lns-color-disabledContent` | Disabled state text | `#A0A0B0` |

**Accent Colors (Use-Case Theming)**:
| Token | Role | Estimated Value |
|-------|------|-----------------|
| `green-10` | Sales theme | `#00C389` (teal green) |
| `violet-10` | Engineering theme | `#8B5CF6` (violet) |
| `blue-10` | Support theme | `#2E5CFF` (blue) |
| `yellow-10` | Design theme | `#F5A623` (amber) |
| `magenta` | Testimonial accent | `#E91E8C` (hot pink) |
| `red` | Alert/error accent | `#E53E3E` |

**DaisyUI Semantic Color Mapping**:
```
primary     -> --lns-color-blurple (#625DF5)
primary-content -> white
secondary   -> --thd-color-blue-10 (#2E5CFF)
accent      -> green-10 (#00C389)
neutral     -> --lns-color-body (#2D2D3A)
base-100    -> white (#FFFFFF)
base-200    -> --lns-color-formFieldBackground (#F5F5F7)
base-300    -> --lns-color-formFieldBorder (#D1D1DB)
base-content -> --thd-color-black (#1A1A2E)
info        -> --thd-color-blue-10 (#2E5CFF)
success     -> green-10 (#00C389)
warning     -> yellow-10 (#F5A623)
error       -> red (#E53E3E)
```

### 2.2 Typography

| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| H1 (Hero) | 48-56px | Bold (700) | 1.1-1.2 |
| H2 (Section) | 32-40px | Semi-bold (600) | 1.2-1.3 |
| H3 (Feature/Card) | 24-28px | Semi-bold (600) | 1.3 |
| H4 (Sub-feature) | 20-24px | Semi-bold (600) | 1.4 |
| Body | 16px | Regular (400) | 1.5 |
| Body Large | 18-20px | Regular (400) | 1.5 |
| Small | 14px | Regular (400) | 1.4 |
| Caption/Legal | 12px | Regular (400) | 1.4 |
| Eyebrow | 12-13px | Semi-bold (600), uppercase | 1.3 |
| Button | 16px | Semi-bold (600) | 1 |
| Badge | small | Bold (700), uppercase | 1 |

**Font Family**: `font-family: inherit` used throughout -- Loom uses their own system font stack, likely:
```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
```

Loom's design system calculates sizes from the `--lns-unit: 8px` base unit using `calc()`.

### 2.3 Spacing System

Based on `--lns-unit: 8px`:

| Token | Value | Usage |
|-------|-------|-------|
| `--lns-space-xsmall` | 4px (0.5 units) | Tight gaps |
| `--lns-space-small` | 8px (1 unit) | Icon-text gaps, compact spacing |
| `--lns-space-medium` | 16px (2 units) | Standard padding, grid gaps |
| 3 units | 24px | Card padding, section gaps |
| 4 units | 32px | Card grid gaps, content spacing |
| 5 units | 40px | Column gaps, feature block gaps |
| 6 units | 48px | Image-content gaps |
| 8 units | 64px | Section vertical padding (small) |
| 10 units | 80px | Section vertical padding (standard) |
| 12 units | 96px | Section vertical padding (large) |
| 15 units | 120px | Enterprise section padding |

### 2.4 Shadows and Border Radius

**Border Radius**:
| Token | Value | Usage |
|-------|-------|-------|
| `--lns-radius-100` | 9999px (full) | Buttons, badges, pills |
| `--lns-radius-175` | 14px | Input fields |
| `--lns-radius-full` | 50% | Radio buttons, avatars |
| Standard card | 12-16px | Cards, panels |

**Box Shadows**:
| Usage | Value |
|-------|-------|
| Form field default | `inset 0 0 0 var(--lns-formFieldBorderWidth) var(--lns-color-formFieldBorder)` |
| Form field hover | `inset 0 0 0 var(--lns-formFieldBorderWidthFocus) var(--lns-color-blurple)` |
| Form field focus | `var(--lns-formFieldBorderShadowFocus)` (includes focus ring) |
| Card subtle | `0 1px 3px rgba(0,0,0,0.08)` (estimated) |
| Card elevated | `0 4px 12px rgba(0,0,0,0.12)` (estimated) |

### 2.5 Dark Mode Handling

Loom's site does not appear to have a full dark mode toggle. However:
- Enterprise sections use a dark theme (dark navy/black background, white text)
- Forced-colors mode support: `@media screen and (forced-colors: active) { color: CanvasText; filter: grayscale(1); }`
- CSS variables allow easy dark mode adaptation by redefining `--lns-color-*` tokens

---

## 3. Layout Patterns

### 3.1 Container Strategy

- Max-width constrained content areas (estimated 1200-1280px)
- Centered with auto margins
- Horizontal padding: 16-24px mobile, 40-64px desktop
- Content areas within sections often narrower (800px for text-only)

### 3.2 Grid Patterns

| Pattern | Desktop | Tablet | Mobile |
|---------|---------|--------|--------|
| Pricing tiers | 4 columns | 2 columns | 1 column |
| Use-case cards | 4 columns | 2 columns | 1 column |
| Feature showcase | 2 columns (50/50) | 2 columns | 1 column (stacked) |
| Blog articles | 2 columns | 2 columns | 1 column |
| Footer links | 5-6 columns | 3 columns | 2 columns |
| Logo grid | Auto-fill | Auto-fill | 2-3 columns |
| Feature grid | 3-4 columns | 2 columns | 1 column |

### 3.3 Responsive Approach

- Mobile-first CSS (implied by structure)
- Breakpoints estimated:
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px
- Flex and Grid based (no float layouts)
- Images use Next.js Image component with responsive optimization (`w=2048&q=75`)

### 3.4 Section Spacing

- Consistent vertical rhythm: 60-80px padding between major sections
- Hero: more generous (80-100px)
- Enterprise/CTA: largest (80-120px)
- Internal section gaps: 32-48px between content blocks

---

## 4. Reusable Component Specs (Top 5)

### 4.1 TestimonialCarousel

**Why Reusable**: Every SaaS site needs social proof. Loom's testimonial carousel is well-structured with color theming, avatar/logo support, and auto-advance.

**Tailwind Class Composition**:
```tsx
// Container
"relative overflow-hidden py-16 lg:py-24"

// Card
"flex flex-col gap-6 rounded-2xl p-8 lg:p-10 min-w-[300px] snap-center"

// Quote
"text-lg lg:text-xl font-semibold italic leading-relaxed"

// Attribution row
"flex items-center gap-3 mt-auto"

// Avatar
"w-10 h-10 rounded-full object-cover"

// Name
"text-base font-bold"

// Title
"text-sm text-base-content/60"

// Company logo
"h-8 w-auto opacity-80"
```

**TypeScript Props**:
```typescript
type Testimonial = {
  quote: string
  name: string
  title: string
  company: string
  companyLogo?: string
  avatar?: string
  colorTheme?: "primary" | "secondary" | "accent" | "info"
}

type TestimonialCarouselProps = {
  testimonials: Testimonial[]
  autoAdvance?: boolean
  autoAdvanceInterval?: number  // ms, default 5000
  showDots?: boolean
  showArrows?: boolean
  className?: string
}
```

**Responsive Design**: Single card mobile, 1-3 visible cards desktop via `snap-x snap-mandatory` scroll. Auto-advance with pause on hover.

**DaisyUI Mapping**: Card backgrounds use DaisyUI semantic colors (`bg-primary/10`, `bg-secondary/10`, `bg-accent/10`) for the color theming effect.

---

### 4.2 PricingTable

**Why Reusable**: Complex pricing layouts with billing toggles, badges, feature lists, and comparison tables are needed by virtually every SaaS product.

**Tailwind Class Composition**:
```tsx
// Section
"py-16 lg:py-24"

// Header
"text-center mb-12"

// Controls row
"flex flex-wrap items-center justify-center gap-6 mb-12"

// Radio group
"flex items-center gap-2 bg-base-200 rounded-full p-1"

// Radio option (active)
"px-4 py-2 rounded-full text-sm font-semibold bg-primary text-primary-content"

// Radio option (inactive)
"px-4 py-2 rounded-full text-sm font-semibold text-base-content/60 hover:text-base-content"

// Savings badge
"inline-flex items-center px-3 py-1 rounded-full bg-info/10 text-info text-xs font-bold uppercase"

// Tier grid
"grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"

// Tier card
"flex flex-col rounded-2xl border border-base-300 p-6 lg:p-8"

// Highlighted card
"border-primary ring-2 ring-primary/20 relative"

// Popular badge
"absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center px-3 py-1 rounded-full bg-primary text-primary-content text-xs font-bold uppercase"

// Price
"text-4xl font-bold"

// Period
"text-sm text-base-content/60"

// CTA primary
"btn btn-primary w-full mt-4"

// CTA secondary
"btn btn-outline btn-primary w-full mt-4"

// Feature list
"flex flex-col gap-3 mt-6"

// Feature item
"flex items-start gap-2 text-sm"

// Check icon
"w-4 h-4 text-success flex-shrink-0 mt-0.5"

// NEW badge (inline)
"ml-1 text-xs font-bold text-primary uppercase"
```

**TypeScript Props**: (See full definition in Component Inventory section 1.9)

**Responsive Design**: 1 column mobile, 2 columns tablet, 4 columns desktop. On mobile, highlighted tier appears first.

**DaisyUI Mapping**: Uses `btn`, `btn-primary`, `btn-outline`, card borders with `border-base-300`, badges with semantic colors.

---

### 4.3 FeatureShowcase (Alternating)

**Why Reusable**: The alternating image/content layout is a staple of SaaS marketing pages. Loom executes this cleanly with consistent spacing and CTA patterns.

**Tailwind Class Composition**:
```tsx
// Section
"py-16 lg:py-24 space-y-16 lg:space-y-24"

// Section header (optional)
"text-center max-w-2xl mx-auto mb-16"

// Feature block
"grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"

// Feature block (reversed)
"grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center lg:[&>*:first-child]:order-2"

// Content column
"flex flex-col gap-4"

// Feature heading
"text-2xl lg:text-3xl font-semibold"

// Feature description
"text-base text-base-content/70 leading-relaxed"

// CTA link
"inline-flex items-center gap-2 text-primary font-semibold hover:underline"

// CTA icon
"w-5 h-5"

// Media column
"rounded-xl overflow-hidden shadow-lg"

// Image
"w-full h-auto object-cover"
```

**TypeScript Props**: (See full definition in Component Inventory section 1.4)

**Responsive Design**: Stacks to single column on mobile (content always first). On desktop, alternates image left/right using CSS order.

**DaisyUI Mapping**: Text colors use `text-base-content/70` for muted, `text-primary` for CTAs.

---

### 4.4 LogoCloud

**Why Reusable**: Social proof logos appear on nearly every B2B SaaS site. Loom shows 25+ logos with expandable "View more" pattern.

**Tailwind Class Composition**:
```tsx
// Section
"py-12 lg:py-16"

// Heading
"text-center text-base text-base-content/60 mb-8"

// Logo grid
"flex flex-wrap items-center justify-center gap-x-8 gap-y-6 lg:gap-x-12"

// Logo image
"h-6 lg:h-8 w-auto grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"

// View more button
"mt-8 mx-auto block text-sm text-primary hover:underline"
```

**TypeScript Props**: (See full definition in Component Inventory section 1.3)

**Responsive Design**: Flex-wrap naturally handles responsive. Logos scale down via height constraints. On mobile, fewer visible with "View more" toggle.

**DaisyUI Mapping**: Minimal DaisyUI usage -- primarily Tailwind utilities. Grayscale filter provides the muted, professional look.

---

### 4.5 UseCaseCards (Color-Themed)

**Why Reusable**: Category or use-case cards with distinct color themes are common across product sites. Loom's implementation with 4 color variants is clean and adaptable.

**Tailwind Class Composition**:
```tsx
// Section
"py-16 lg:py-24"

// Card grid
"grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6"

// Card base
"group flex flex-col rounded-2xl overflow-hidden transition-transform hover:-translate-y-1"

// Card color variants (using DaisyUI)
"bg-success/10"    // green - Sales
"bg-secondary/10"  // violet - Engineering
"bg-info/10"       // blue - Support
"bg-warning/10"    // yellow - Design

// Card image
"aspect-[1.2/1] object-cover w-full"

// Card body
"p-6 flex flex-col gap-2"

// Card heading
"text-lg lg:text-xl font-semibold group-hover:text-primary transition-colors"

// Card description
"text-sm text-base-content/70 line-clamp-3"

// View all link
"text-center mt-8"
"inline-flex items-center gap-2 text-primary font-semibold hover:underline"
```

**TypeScript Props**: (See full definition in Component Inventory section 1.6)

**Responsive Design**: 1 column mobile, 2 columns tablet, 4 columns desktop. Cards maintain aspect ratio. Hover effect disabled on touch devices.

**DaisyUI Mapping**: Card backgrounds use DaisyUI semantic color with low opacity (`bg-success/10`, `bg-info/10`, etc.) for the tinted effect. This makes theme switching automatic.

---

## 5. Design System Summary

### Key Takeaways

1. **8px Grid System**: All spacing derives from `--lns-unit: 8px` via `calc()` multipliers.
2. **CSS-in-JS (Emotion)**: Hashed class names (`.css-*`) indicate Emotion/Styled Components -- maps well to Tailwind for our purposes.
3. **CSS Custom Properties**: Heavy use of `--lns-*` and `--thd-*` variables for theming, making dark mode / theme switching straightforward.
4. **Blurple Primary**: Loom's signature purple-blue (`#625DF5`) is the dominant interactive color.
5. **Color-Themed Sections**: Use-case cards and testimonials use per-item color themes via data attributes.
6. **Accessible by Default**: Focus rings, alt text, forced-colors support, semantic HTML throughout.
7. **Next.js Image Optimization**: All images use Next.js Image component with responsive srcset.
8. **Minimal Animation**: Subtle hover transitions (transform, opacity), carousel auto-advance, and a custom loading spinner. No heavy scroll animations.
9. **Whitespace-Heavy**: Premium SaaS aesthetic achieved through generous section padding (60-120px vertical).
10. **Mobile-First Responsive**: Grid layouts collapse from 4 -> 2 -> 1 columns progressively.
