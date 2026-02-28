# Visual QA Report: Storybook Component Library

**Date**: 2026-02-28
**Storybook**: v8.5.3 at http://localhost:6006
**Theme**: DaisyUI default light + dark themes
**Font**: Inter (400-900) + JetBrains Mono for code
**Reviewer**: visual-qa agent

---

## Component-by-Component Review

### 1. Typography (Foundations/Typography > TypeScale)

- **Screenshot taken**: Yes (light mode)
- **Visual quality**: 4/5
- **Issues found**:
  - Inter font is loading correctly across all weights (400-900)
  - Display headings (text-6xl, text-5xl, text-4xl) render with proper `tracking-tight` and look premium
  - Body text hierarchy is well-defined: text-lg through text-xs
  - Code/monospace section: JetBrains Mono renders correctly for `<code>` and `<pre>` blocks
  - Color variants (primary, secondary, accent, success, warning, error) all render with correct DaisyUI semantic tokens
  - Muted text opacity variants (70%, 50%) provide good visual hierarchy
- **Suggested improvements**:
  - Consider adding `leading-tight` to display headings (text-5xl and text-6xl) for tighter line height on multiline hero headings
  - The `text-base-content/50` section headings use `text-sm font-semibold uppercase tracking-wider` which is excellent -- matches Supabase/Vercel eyebrow pattern
  - Consider adding a `text-pretty` utility to body text for better text wrapping (Tailwind v4)

### 2. Button (Components/Button > AllVariants, AllSizes)

- **Screenshot taken**: Yes (light mode)
- **Visual quality**: 4/5
- **Issues found**:
  - All four variants render correctly: Primary (purple fill), Secondary (pink fill), Accent (teal fill), Ghost (text only)
  - Size scale (xs through lg) shows proper progression with bottom-aligned flex layout
  - DaisyUI `btn` base class provides proper padding, border-radius, and font-weight
  - **Loading state BUG**: The Loading story renders only a barely-visible spinner with NO button visible. In dark mode the spinner is nearly invisible. The `loading loading-spinner` classes appear to hide the button content text. This needs investigation -- DaisyUI v4 may have changed the loading pattern. The button should show BOTH spinner AND text.
  - Disabled state not visually checked but uses standard `disabled` attribute
- **Suggested improvements**:
  - **FIX (P1)**: Loading state -- the button implementation needs `btn-disabled` or a different loading approach. Current: `loading loading-spinner` hides button content. Consider: add `loading-spinner` as a child element before the text, not as a class on the button itself. Example: `<button class="btn btn-primary"><span class="loading loading-spinner loading-sm"></span> Deploying...</button>`
  - Ghost variant text is barely visible against white background -- consider adding a subtle border or background on hover for better affordance. Compare to Vercel's ghost buttons which use `border border-gray-200` for definition
  - Consider adding `btn-wide` variant for CTA use cases

### 3. Badge (Components/Badge > AllVariants, AllSizes)

- **Screenshot taken**: Yes (light mode)
- **Visual quality**: 4/5
- **Issues found**:
  - All five variants render correctly: Primary (purple), Secondary (pink), Accent (teal), Ghost (neutral bg), Outline (border only)
  - Size scale (sm, md, lg) shows proper progression
  - DaisyUI badge classes are working correctly
  - Ghost variant is very subtle -- may be hard to distinguish from surrounding text
- **Suggested improvements**:
  - Consider adding `badge-info`, `badge-success`, `badge-warning`, `badge-error` variants for semantic status badges (common in SaaS dashboards)
  - The outline variant could benefit from `border-base-content/20` for a more visible border in light mode

### 4. Card (Components/Card > Basic, WithActions, GridLayout)

- **Screenshot taken**: Yes (light mode)
- **Visual quality**: 3.5/5
- **Issues found**:
  - Card renders with `bg-base-100 shadow-xl` -- the shadow is quite heavy for modern SaaS aesthetics
  - Grid layout (3-column) works correctly at the canvas width
  - WithActions variant correctly shows right-aligned action buttons
  - Card title uses DaisyUI's `card-title` class
  - Description text uses `text-base-content/70` for secondary emphasis -- good pattern
