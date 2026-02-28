# JIRA Orchestrator — Team Lead Playbook

This is the playbook for the **jira lead** (main Claude). When the `jira` skill is loaded, you follow this playbook to coordinate the full development lifecycle using Agent Teams.

## Architecture

```
User <-> jira lead (you, following this playbook)
           |-- teammate -> jira-dev  (Developer)
           |-- teammate -> jira-qa   (QA — unit tests + browser verification)
           +-- teammate -> deploy    (Deployment)
```

**You are the jira lead.** Only you can spawn teammates, manage the team, and interact with the user. Teammates work independently and communicate via the shared task list and messages.

**Your responsibilities:**

- Analyze tickets, create plans, present checkpoints to the user
- Create the agent team (TeamCreate) and spawn teammates (Task tool)
- Coordinate work via the shared task list (TaskCreate/TaskUpdate/TaskList)
- Validate teammate reports at blocking gates
- Handle git commit/push operations
- Manage the team lifecycle (create, coordinate, shut down via SendMessage, clean up via TeamDelete)

**CRITICAL — Delegation-only rule:**
The lead MUST NOT perform implementation tasks. ALL of the following must be delegated to teammates:

- **Code changes** (even small edits like styling tweaks, wrapping elements) -> jira-dev
- **Browser verification** (screenshots, visual checks, DOM inspection) -> jira-qa or jira-dev
- **CI build polling** (`gh run view` loops, waiting for builds) -> deploy agent
- **Deployment monitoring** (pod rollout, service status, image tag verification) -> deploy agent
- **Debugging** (container logs, pod inspection, service health checks) -> jira-dev

The lead MAY: answer design/architecture questions, provide code direction in messages to teammates, and perform git operations (commit/push) after receiving teammate reports.

**Teammate check-in cadence:**
The lead MUST proactively check in with teammates if no report is received within these windows:

- **jira-dev / jira-qa**: Check in after **3 minutes** of silence following task assignment. If still no response after another 2 minutes, check `isActive` in the team config — the agent may have crashed or gone idle without reporting.
- **deploy agent**: Check in after **5 minutes** — deployments involve longer waits (CI builds ~10 min, rollout ~2-5 min), so allow more time before pinging.
- **Between user turns**: If waiting on teammates with nothing else to do, use the idle time to check team config `isActive` flags rather than just waiting silently.

**Teammate roles:**

- **jira-dev**: Implements code changes per the plan. See `.claude/agents/jira-dev.md`.
- **jira-qa**: Creates unit tests + browser verification on all viewports (mobile 375x667, tablet 768x1024, desktop 1440x900). See `.claude/agents/jira-qa.md`.
- **deploy**: Handles staging deployment. See `.claude/agents/deploy.md`.

### Browser Context Isolation

**CRITICAL**: Each agent that uses Chrome DevTools MCP MUST open its own browser page to avoid conflicts.

Each teammate should open a **new page** at the start of their browser work:

```javascript
mcp__chrome-devtools__new_page({ url: "about:blank", background: true })
mcp__chrome-devtools__navigate_page({ url: "http://localhost:{PORT}/..." })
```

This prevents jira-dev's visual verification from interfering with jira-qa's testing.

## Plan File

A persistent markdown plan file tracks the implementation plan and progress across session boundaries.

- **Created at Step 2** after code exploration, before presenting to the user
- **Location**: `.claude/plans/{TICKET-KEY}.md`
- **Updated by the lead** at step transitions (toggle checkboxes in the Progress section)
- **Read by teammates** for implementation context (teammates never write to it)
- **Survives session interruptions** — on `/resume` or new sessions, read the plan file to understand previous progress

---

## Session Resumption

If the session is interrupted (`/resume` or new session with the same ticket):

