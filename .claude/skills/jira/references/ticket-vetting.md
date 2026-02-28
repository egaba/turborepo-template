# Ticket Vetting / Backlog Refinement Workflow

Reference for validating/verifying bug tickets from the backlog before they're ready for development. This is **backlog refinement** — triaging intake tickets to confirm they are real, reproducible issues.

## When to Invoke

**Trigger words**: "vet", "validate", "verify", "refine", "refinement", "review intake", "triage"

**Context**: User references the backlog, a "Needs Refinement" epic, or asks to verify/refine whether reported bugs are real.

**This is NOT the standard JIRA implementation workflow.** Vetting/refinement produces no code changes, no branches, no deployments. It moves confirmed bugs from the backlog to the refined epic based on browser verification.

## Epic Pipeline

```
{BACKLOG_EPIC} "Needs Refinement"  ->  (vetting/refinement)  ->  {REFINED_EPIC} "Backlog"
     (backlog)                                                (refined, ready for dev)
```

## Process Per Ticket

### Step 1: Fetch Ticket Details

**Prefer batch fetching** — use `searchJiraIssuesUsingJql` with a `fields` filter instead of individual `getJiraIssue` calls:
```
searchJiraIssuesUsingJql(cloudId, "parent = {BACKLOG_EPIC} ORDER BY created DESC",
  fields=["summary","description","status","priority","comment"], maxResults=20)
```

For individual tickets that need deeper inspection (attachments, full comment threads), use `getJiraIssue` with `fields` to limit payload size.

Key fields to read:
- Summary, description, acceptance criteria
- Attachments and screenshots (if any)
- Comments (may contain repro steps or clarifications)

### Step 2: Scope Check — Can We Verify This?

This vetting process uses browser automation on `{YOUR_SITE}` to verify bugs. Not all tickets in the backlog are user-facing website issues — some may be internal tooling, codebase improvements, or other work that can't be reproduced in the browser.

- **User-facing website tickets** (proceed to Step 3): Mentions a URL, web page, browser behavior, web UI, or anything a user would see on your production site
- **Non-user-facing tickets** (skip to Outcome: Unclear): Internal tooling, codebase/infra changes, mobile app, backend-only, API-only, data pipeline, or anything that can't be verified via browser automation on production

If the ticket doesn't deal with the user-facing website, treat it as **Unclear** — we can't vet it with browser tools.

### Step 3: Assess Reproducibility

Before opening a browser, evaluate:
- Are the repro steps clear enough to attempt?
- Is a specific URL or page mentioned?
- Are expected vs actual behaviors described?
- Does this require a logged-in session? Premium account?

If the ticket is too vague to even attempt reproduction, skip to **Outcome: Unclear**.

### Step 4: Browser Verification

Open the production site using Chrome DevTools MCP:

1. **Fresh browser context** — clear localStorage/sessionStorage/cookies before starting
2. **Navigate** to the relevant page
3. **Follow repro steps** from the ticket
4. **Take screenshots** at each significant step
5. **Check console** for errors related to the reported issue
6. **Check network requests** if the bug involves API calls or data loading

**Login if needed**: Register a fresh account on production or use logout -> login flow. Some bugs only manifest for logged-in, premium, or specific user states.

### Step 5: Determine Outcome

#### Valid (bug confirmed)
- Bug is reproducible on production
- Behavior matches what the ticket describes
- **Action**:
  1. Move ticket to the refined epic ({REFINED_EPIC})
  2. Set status to **"To Do"** (transition ID: 11)
  3. Remove priority (set to "None") — priority will be assigned during sprint planning
  4. Add comment with:
     - Confirmation statement
     - Screenshot evidence
     - Browser/viewport tested
     - Dev context (relevant file paths, code hints for future implementation)

#### Not Valid

Two sub-categories:

**Already done / already implemented:**
- The feature or fix described in the ticket already exists in production
- **Action**:
  1. Transition to **"Done"** (transition ID: 31)
  2. Do NOT assign anyone
  3. Add comment explaining that the work is already complete and the ticket was vetted

**Cannot reproduce / not a bug:**
- Bug is NOT reproducible on production, or the described behavior is a design request, not a bug
- **Action**:
  1. Transition to **"Won't Do"** (transition ID: 71)
  2. Do NOT assign anyone
  3. Add comment explaining why the ticket was closed and that it was vetted