- **Suggested improvements**:
  - **FIX (P2)**: Reduce shadow from `shadow-xl` to `shadow-md` or `shadow-lg` for a more modern, subtle look. Supabase and Vercel use very subtle shadows (often just `shadow-sm` with a border)
  - Consider adding `border border-base-200` or `border border-base-content/10` alongside the shadow for more definition, especially in light mode. This matches the Vercel card pattern
  - Card body padding could be slightly more generous -- consider `p-8` instead of default DaisyUI `card-body` padding for section-level cards
  - Add `hover:shadow-lg transition-shadow` for interactive cards (not all cards need this)

### 5. Tabs (Components/Tabs > Default, SecondTabActive)

- **Screenshot taken**: Yes (light mode)
- **Visual quality**: 3.5/5
- **Issues found**:
  - DaisyUI `tabs tabs-bordered` renders correctly with bottom border indicator
  - Active tab shows underline indicator
  - Tab content area has `mt-4` spacing -- adequate but could be more generous
  - Tab labels are plain text -- no special styling for active vs inactive states beyond the underline
- **Suggested improvements**:
  - **FIX (P3)**: Active tab text should be `font-semibold` or `text-primary` to better distinguish from inactive tabs. Currently only the border changes, which is subtle
  - Consider `tabs-lg` for more generous tab padding to match premium SaaS feel
  - Add `transition-colors` for smooth tab switching animation
  - Consider a `tabs-boxed` variant story for an alternative look

### 6. Navbar (Layout/Navbar > Default, MinimalLinks, NoActions)

- **Screenshot taken**: Yes (light mode)
- **Visual quality**: 3/5
- **Issues found**:
  - Navbar renders with DaisyUI's `navbar bg-base-100 shadow-sm`
  - Mobile hamburger menu shows correctly at narrow viewport (the Storybook canvas triggers mobile breakpoint)
  - Desktop links use `menu menu-horizontal` -- they were NOT visible in the screenshot because the canvas was below `lg` breakpoint
  - Action buttons (Sign In + Get Started) are positioned correctly in `navbar-end`
  - Logo text uses `btn btn-ghost text-xl` -- appropriate
- **Suggested improvements**:
  - **FIX (P2)**: The Storybook canvas is too narrow to show desktop nav links. Add a decorator that forces min-width or use the viewport addon to default to desktop view for this story. Desktop links are invisible in default canvas.
  - Consider `sticky top-0 z-50` for the navbar wrapper (not in component, but document in usage)
  - The `shadow-sm` bottom shadow is very subtle. Consider `border-b border-base-200` for more visible separation, matching Vercel's navbar pattern
  - Add `backdrop-blur-lg bg-base-100/80` for a frosted glass effect (very common in reference sites)

### 7. Hero (Sections/Hero > WithEyebrow, Simple, LongDescription)

- **Screenshot taken**: Yes (light + dark mode)
- **Visual quality**: 4.5/5
- **Issues found**:
  - Eyebrow badge uses `badge badge-primary badge-outline font-medium` -- looks great, clearly visible
  - Heading uses `text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl` -- proper responsive sizing
  - Description text uses `text-lg text-base-content/70 sm:text-xl` -- good hierarchy
  - CTA button pair centered with `flex items-center justify-center gap-4` -- proper alignment
  - Vertical padding `py-20 md:py-32` provides generous spacing
  - Dark mode: Renders beautifully with white text on dark background
