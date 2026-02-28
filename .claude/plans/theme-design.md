# Custom DaisyUI Theme Design: "Skillcraft"

A unique, cohesive color palette synthesized from 5 reference sites: Supabase, Syntax/Protocol, Vercel, OpenAI, and Loom.

---

## Design Philosophy

**Primary Insight**: The best developer-facing sites share three qualities:
1. A distinctive, ownable primary color (not boring blue)
2. A sophisticated neutral scale with subtle personality
3. Status colors that are functional first, vibrant second

Our palette takes:
- **Loom's energy**: A rich indigo-violet primary (`#6C5CE7`) -- distinctive, professional, memorable
- **Vercel's elegance**: Clean, slightly cool neutrals with subtle depth
- **OpenAI's depth**: Rich, layered dark mode with near-black backgrounds
- **Supabase's boldness**: A vivid emerald accent for highlights
- **Syntax's clarity**: A sky blue secondary that reads "technical" and modern

---

## Full Color Palette

### Light Theme: "skillcraft-light"

| Token | Hex | OKLCH | Role |
|-------|-----|-------|------|
| `primary` | `#6C5CE7` | `oklch(56.76% 0.2021 283.08)` | Brand color -- violet/indigo |
| `primary-content` | `#FFFFFF` | `oklch(100% 0 0)` | White text on primary |
| `secondary` | `#0284C7` | `oklch(58.76% 0.1389 241.97)` | Technical blue (links, info) |
| `secondary-content` | `#FFFFFF` | `oklch(100% 0 0)` | White text on secondary |
| `accent` | `#059669` | `oklch(59.60% 0.1274 163.23)` | Emerald highlight (badges, CTAs) |
| `accent-content` | `#FFFFFF` | `oklch(100% 0 0)` | White text on accent |
| `neutral` | `#1A1A2E` | `oklch(22.84% 0.0384 282.93)` | Dark element color (cool-tinted) |
| `neutral-content` | `#E5E5E5` | `oklch(92.19% 0 0)` | Light text on neutral |
| `base-100` | `#FFFFFF` | `oklch(100% 0 0)` | Page background |
| `base-200` | `#F5F5F7` | `oklch(97.07% 0.0027 286.35)` | Section backgrounds, cards |
| `base-300` | `#E5E5EA` | `oklch(92.33% 0.0067 286.27)` | Borders, dividers |
| `base-content` | `#171717` | `oklch(20.46% 0 0)` | Primary text (near-black) |
| `info` | `#2563EB` | `oklch(54.61% 0.2152 262.88)` | Informational blue |
| `info-content` | `#FFFFFF` | `oklch(100% 0 0)` | White text on info |
| `success` | `#16A34A` | `oklch(62.71% 0.1699 149.21)` | Success green |
| `success-content` | `#FFFFFF` | `oklch(100% 0 0)` | White text on success |
| `warning` | `#D97706` | `oklch(66.58% 0.1574 58.32)` | Warning amber |
| `warning-content` | `#171717` | `oklch(20.46% 0 0)` | Dark text on warning |
| `error` | `#EF4444` | `oklch(63.68% 0.2078 25.33)` | Error red |
| `error-content` | `#FFFFFF` | `oklch(100% 0 0)` | White text on error |

### Dark Theme: "skillcraft-dark"

| Token | Hex | OKLCH | Role |
|-------|-----|-------|------|
| `primary` | `#8B7CF6` | `oklch(65.69% 0.1758 286.11)` | Lighter violet for dark bg |
| `primary-content` | `#0A0A0F` | `oklch(14.73% 0.0107 285.01)` | Dark text on primary |
| `secondary` | `#38BDF8` | `oklch(75.35% 0.1390 232.66)` | Brighter sky blue |
| `secondary-content` | `#0A0A0F` | `oklch(14.73% 0.0107 285.01)` | Dark text on secondary |
| `accent` | `#34D399` | `oklch(77.29% 0.1535 163.22)` | Brighter emerald |
| `accent-content` | `#0A0A0F` | `oklch(14.73% 0.0107 285.01)` | Dark text on accent |
| `neutral` | `#0F0F14` | `oklch(17.08% 0.0103 285.25)` | Darkest element color |
| `neutral-content` | `#A0A0B0` | `oklch(71.09% 0.0231 285.80)` | Muted text on neutral |
| `base-100` | `#0A0A0F` | `oklch(14.73% 0.0107 285.01)` | Deep dark background |
| `base-200` | `#16161D` | `oklch(20.35% 0.0139 285.10)` | Card/surface background |
| `base-300` | `#2A2A35` | `oklch(28.97% 0.0199 285.09)` | Borders, dividers |
| `base-content` | `#EDEDED` | `oklch(94.61% 0 0)` | Off-white text |
| `info` | `#60A5FA` | `oklch(71.37% 0.1434 254.62)` | Lighter info blue |
| `info-content` | `#0A0A0F` | `oklch(14.73% 0.0107 285.01)` | Dark text on info |
| `success` | `#4ADE80` | `oklch(80.03% 0.1821 151.71)` | Brighter green |
| `success-content` | `#0A0A0F` | `oklch(14.73% 0.0107 285.01)` | Dark text on success |
| `warning` | `#FBBF24` | `oklch(83.69% 0.1644 84.43)` | Brighter amber |
| `warning-content` | `#171717` | `oklch(20.46% 0 0)` | Dark text on warning |
| `error` | `#F87171` | `oklch(71.06% 0.1661 22.22)` | Softer red |
| `error-content` | `#0A0A0F` | `oklch(14.73% 0.0107 285.01)` | Dark text on error |