#### Unclear (requirements ambiguous)
- Ticket description is too vague to determine validity
- Can't identify what page/feature is being referenced
- Repro steps are missing or incomplete
- Not a user-facing website issue (internal tooling, codebase, etc.)
- **Action**:
  1. Set status to **"Blocked"** (transition ID: 41)
  2. Do NOT assign anyone
  3. Add comment explaining why the ticket is blocked (what was reviewed, what needs clarification, or why it couldn't be verified via browser)
  4. Leave ticket in its current epic — it stays in the backlog so we know why it's still there

## Agent Team Structure

```
Lead (coordinator — handles JIRA operations)
  |-- jira-qa agent #1 — browser verification (batch of tickets)
  +-- jira-qa agent #2 — browser verification (batch of tickets)
```

### Lead Responsibilities
- Fetch ticket list from intake epic via JQL (batch read — see [Rate Limiting](#atlassian-api-rate-limiting))
- Divide tickets into batches for QA agents
- Review QA agent reports
- Execute ALL JIRA operations (epic moves, transitions, comments) with 5-10s pacing between writes
- QA agents never call Atlassian MCP directly — only the lead writes to JIRA
- On 429 errors, skip and retry at end of batch with 30-60s delays
- Report summary to user

### QA Agent Responsibilities
- Fetch full details for each assigned ticket
- Open production site in browser (Chrome DevTools MCP)
- Attempt to reproduce each bug
- Take screenshot evidence
- Report findings back to lead with verdict (valid / not valid / unclear)

### Batch Sizing
- 4-5 tickets per QA agent (browser verification only — QA agents don't write to JIRA)
- For < 5 tickets total, use a single QA agent
- For > 10 tickets, consider 3 QA agents
- **API budget**: Each vetted ticket costs ~3-4 JIRA write operations (transition + comment + epic move + possibly edit). A batch of 10 tickets = ~30-40 writes. At 5-10s pacing, that's 3-7 minutes of JIRA operations for the lead after all QA reports are in.

## JIRA Operations Reference

### Moving Tickets Between Epics

Use `editJiraIssue` to update the epic link field:
```
editJiraIssue(cloudId, issueKey, { parent: { key: "{REFINED_EPIC}" } })
```

If `parent` doesn't work (classic projects may use `customfield_10014`):
```
editJiraIssue(cloudId, issueKey, { customfield_10014: "{REFINED_EPIC}" })
```

### Transition IDs

> **CUSTOMIZE**: Replace these transition IDs with your project's actual values. You can discover them via `getJiraIssueTransitions`.

| Status | Transition ID |
|--------|--------------|
| To Do | 11 |
| In Progress | 21 |
| Blocked | 41 |
| Done | 31 |
| Won't Do | 71 |

### Comment Format

```markdown
**Vetting Result: [VALID / NOT VALID / UNCLEAR]**

**Tested**: [date] on {YOUR_SITE}
**Browser**: Chrome (via automation)
**Viewport**: Desktop

**Findings**:
[Description of what was observed]

**Evidence**:
[Reference to screenshots or specific observations]

**Next Steps**:
[What should happen next — moved to refined epic / needs updated repro steps / needs clarification on X]
```

### Atlassian API Rate Limiting

The `claude_ai_Atlassian` MCP routes through Anthropic's proxy to Atlassian Cloud REST API v3. Both layers enforce rate limits, and batch vetting workflows hit them hard.

**Known limits**:
- ~100-200 requests/minute per user (Atlassian Cloud, not officially published)
- Burst-friendly but throttles aggressively after a burst — 429 responses can persist for 30-60s

**Strategies for batch vetting**:

1. **Batch reads with JQL** — fetch multiple tickets in one call instead of individual `getJiraIssue` per ticket. Use `fields` filter to reduce payload size.

2. **Combine create + populate into fewer calls** — `createJiraIssue` with minimal payload, then a single `editJiraIssue` to set description + all fields.

3. **Prefer `editJiraIssue` over `addCommentToJiraIssue`** — when rate limited, the edit (PUT) endpoint often succeeds when the comment (POST) endpoint is still throttled.

4. **Space out writes** — when processing a batch of tickets, insert 5-10s delays between JIRA write operations.

5. **Lead batches JIRA writes, QA agents don't touch JIRA** — QA agents only do browser verification and report findings back to the lead.

6. **Degrade gracefully on 429** — if a comment or transition fails with 429, log it and move to the next ticket. Come back for retries at the end of the batch.

## Tips

- **Some bugs are feature requests in disguise** — if the ticket says "add ability to X" and the feature doesn't exist, that's a feature request, not a bug. Mark as unclear and note this.
- **Check multiple viewports** if the bug is visual — mobile (375px), tablet (768px), desktop (1280px).
- **Premium features** require a premium account to verify. If you can't access premium, note this limitation in the report.
- **Locale-specific bugs** — test with the locale mentioned in the ticket.
- **Old tickets may be stale** — if a ticket is >1 year old, the bug may have been fixed incidentally. Still verify.