- **Suggested improvements**:
  - This component is close to production-ready
  - Consider adding optional `gradient` text effect for the heading (like Vercel's hero text-gradient)
  - The description `max-w-2xl` could be `max-w-3xl` for longer descriptions to avoid excessive line-wrapping
  - Consider adding a subtle `animate-fade-in` entrance animation for the hero content

### 8. FeatureCard (Components/FeatureCard > Default, WithLink, FeatureGrid)

- **Screenshot taken**: Yes (light mode)
- **Visual quality**: 4/5
- **Issues found**:
  - Icon area uses `text-3xl text-primary` which renders the SVG icons well in primary color
  - Card uses `shadow-md transition-shadow hover:shadow-xl` -- good interactive feedback
  - "Learn more" link text uses `font-medium text-primary` with arrow -- clean pattern
  - 3-column grid layout renders correctly
  - Card heading uses `card-title text-lg` -- appropriate size
- **Suggested improvements**:
  - Icon container could benefit from a background circle: `rounded-xl bg-primary/10 p-3` to give the icon more visual weight (like Supabase's feature cards)
  - Consider `mb-4` instead of `mb-2` for the icon-to-heading spacing for more breathing room
  - The "Learn more" link could use `group` hover effects: `group-hover:translate-x-1 transition-transform` on the arrow

### 9. Testimonial (Components/Testimonial > Default, WithAvatar, TestimonialGrid)

- **Screenshot taken**: Yes (light + dark mode)
- **Visual quality**: 4/5
- **Issues found**:
  - Left border accent `border-l-4 border-primary` is a nice touch for visual interest
  - Quote text uses `text-base-content/80` -- slightly muted for readability
  - Author info: name in `text-sm font-semibold`, role/company in `text-sm text-base-content/60` -- good hierarchy
  - Avatar uses DaisyUI `avatar` with `w-10 rounded-full` -- properly sized
  - Grid layout (2-column) works well
  - Dark mode: Cards differentiate from background nicely
- **Suggested improvements**:
  - Consider larger quote text -- `text-lg` instead of default base size for more visual impact
  - Add quotation mark decorative element (large `"` character) in `text-primary/20 text-6xl` before the quote for visual polish
  - Avatar could be `w-12` for slightly more presence

### 10. PricingCard (Components/PricingCard > Free, Popular, PricingTiers)

- **Screenshot taken**: Yes (light + dark mode)
- **Visual quality**: 4.5/5
- **Issues found**:
  - Three-tier pricing layout renders correctly in 3-column grid
  - "Popular" card has `border-2 border-primary` -- clearly distinguishes the recommended tier
  - "Popular" badge uses `badge badge-primary badge-sm` -- well-positioned next to tier name
  - Price typography: `text-4xl font-extrabold` for price, `/month` in `text-base-content/60` -- excellent hierarchy
  - Feature list with check icons uses `text-primary` colored SVGs -- consistent and clean
  - CTA buttons are full-width with different variants per tier (ghost, primary, secondary) -- good differentiation
  - Dark mode: Excellent rendering, cards stand out well against dark background
- **Suggested improvements**:
  - Consider `scale-105` or `relative z-10` on the Popular card to make it visually elevated above the other tiers
  - Add `shadow-lg` specifically to the Popular card for more emphasis
  - The feature list `text-sm` could be `text-base` for better readability at this card size

### 11. Footer (Layout/Footer > Default, Minimal)

- **Screenshot taken**: Yes (light + dark mode)
- **Visual quality**: 4/5
- **Issues found**:
  - Uses `bg-base-200` for visual separation from main content -- works well in both themes
  - Column headings use `text-sm font-semibold uppercase tracking-wider text-base-content/50` -- matches Typography eyebrow pattern
  - Link items use `text-sm text-base-content/70 hover:text-base-content transition-colors` -- good interactive states
  - Bottom bar with copyright and social icons uses `border-t border-base-300` separator
  - Social icons properly sized at `h-5 w-5` with hover color transition
  - Dark mode: `bg-base-200` adapts well
  - **Layout issue**: At the Storybook canvas width, the `lg:grid-cols-5` breakpoint doesn't trigger, so columns stack into 2-column view instead of the intended 5-column layout
- **Suggested improvements**:
  - Same as Navbar -- needs a wider canvas or viewport decorator for proper desktop preview
  - Consider adding a tagline or short description under the logo in the brand column
  - Social icons could use `opacity-60 hover:opacity-100` pattern instead of color change for subtler interaction

### 12. CTASection (Sections/CTASection > Default, Simple)

- **Screenshot taken**: Yes (light + dark mode)
- **Visual quality**: 4/5
- **Issues found**:
  - Full-width banner uses `bg-primary text-primary-content` -- strong visual impact
  - `rounded-2xl` gives modern card-like appearance
  - Heading uses `text-3xl font-bold tracking-tight sm:text-4xl`
  - Description uses `text-primary-content/80` for slightly muted secondary text
  - CTA buttons: Primary CTA uses `btn btn-secondary btn-lg` (pink on purple background) -- high contrast
  - Secondary CTA uses `btn btn-ghost btn-lg text-primary-content` -- white text ghost button
  - Dark mode: Works well, though the primary color appears slightly lighter/less saturated
- **Suggested improvements**:
  - Consider adding a subtle pattern or gradient overlay for more visual depth: `bg-gradient-to-r from-primary to-primary/80`
  - The `px-6 sm:px-12` horizontal padding could be increased to `px-8 sm:px-16` for more generous breathing room
  - Consider adding `py-20` instead of `py-16` for more vertical presence

### 13. LogoCloud (Components/LogoCloud > Default, WithLinks, NoHeading)

- **Screenshot taken**: Yes (light mode)
- **Visual quality**: 2.5/5
- **Issues found**:
  - **Visual issue**: Logo placeholders render as black rectangles. The SVG data URIs have a gray background (#e5e7eb) with gray text (#6b7280), but the `grayscale` filter + rendering makes them appear as solid dark blocks. The company names inside the SVGs are not visible.
  - Heading "TRUSTED BY INDUSTRY LEADERS" uses proper uppercase tracking-wider muted style
  - Logo container uses `flex flex-wrap items-center justify-center gap-8 md:gap-12` -- correct layout
  - `grayscale hover:grayscale-0 transition-all` is the right pattern for logo clouds
  - Logo sizing `h-8 max-w-[120px] md:h-10` is appropriate
- **Suggested improvements**:
  - **FIX (P2)**: The placeholder SVGs need better contrast. Either: (a) use actual logo images, (b) change placeholder SVG fill to transparent with visible text, or (c) remove `grayscale` filter on the placeholder SVGs. The current rendering looks like censored/redacted bars rather than logos.
  - Consider `opacity-60 hover:opacity-100` in addition to the grayscale filter for more pronounced hover effect
  - Consider `gap-12 md:gap-16` for more generous spacing between logos

### 14. Section (Layout/Section > WithHeading, ContentOnly)

- **Screenshot taken**: Yes (light + dark mode)
- **Visual quality**: 4/5
- **Issues found**:
  - Section wrapper uses `py-16 md:py-24` -- generous vertical padding matching reference sites
  - Max-width `max-w-7xl` with responsive horizontal padding `px-4 sm:px-6 lg:px-8` -- proper container pattern
  - Heading centered with `text-3xl font-bold tracking-tight sm:text-4xl` -- matches Hero heading style
  - Description centered with `max-w-2xl mx-auto text-lg text-base-content/70`
  - `mb-12` between header and content provides good separation
  - ContentOnly variant works as plain padded container -- flexible
  - Dark mode: Works perfectly with DaisyUI color tokens
- **Suggested improvements**:
  - This component is production-ready
  - Consider adding an optional `id` prop for anchor navigation
  - Consider alternating `bg-base-100` and `bg-base-200` section backgrounds pattern for visual rhythm

---

## Dark Mode Assessment

**Overall dark mode quality**: 4.5/5

Dark mode is handled automatically by DaisyUI's semantic color tokens, and it works exceptionally well across all components.

### Strengths
- All `text-base-content` and `bg-base-*` tokens adapt correctly
- Card components (`bg-base-100`) properly differentiate from page background
- Footer `bg-base-200` provides correct visual hierarchy
- Opacity modifiers (`text-base-content/70`, `/50`, `/60`) maintain proper contrast ratios
- Primary color (purple) remains vibrant in dark mode
- CTA section primary background is still impactful

### Issues
- Button Loading state: spinner nearly invisible against dark background (P1 fix)
- Card `shadow-xl` creates more dramatic shadows in dark mode than light -- inconsistent feel
- LogoCloud placeholder SVGs look even worse in dark mode (black bars on dark background)

---

## Font / Typography Assessment

**Overall typography quality**: 4.5/5

### Strengths
- Inter font loads correctly with all 6 weight variations (400-900)
- JetBrains Mono loads for code blocks
- Display headings use `font-extrabold tracking-tight` -- matches premium SaaS pattern
- Body text hierarchy is well-defined with consistent use of size + opacity for emphasis
- Eyebrow/label pattern (`text-sm font-semibold uppercase tracking-wider text-base-content/50`) is used consistently across Typography, Footer, and Section

### Issues
- No explicit line-height customization -- relies on Tailwind defaults, which are generally good but could be tighter for display text
- No `text-balance` or `text-pretty` utilities used (Tailwind v4 feature for better text wrapping)

---

## Overall Assessment

### Overall Visual Quality Rating: 3.8/5

The component library has a solid foundation with DaisyUI + Tailwind. Typography, color system, and dark mode all work well. The main gaps are in visual polish details that separate "good" from "Supabase/Vercel-quality."

### Production-Ready Components (minimal or no changes needed)
1. **Hero** -- 4.5/5, very close to shipping quality
2. **PricingCard** -- 4.5/5, well-structured with good visual hierarchy
3. **Section** -- 4/5, clean wrapper component
4. **Typography** -- 4/5, solid foundation
5. **Testimonial** -- 4/5, good structure and styling
6. **CTASection** -- 4/5, strong visual impact
7. **FeatureCard** -- 4/5, good card pattern

### Components Needing Work
1. **Button (Loading state)** -- 2/5, broken loading state
2. **LogoCloud** -- 2.5/5, placeholder rendering issue
3. **Card** -- 3.5/5, shadow too heavy
4. **Navbar** -- 3/5, desktop view not visible in Storybook, needs frosted glass
5. **Tabs** -- 3.5/5, active state needs more visual distinction

---

## Top 5 Highest Priority Fixes

### 1. [P1] Fix Button Loading State
**Component**: `packages/ui/src/button.tsx:38`
**Issue**: `loading loading-spinner` class hides button content entirely
**Fix**: Replace the loading class pattern with an inline spinner element:
```tsx
// Current (broken):
className={`btn ${variantClass[variant]} ${sizeClass[size]} ${loading ? 'loading loading-spinner' : ''}`}

// Proposed fix:
<button className={`btn ${variantClass[variant]} ${sizeClass[size]}`} disabled={loading || props.disabled} {...props}>
  {loading && <span className="loading loading-spinner loading-sm" />}
  {children}
</button>
```

### 2. [P2] Reduce Card Shadow Weight
**Component**: `packages/ui/src/card.tsx:11`
**Issue**: `shadow-xl` is too heavy for modern SaaS aesthetics
**Fix**: Change to `shadow-md` and add a subtle border:
```tsx
// Current:
<div className={`card bg-base-100 shadow-xl ${className}`}>

// Proposed:
<div className={`card bg-base-100 border border-base-content/5 shadow-md ${className}`}>
```
Also update FeatureCard's shadow from `shadow-md` to `shadow-sm` with the same border pattern.

### 3. [P2] Fix Navbar Desktop View in Storybook
**Component**: `packages/ui/src/navbar.stories.tsx`
**Issue**: Desktop nav links invisible due to canvas width < lg breakpoint
**Fix**: Add a decorator that sets minimum width:
```tsx
decorators: [(Story) => <div style={{ minWidth: '1024px' }}>{Story()}</div>]
```

### 4. [P2] Fix LogoCloud Placeholder Rendering
**Component**: `packages/ui/src/logo-cloud.stories.tsx`
**Issue**: SVG data URI placeholders render as black bars with invisible text
**Fix**: Update placeholder SVG to use transparent background with visible text:
```tsx
const placeholderLogo = (text: string) =>
  `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="120" height="40" viewBox="0 0 120 40"><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui" font-size="14" font-weight="600" fill="%239ca3af">${text}</text></svg>`)}`
```

### 5. [P3] Enhance Tab Active State Visibility
**Component**: `packages/ui/src/tabs.tsx:27`
**Issue**: Active tab only shows underline border change, needs stronger visual distinction
**Fix**: Add font-weight and color change for active state:
```tsx
className={`tab ${index === activeIndex ? 'tab-active font-semibold text-primary' : 'text-base-content/60'}`}
```

---

## Additional Recommendations (Lower Priority)

- **Navbar**: Add `backdrop-blur-lg bg-base-100/80` for frosted glass effect
- **FeatureCard**: Add `rounded-xl bg-primary/10 p-3` icon container background
- **Testimonial**: Increase quote text to `text-lg`, add decorative quotation marks
- **PricingCard**: Add `scale-105 shadow-lg` to the Popular tier card
- **Card**: Add `hover:shadow-lg transition-shadow` for interactive card variants
- **All components**: Consider using DaisyUI's `border-base-content/5` consistently as a subtle card border across Card, FeatureCard, Testimonial, PricingCard for unified look
- **Theme**: The default DaisyUI light/dark themes are functional but generic. A custom theme with refined color palette would significantly elevate the visual quality. See `.claude/plans/theme-design.md` for custom theme recommendations.