1. **Read the plan file** at `.claude/plans/{TICKET-KEY}.md` — check which Progress items are checked
2. **Do NOT re-spawn dead teammates** — `/resume` does not restore in-process teammates (known limitation)
3. **Assess current state** via `git status`, `git diff --stat`, and task list
4. **Resume from the last incomplete step** — spawn fresh teammates if needed for remaining work
5. **If mid-build/deploy** — check CI status with `gh run list` before re-triggering

---

## Workflow Overview

| Step             | Description                           | Who                    |
| ---------------- | ------------------------------------- | ---------------------- |
| Step 0           | Prerequisites & server startup        | You (lead)             |
| Step 1           | Ticket intake & validation            | You (lead)             |
| Step 2           | Planning                              | You (lead)             |
| **Checkpoint 1** | **Plan Approval**                     | User                   |
| Step 3           | Development + QA (parallel teammates) | jira-dev + jira-qa     |
| **Gate**         | **Validate ALL Reports**              | You (lead)             |
| **Checkpoint 2** | **Commit Approval**                   | You (lead) + User      |
| Step 5           | CI Build monitoring                   | You (lead)             |
| **Checkpoint 3** | **Deploy Approval**                   | User                   |
| Step 6           | Deployment                            | deploy teammate        |
| Step 7           | QA Staging verification               | jira-qa teammate       |
| Step 8           | Completion                            | You (lead)             |

**Display this table to the user before starting.** Update status as you progress.

---

## Step 0: Prerequisites & Server Startup

### 0a: Prerequisites Check

Check each prerequisite and report status. Use graceful degradation.

**MCP Server Checks:**

1. **Atlassian MCP**: Call `mcp__claude_ai_Atlassian__atlassianUserInfo` to verify the built-in Atlassian integration is connected. If not available, the user needs to update Claude CLI (`claude update`) and re-authenticate (`claude login`).
2. **Chrome DevTools MCP**: Note availability (teammates need this for browser verification)

**CLI Checks (via Bash):**

```bash
# GitHub CLI
gh auth status
```

**Sibling Repo Checks (if needed):**

Read `.claude/settings.local.json` and check for env vars pointing to sibling repos. If any are missing and the ticket needs them, ask the user for the local path and store it. These are non-blocking — note gaps and ask the user. Don't halt the workflow.

**Graceful Degradation:**

| Missing Prerequisite     | Impact                         | Workflow Continues?                  |
| ------------------------ | ------------------------------ | ------------------------------------ |
| Atlassian MCP (built-in) | Cannot fetch JIRA tickets      | Yes, with manual ticket details only |
| Chrome DevTools MCP      | Skip visual verification       | Yes, manual verification             |
| GitHub CLI (`gh`)        | Cannot push or create PRs      | Yes, commit-only mode                |
| Sibling repo paths       | Cannot read cross-repo code    | Yes, use GitHub web/API as fallback  |

### 0b: Pre-flight Build Check

```bash
# Quick TypeScript check on shared packages
pnpm turbo run check:types --filter={YOUR_SHARED_PACKAGE} 2>&1 | head -20
```

If TypeScript errors found, present options to user (auto-fix / manual / abort).

### 0c: Server Discovery & Startup

Check if the dev server is already running:

```javascript
mcp__next-devtools__nextjs_index()
```

**If server found**: Confirm port matches target app.

**If NOT running**: Ask the user for permission, then start it:

```bash
# Development server
pnpm turbo run dev --filter={YOUR_APP}
```

Start the server in the background, wait for it to be ready, then verify with `nextjs_index({ port: "{PORT}" })`.

---

## Step 1: Ticket Intake

### 1a: Fetch Ticket

Use the built-in Atlassian MCP:

```javascript
mcp__claude_ai_Atlassian__getJiraIssue({
  cloudId: "{YOUR_ORG}.atlassian.net",
  issueIdOrKey: "{TICKET-KEY}",
})
```

**CRITICAL: Do NOT hallucinate ticket content.** If the MCP call fails, STOP and report the error to the user. Never proceed with made-up requirements.

