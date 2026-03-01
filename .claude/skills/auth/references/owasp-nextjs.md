# OWASP Top 10 (2021) -- Next.js Patterns

Map of OWASP risks to Next.js-specific mitigations and verification steps.

## A01: Broken Access Control

**Risk**: Unauthorized access to protected resources.

**Next.js Mitigation**:
- Middleware route protection (`middleware.ts` matcher patterns)
- Server Action auth checks (`getServerSession` at top of every action)
- API route auth (`getServerSession` before processing requests)
- Never trust client-side auth checks alone -- always verify server-side

**Verify**: Test protected routes without a session. Test API routes with expired/invalid tokens. Confirm middleware covers all protected paths.

## A02: Cryptographic Failures

**Risk**: Sensitive data exposure through weak crypto or plaintext storage.

**Next.js Mitigation**:
- Server secrets in server-only env vars (no `NEXT_PUBLIC_` prefix)
- HTTPS enforcement via `Strict-Transport-Security` header
- Secure cookie flags (`HttpOnly`, `Secure`, `SameSite`) -- NextAuth sets these by default
- Never log tokens, passwords, or session data

**Verify**: `grep -r "NEXT_PUBLIC_" --include="*.ts"` -- ensure no secrets use the public prefix. Check cookies in browser DevTools for secure flags.

## A03: Injection

**Risk**: Code execution through untrusted input (SQL, XSS, command injection).

**Next.js Mitigation**:
- Zod `safeParse` at every API boundary and Server Action
- Parameterized queries (never string concatenation in SQL)
- No `eval()`, `dangerouslySetInnerHTML`, or `new Function()` with user input
- React's built-in XSS protection (JSX escapes by default)

**Verify**: `grep -rn "dangerouslySetInnerHTML\|eval(" --include="*.tsx" --include="*.ts"`. Review all database queries for parameterization.

## A04: Insecure Design

**Risk**: Logic flaws and missing security controls in application design.

**Next.js Mitigation**:
- Rate limiting on auth endpoints and API routes
- Input validation at every boundary (client + server)
- Defense in depth -- multiple validation layers, not just one

**Verify**: Review auth flow end-to-end. Check that rate limiting exists on login/signup. Verify validation happens server-side, not just client-side.

## A05: Security Misconfiguration

**Risk**: Default credentials, verbose errors, missing headers.

**Next.js Mitigation**:
- Security headers in `middleware.ts` or `next.config.ts` (CSP, HSTS, X-Content-Type-Options)
- Custom error pages (`error.tsx`, `not-found.tsx`) that don't expose stack traces
- Remove `X-Powered-By` header (`poweredByHeader: false` in next.config)

**Verify**: `curl -I https://your-site.com` -- check all security headers present. Trigger a 500 error and verify no stack trace in response.

## A06: Vulnerable and Outdated Components

**Risk**: Known vulnerabilities in dependencies.

**Next.js Mitigation**:
- `pnpm audit` regularly, `pnpm audit --production` before releases
- Dependabot or Renovate for automated dependency updates
- Caret ranges (`^`) in package.json for automatic patch updates
- `pnpm.overrides` with exact versions for vulnerability fixes

**Verify**: `pnpm audit --production` shows no critical/high vulnerabilities. Check Dependabot alerts in GitHub.

## A07: Identification and Authentication Failures

**Risk**: Weak auth, session hijacking, credential stuffing.

**Next.js Mitigation**:
- NextAuth.js with JWT strategy and proper token rotation
- CSRF protection (NextAuth handles automatically)
- Secure session cookies with appropriate expiry
- Account lockout after failed attempts

**Verify**: Test session expiry (idle and absolute timeout). Verify CSRF tokens on state-changing requests. Test token rotation on refresh.

## A08: Software and Data Integrity Failures

**Risk**: Untrusted data, unsigned updates, insecure CI/CD.

**Next.js Mitigation**:
- Zod schemas shared between client and server -- single source of truth
- Server Action validation (never trust client-submitted data)
- CSP with nonce-based script loading (prevent script injection)
- Lockfile committed and verified in CI

**Verify**: Verify Zod `safeParse` at every Server Action and API route entry. Check CSP header includes nonce for scripts.

## A09: Security Logging and Monitoring Failures

**Risk**: No audit trail for security events, breaches go undetected.

**Next.js Mitigation**:
- Structured logging for auth events (login, logout, failed attempts)
- Never log sensitive data (tokens, passwords, PII)
- Request ID tracing for correlation across services
- Error tracking service (Sentry, etc.) for production

**Verify**: `grep -rn "console.log.*token\|console.log.*password\|console.log.*secret"` -- ensure no sensitive data logged. Verify auth events produce log entries.

## A10: Server-Side Request Forgery (SSRF)

**Risk**: Server makes requests to attacker-controlled URLs.

**Next.js Mitigation**:
- Validate and allowlist external URLs in server-side `fetch` calls
- Never pass user-controlled input directly to `fetch` target URLs
- Use `next.config.ts` `images.remotePatterns` to restrict image domains
- Block internal network access from user-provided URLs

**Verify**: Review all server-side `fetch` calls. Check `remotePatterns` in next.config. Ensure no user input flows directly into fetch URLs.

## Quick Reference Table

| # | Risk | Key Check |
|---|---|---|
| A01 | Access Control | `getServerSession` in every Server Action and API route |
| A02 | Crypto | No secrets in `NEXT_PUBLIC_*` vars |
| A03 | Injection | Zod `safeParse` at every boundary |
| A04 | Insecure Design | Rate limiting on auth endpoints |
| A05 | Misconfig | Security headers in middleware |
| A06 | Outdated Deps | `pnpm audit --production` clean |
| A07 | Auth Failures | Session expiry + CSRF + token rotation |
| A08 | Data Integrity | Shared Zod schemas client/server |
| A09 | Logging | No sensitive data in logs |
| A10 | SSRF | Allowlist external fetch URLs |
