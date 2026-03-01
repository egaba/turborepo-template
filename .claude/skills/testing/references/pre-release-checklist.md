# Pre-Release Checklist

Run through this checklist before any production release. Each item must be verified -- not assumed.

## Functional

- [ ] All tests pass (unit, integration, E2E)
- [ ] Cross-browser verified: Chrome, Firefox, Safari, Edge
- [ ] Responsive verified: 375px, 768px, 1024px, 1920px
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] No console errors or warnings in browser

## Performance

- [ ] Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms
- [ ] Images use `next/image` with correct `sizes` attribute
- [ ] Fonts loaded via `next/font` (no layout shift)
- [ ] No unnecessary client-side JavaScript (check `'use client'` boundaries)

## Security

- [ ] Security headers present (CSP, HSTS, X-Content-Type-Options)
- [ ] No secrets in client code (`NEXT_PUBLIC_` prefix only for public values)
- [ ] Input validation at all API boundaries (Zod `safeParse`)
- [ ] Auth required on all non-public endpoints

## Accessibility

- [ ] Accessibility audit passed (axe-core or Lighthouse)
- [ ] Screen reader tested on critical flows
- [ ] Color contrast meets WCAG AA (4.5:1 for text)

## Deployment

- [ ] Error boundaries (`error.tsx`) and not-found pages in place
- [ ] Visual regression baselines updated (if UI changed)
- [ ] Environment variables set in deployment target
- [ ] Rollback plan documented

## Verification Commands

```bash
pnpm turbo run check-types     # Type errors
pnpm turbo run lint             # Lint violations
pnpm turbo run test:ci          # All tests
pnpm turbo run build            # Production build
npx playwright test             # E2E tests
```