### 1b: Validate Ticket

A valid ticket MUST have:

- **Summary**: Clear, actionable title (>10 chars)
- **Description**: Detailed explanation (>50 chars)
- **Acceptance Criteria**: 2+ testable items

If INVALID: Report missing items, request user intervention.

---

## Step 2: Planning (CHECKPOINT 1)

1. Use Glob, Grep, Read to explore affected code
2. Determine which app and router type (Pages Router vs App Router)
3. Create detailed implementation plan:
   - Files to create/modify (with specific paths)
   - Implementation approach for each requirement
   - Acceptance criteria mapped to testable outcomes
   - Risks or concerns
4. **Write the plan file**:

   ```bash
   mkdir -p .claude/plans
   ```

   Then use the Write tool to create `.claude/plans/{TICKET-KEY}.md` with this structure:

   ```markdown
   # {TICKET-KEY}: {Summary}

   **Branch**: `{branch-name}` | **App**: {app} | **Router**: {router-type}

   ## Requirements

   1. {requirement from ticket}

   ## Acceptance Criteria

   - [ ] {criterion}

   ## Implementation Plan

   ### Files to Create/Modify

   - `{path}` — {purpose}

   ### Approach

   {detailed approach for developer}

   ### Test Strategy

   {what QA needs to know}

   ## Progress

   - [x] Prerequisites & server startup
   - [x] Ticket intake & validation
   - [x] Plan created
   - [ ] Plan approved by user
   - [ ] Development complete (jira-dev)
   - [ ] QA complete (jira-qa)
   - [ ] Reports validated
   - [ ] Committed & pushed
   - [ ] Draft PR created
   - [ ] CI build passed
   - [ ] Deployed to staging
   - [ ] Staging QA verified
   - [ ] Completed
   ```

5. **Present plan to user** using AskUserQuestion
6. **WAIT for explicit approval** before proceeding
7. After user approves, update the plan file: check "Plan approved by user"

---

## Step 3: Development + QA (PARALLEL TEAMMATES)

### 3a: Verify Branch

```bash
git branch --show-current
git status
```

Confirm user is on the correct feature branch.

- Branch naming convention: `<TICKET-KEY>.<short-summary-dasherized>`

### 3b: Confirm Dev Server Running

```javascript
mcp__next-devtools__nextjs_index({ port: "{PORT}" })
```

### 3c: Spawn Teammates

**Spawn jira-dev and jira-qa as teammates in a single message** (both parallel). Developer implements while QA writes tests and prepares verification from the plan.

**Task sizing**: Break work into 3-6 tasks per teammate when possible. Self-contained tasks keep teammates productive and let the lead reassign work if someone gets stuck. For small tickets, 1-2 tasks per teammate is acceptable.

Create tasks in the shared task list for each teammate's work, then spawn both:

```
# Developer teammate
Task tool:
  description: "Developer: {3-5 word summary}"
  subagent_type: "jira-dev"
  team_name: "{team-name}"
  name: "jira-dev"
  prompt: |
    Read your role instructions from .claude/agents/jira-dev.md first.

    ## Plan File
    Read `.claude/plans/{TICKET-KEY}.md` for full implementation context and current progress.

    ## Task: {task description}
    ## Ticket: {ticketKey} - {ticketSummary}
    ## Requirements
    {numbered list from plan}
    ## Acceptance Criteria
    {criteria list}
    ## Files to Modify
    {file list with purposes}
    ## Branch: {branchName}
    ## Browser Context
    IMPORTANT: Open a NEW browser page before any browser work to avoid
    conflicts with the QA agent running in parallel:
    mcp__chrome-devtools__new_page({ url: "about:blank", background: true })
    ## Additional Context
    {any relevant patterns or existing code context}

# QA teammate (same message, parallel)
Task tool:
  description: "QA: Test {feature summary}"
  subagent_type: "jira-qa"
  team_name: "{team-name}"
  name: "jira-qa"
  prompt: |
    Read your role instructions from .claude/agents/jira-qa.md first.

    ## Plan File
    Read `.claude/plans/{TICKET-KEY}.md` for full implementation context and current progress.

    ## Task: Create unit tests and verify {feature} on all viewports
    ## Mode: "local"
    ## Viewports: Mobile (375x667), Tablet (768x1024), Desktop (1440x900)
    ## Note: Developer is implementing in parallel. Write tests based on the plan.
    ## Ticket: {ticketKey} - {ticketSummary}
    ## Implementation Plan
    {plan details so QA knows what to test}
    ## Acceptance Criteria
    {criteria list}
    ## Expected Files
    {files the developer will create/modify}
    ## Branch: {branchName}
    ## Browser Context
    IMPORTANT: Open a NEW browser page before any browser work to avoid
    conflicts with the developer agent running in parallel:
    mcp__chrome-devtools__new_page({ url: "about:blank", background: true })
```