---

## Color Rationale

### Primary: Indigo-Violet (#6C5CE7 light / #8B7CF6 dark)
**Inspired by**: Loom's "blurple" (#625DF5) + Syntax's indigo gradients (indigo-200/indigo-400)
**Why**: Violet/indigo is distinctive yet professional. It stands out from the sea of blue SaaS products. The hue (283 OKLCH) sits between Loom's blurple and Syntax's indigo, creating something original. In dark mode, we lighten it to #8B7CF6 for readability.

### Secondary: Sky Blue (#0284C7 light / #38BDF8 dark)
**Inspired by**: Syntax's sky-400/sky-500 accent + Vercel's blue-800 token
**Why**: A technical, modern blue that pairs well with violet. Used for links, secondary actions, and informational contexts. Darker in light mode (#0284C7) for AA contrast (4.1:1 on white).

### Accent: Emerald (#059669 light / #34D399 dark)
**Inspired by**: Supabase's brand green (#3ECF8E) + Loom's green-10 (#00C389)
**Why**: A vivid emerald that pops against both the violet primary and neutral backgrounds. Perfect for success states, badges, and attention-grabbing highlights. Darkened for light mode contrast.

### Neutral Scale
**Inspired by**: OpenAI's opacity-based depth + Vercel's gray scale
**Why**: The neutrals have a subtle cool/blue undertone (hue ~285 in OKLCH) that ties them to the indigo primary without being obviously colored. This creates the "premium" feel seen in Vercel and OpenAI.

- Light mode: Pure white base with barely-cool grays (#F5F5F7, #E5E5EA)
- Dark mode: Near-black with violet undertone (#0A0A0F, #16161D, #2A2A35) -- inspired by OpenAI's deep blacks

### Status Colors
**Info (#2563EB / #60A5FA)**: Classic accessible blue. Distinct from secondary.
**Success (#16A34A / #4ADE80)**: A natural green -- not neon, not mint. Reads "safe" instantly.
**Warning (#D97706 / #FBBF24)**: Warm amber/orange. Dark text content for readability.
**Error (#EF4444 / #F87171)**: Clear, unmistakable red. Visible in both modes.

---

## Contrast Ratio Compliance (WCAG AA)

### Light Mode
| Pair | Ratio | Requirement | Pass |
|------|-------|-------------|------|
| base-content on base-100 | 17.93:1 | 4.5:1 (normal text) | Yes |
| base-content on base-200 | 16.47:1 | 4.5:1 (normal text) | Yes |
| primary on base-100 | 4.86:1 | 4.5:1 (normal text) | Yes |
| primary-content on primary | 4.86:1 | 4.5:1 (normal text) | Yes |
| secondary on base-100 | 4.10:1 | 3:1 (large text/UI) | Yes |
| accent on base-100 | 3.77:1 | 3:1 (large text/UI) | Yes |
| info on base-100 | 5.17:1 | 3:1 (UI components) | Yes |
| success on base-100 | 3.30:1 | 3:1 (UI components) | Yes |
| warning on base-100 | 3.19:1 | 3:1 (UI components) | Yes |
| error on base-100 | 3.76:1 | 3:1 (UI components) | Yes |

### Dark Mode
| Pair | Ratio | Requirement | Pass |
|------|-------|-------------|------|
| base-content on base-100 | 16.87:1 | 4.5:1 (normal text) | Yes |
| base-content on base-200 | 15.38:1 | 4.5:1 (normal text) | Yes |
| primary on base-100 | 5.94:1 | 4.5:1 (normal text) | Yes |
| primary-content on primary | 5.94:1 | 4.5:1 (normal text) | Yes |
| secondary on base-100 | 9.22:1 | 3:1 | Yes |
| accent on base-100 | 10.27:1 | 3:1 | Yes |
| info on base-100 | 7.77:1 | 3:1 | Yes |
| success on base-100 | 11.33:1 | 3:1 | Yes |
| warning on base-100 | 11.83:1 | 3:1 | Yes |
| error on base-100 | 7.14:1 | 3:1 | Yes |

All critical text pairs pass WCAG AA. Status colors meet 3:1 minimum for UI components and large text. The primary color passes the stricter 4.5:1 ratio for normal text in both modes.

---

## Design Tokens (Non-Color)

```
--radius-selector: 2rem     (pill buttons, toggles)
--radius-field: 0.5rem      (inputs, form fields)
--radius-box: 0.75rem       (cards, containers)
--size-selector: 0.25rem    (standard)
--size-field: 0.25rem       (standard)
--border: 1px               (standard border width)
--depth: 1                  (subtle shadow depth)
--noise: 0                  (no noise texture)
```

These radius values are inspired by:
- Supabase's `rounded-md` (6px) for fields
- Syntax's `rounded-full` pill buttons
- Loom's `radius-100` (full) for interactive elements