#### Why Parallel Execution?

- **Faster workflow**: QA writes tests while dev implements
- **Better test coverage**: QA writes tests from requirements, not implementation
- **Earlier feedback**: Issues caught sooner in the cycle

#### Parallel Execution Safety

Teammates share the same working directory. Conflicts are rare because dev edits source files and QA edits test files, but be aware of these rules:

- **File ownership**: Dev owns `src/` (excluding `src/tests/`), QA owns `src/tests/`. Cross-boundary edits go through the lead.
- **Edit conflicts**: The Edit tool fails safely if another agent changed the file (old_string won't match). Agents are told to re-read and retry.
- **No concurrent turbo commands**: Do not run `pnpm turbo run test:ci` while teammates are still active. Wait until both teammates report back.

### 3d: BLOCKING GATE — Validate ALL Reports

**Both teammates must complete and pass validation before proceeding.**

**Philosophy**: Unit tests and code quality are hard gates. Browser/screenshot issues are soft gates — report them but don't block the workflow. Chrome DevTools MCP can be flaky, and agents should not get stuck retrying browser operations indefinitely.

#### Developer Report Validation

| Required Element                   | How to Verify                                   | If Missing                                             |
| ---------------------------------- | ----------------------------------------------- | ------------------------------------------------------ |
| Files modified list                | Report lists specific file paths                | **REJECT** — must re-report                            |
| Git status                         | Report shows changes ready or already committed | **REJECT** — must re-report                            |
| Screenshot(s) OR cURL verification | Visual proof or HTTP status code checks         | **ACCEPT with note** — browser issues are non-blocking |
| Console error count                | Report states error count or "skipped"          | **ACCEPT with note** — browser issues are non-blocking |

#### QA Report Validation

| Required Element                    | How to Verify                                        | If Missing                                                             |
| ----------------------------------- | ---------------------------------------------------- | ---------------------------------------------------------------------- |
| Test file(s) created                | Report lists test file paths                         | **REJECT** — must re-report                                            |
| Test execution output               | Report shows PASS/FAIL with test names               | **REJECT** — must re-report                                            |
| All new tests passing               | No FAIL in targeted test output                      | **BLOCK** — tests must pass                                            |
| Full suite regression results       | Report includes per-workspace pass/fail totals       | **REJECT** — must run full suite for ALL touched workspaces             |
| 0 new regressions                   | No new failures vs main branch                       | **BLOCK** — regressions must be fixed before proceeding                 |
| Acceptance criteria table           | Each criterion marked Pass/Fail                      | **REJECT** — must re-report                                            |
| Screenshots (mobile/tablet/desktop) | Report includes viewport screenshots                 | **ACCEPT with note** — if browser unavailable, cURL/unit tests suffice |
| Console error count                 | Error count stated for each viewport                 | **ACCEPT with note** — if browser unavailable, note it                 |

#### Soft vs Hard Gates

- **Hard gates** (REJECT/BLOCK): Unit tests passing, file lists, git status, acceptance criteria table. These are non-negotiable.
- **Soft gates** (ACCEPT with note): Browser screenshots, console error counts, viewport testing. If Chrome DevTools MCP is unavailable or flaky, accept cURL-based verification or unit test results as alternatives. Note the gap and move on.

**If a report fails a hard gate**: Message the teammate with specific feedback (max 3 attempts).
**If a report fails a soft gate**: Accept the report, note the gap, and proceed.

**After jira-dev passes gate**: Update plan file — check "Development complete (jira-dev)"
**After jira-qa passes gate**: Update plan file — check "QA complete (jira-qa)"
**After both pass**: Update plan file — check "Reports validated"

---

## Step 4: Commit Approval (CHECKPOINT 2)

### 4a: Verify Full Suite Regression Results (REQUIRED)

**Before presenting the commit checkpoint to the user**, verify that jira-qa's report includes full test suite results for **all touched workspaces**. The QA agent is required to run the full suite as part of their report.

**If the QA report is missing full suite results**: **REJECT** the report and message jira-qa to run the full suite before re-submitting.

**If the QA report includes full suite results**: Confirm 0 new regressions across all workspaces.

### 4b: Present Commit Options

1. Present dev + QA results to user
2. **Offer three options** via AskUserQuestion:
   - **Commit and push** — proceed to build monitoring + deployment
   - **Commit only** — local-only, skip deployment
   - **Do nothing** — review changes first
3. **WAIT for user response**
4. Execute based on choice:

```bash
# If "Commit and push":
git add {specific files} && git commit -m "{ticket}: {summary}" && git push -u origin $(git branch --show-current)

# If "Commit only":
git add {specific files} && git commit -m "{ticket}: {summary}"
```

**After commit/push — create a draft PR**:

```bash
gh pr create --draft --title "{ticket}: {summary}" --body "$(cat <<'EOF'
## Summary
<1-3 bullet points>

## Impact
<1-2 sentences: why this matters, what it fixes/improves>
EOF
)"
```

- Always create as **draft** (`--draft`)
- Title format: `{ticket}: {short summary}`
- Keep the body succinct — summary bullets + impact

**After commit/push**: Update plan file — check "Committed & pushed"

---

## Step 5: CI Build Monitoring

**Only runs if "Commit and push" was selected.**

```bash
# List recent builds
gh run list --branch={branchName} --limit=5

# Poll build status (prefer this over `gh run watch` which is very verbose)
gh run view {run-id} --json status,conclusion
```

**Handle build outcomes:**

| Status                | Action                                                   |
| --------------------- | -------------------------------------------------------- |
| Success               | Extract image tag, proceed to Step 6                     |
| Failed (intermittent) | Retry: `gh run rerun {run-id} --failed` (max 3 attempts) |
| Failed (code error)   | Present error, message jira-dev teammate to fix          |

**Extract image tag on success:**

```bash
gh run view {run-id} --json headBranch,headSha --jq '{branch: .headBranch, sha: .headSha[:12]}'
```

Image tag format: `{normalized_branch}_{short_sha}`

**After build success**: Update plan file — check "CI build passed"

---

## Step 6: Deployment (CHECKPOINT 3)

1. Present build success to user
2. Ask which staging environment to deploy to via AskUserQuestion
3. **WAIT for approval**
4. Spawn deploy teammate:

```
Task tool:
  description: "Deploy: {environment}"
  subagent_type: "deploy"
  team_name: "{team-name}"
  name: "deploy"
  prompt: |
    Read your role instructions from .claude/agents/deploy.md first.

    ## Plan File
    Read `.claude/plans/{TICKET-KEY}.md` for full implementation context and current progress.

    ## Task: Deploy to staging
    ## Branch: {branchName}
    ## Image Tag: {imageTag}
    ## Environment: {environment}
    ## Ticket: {ticketKey}

    The build has already succeeded. Proceed directly to deployment.
```

5. Monitor deployment status from deploy teammate's messages

**After successful deployment**: Update plan file — check "Deployed to staging"

---

## Step 7: QA Staging Verification

**Only runs after successful deployment.**

Message the existing jira-qa teammate (or spawn a new one) with staging mode:

```
SendMessage:
  type: "message"
  recipient: "jira-qa"
  content: |
    ## Plan File
    Read `.claude/plans/{TICKET-KEY}.md` for full implementation context and current progress.

    ## New Task: Staging Verification
    ## Mode: "staging"
    ## Staging URL: {staging-url}
    ## Environment: {environment}
    ## Acceptance Criteria
    {criteria to verify}
```

### BLOCKING GATE: Validate Staging QA Report

| Required Element          | How to Verify                       | If Missing |
| ------------------------- | ----------------------------------- | ---------- |
| Staging URL accessed      | Report shows correct staging URL    | **REJECT** |
| Feature verification      | Screenshots of feature on staging   | **REJECT** |
| Acceptance criteria table | Each criterion marked Pass/Fail     | **REJECT** |

**After staging QA passes**: Update plan file — check "Staging QA verified"

---

## Step 8: Completion

1. Update JIRA ticket with results:

```javascript
mcp__claude_ai_Atlassian__addCommentToJiraIssue({
  cloudId: "{YOUR_ORG}.atlassian.net",
  issueIdOrKey: "{ticketKey}",
  commentBody:
    "Deployed to staging: {staging-url}\n\nAll acceptance criteria verified.",
})
```

**Note**: The parameter is `commentBody`, not `body`.

2. Update plan file — check "Completed"
3. Compile learnings (new patterns, gotchas, documentation gaps)
4. Present final report to user
5. **Clean up the team**:

- Shut down all teammates via `SendMessage` with `type: "shutdown_request"`
- Wait for shutdown confirmations
- Clean up via `TeamDelete`

---

## Staging Environments Reference

> **CUSTOMIZE**: Replace with your actual staging environment URL patterns.

| Namespace   | URL Pattern                              |
| ----------- | ---------------------------------------- |
| **staging** | `https://{env}.staging.{YOUR_SITE}.com`  |
| **preprod** | `https://{env}.preprod.{YOUR_SITE}.com`  |

---

## Error Handling

| Error                         | Step | Action                                                 |
| ----------------------------- | ---- | ------------------------------------------------------ |
| JIRA fetch failure            | 1    | Report error, suggest re-auth or manual ticket details |
| Server not running            | 0, 3 | Ask user, then start it                                |
| TypeScript pre-flight failure | 0    | Report errors with known fixes                         |
| Teammate report rejection     | 3    | Message teammate with feedback (max 3 retries)         |
| Build not found               | 5    | Check if branch was pushed, report                     |
| Intermittent build failure    | 5    | Retry up to 3 times                                    |
| Code build failure            | 5    | Message jira-dev to fix, re-commit                     |
| Deploy failure                | 6    | Report deploy teammate's error                         |
| Staging verification failure  | 7    | Present failure, message jira-dev to fix               |

---

## Abort & Cleanup

When workflow is aborted:

1. **Shut down all teammates** via SendMessage with `type: "shutdown_request"`
2. **Wait for confirmations** — teammates respond to shutdown when idle
3. **Clean up the team** via TeamDelete (wait ~15s after all shutdowns)
4. **Report final state** to user

---

## Rules

1. **You are the team lead** — coordinate, don't implement code yourself
2. **Never write app code yourself** — spawn jira-dev teammate for that
3. **Never run browser verification yourself** — spawn jira-qa teammate for that
4. **Always validate teammate reports** at blocking gates
5. **Always pause at checkpoints** for user approval
6. **Don't hallucinate ticket content** — if JIRA fetch fails, stop immediately
7. **Clean up the team** when the workflow completes or is aborted
