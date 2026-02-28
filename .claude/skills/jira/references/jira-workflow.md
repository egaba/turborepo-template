# JIRA Workflow Guide — Supplementary Reference

**This document supplements the playbook** (`jira-playbook.md`) with detailed reference content: invocation examples, dev server modes, prerequisite validation details, learnings collection, and progress tracking.

For the step-by-step workflow, see `jira-playbook.md`.

## Ticket Sources

A ticket is **always required** to invoke the jira workflow.

| Source | How to Fetch | Example |
|--------|--------------|---------|
| JIRA | `mcp__claude_ai_Atlassian__getJiraIssue` | `PROJ-1234`, `FEAT-567` |

## Dev Server Mode

The dev server mode is **separate from the ticket source**. It determines whether the app runs against real APIs or a mock backend.

### CRITICAL: Development vs Production Commands

| Command | Purpose | When to Use |
|---------|---------|-------------|
| `pnpm turbo run dev` | Development server with hot reload | Local development with real APIs |
| `pnpm turbo run mock` | Development server with mock backend | Local development with mock backend (if available) |
| `pnpm turbo run build` | Production build (NO server) | **CI/CD ONLY - NEVER for local dev** |

**NEVER use `build` for local development.** It creates a production build without starting a server. Always use `dev` or `mock`.

### Mock Server Mode (if available)
**Use mock mode by default** for local development and testing when the app supports it:
```bash
pnpm turbo run mock --filter={YOUR_APP}
```
- Uses MSW or similar mock backend (no real API calls)
- Mock credentials work for authentication
- Faster iteration, no external dependencies
- **Verify ready**: Use `nextjs_index({ port: "{PORT}" })` to confirm server is up

### Real API Mode
Only use when explicitly requested by the developer:
```bash
pnpm turbo run dev --filter={YOUR_APP}
```
- Connects to real backend services
- Requires proper authentication and network access
- Use for integration testing or staging verification
- **Verify ready**: Use `nextjs_index({ port: "{PORT}" })` to confirm server is up

### Mock Mode Availability

**Not all apps support mock mode.** Check the app's `package.json` or `turbo.json` for available scripts. If no `mock` script exists, use `dev` mode.

## Detailed Prerequisite Validation

### MCP Server Checks

**1. Atlassian MCP (JIRA Integration)**
- Call `mcp__claude_ai_Atlassian__atlassianUserInfo` (built-in — managed by Claude.ai OAuth)
- If not available, update Claude CLI (`claude update`) and re-authenticate (`claude login`)

**2. Chrome DevTools MCP (Browser Automation)**
- Call `mcp__chrome-devtools__list_pages` to verify browser connection
- If it fails, visual verification will not work for developer/QA teammates

### CLI & Repository Checks

```bash
# 3. GitHub CLI authenticated
gh auth status

# 4. Sibling repo paths (if needed for the ticket)
# Read .claude/settings.local.json and extract env vars for sibling repos.
# If any are missing and needed for this ticket, ASK the user for their local path.
```

### If Prerequisites Fail

1. **Atlassian MCP not configured**: Update Claude CLI (`claude update`) and re-authenticate (`claude login`)
2. **Chrome DevTools MCP not available**: Run `claude mcp add chrome-devtools npx chrome-devtools-mcp@latest`
3. **gh CLI not authenticated**: Run `gh auth login`
4. **Sibling repo path unknown**: Ask user, store in `.claude/settings.local.json`

## JIRA Ticket Validation Criteria

A valid ticket MUST have:
- **Summary**: Clear, actionable title (>10 chars)
- **Description**: Detailed explanation (>50 chars)
- **Acceptance Criteria**: 2+ testable items (look for bullet points or checkboxes)

## Task Tool Invocation Examples

### Teammate Types (exact `subagent_type` values)

| Teammate | subagent_type | When to Use |
|----------|---------------|-------------|
| Developer | `jira-dev` | Step 3: Implementation (parallel with QA) |
| QA | `jira-qa` | Step 3: Local testing, Step 7: Staging verification |
| Deploy | `deploy` | Step 6: Deployment |

### Example: Developer Teammate

```
Task tool:
  description: "Developer: Add password strength indicator"
  subagent_type: "jira-dev"
  team_name: "{team-name}"
  name: "jira-dev"
  prompt: |
    Read your role instructions from .claude/agents/jira-dev.md first.

    ## Task: Implement password strength indicator component
    ## Ticket: PROJ-1234
    Add password strength indicator to account creation form

    ## Requirements
    1. Create PasswordStrengthIndicator component
    2. Integrate into /account/create page
    3. Real-time feedback as user types

    ## Acceptance Criteria
    - Weak (red): <10 characters
    - Fair (orange): 10+ characters
    - Good (yellow): 10+ with letters+numbers
    - Strong (green): 12+ with all character types

    ## Files to Modify
    - apps/{app}/src/components/account/password-strength-indicator.tsx (create)
    - apps/{app}/src/pages/account/create/index.tsx (integrate)
```

### Example: QA Teammate (Local Mode)

```
Task tool:
  description: "QA: Test password strength indicator"
  subagent_type: "jira-qa"
  team_name: "{team-name}"
  name: "jira-qa"
  prompt: |
    Read your role instructions from .claude/agents/jira-qa.md first.

    ## Task: Create unit tests and verify password strength indicator
    ## Mode: "local"
    ## Ticket: PROJ-1234
    Password strength indicator for account creation

    ## Files Modified by Developer
    - apps/{app}/src/components/account/password-strength-indicator.tsx
    - apps/{app}/src/pages/account/create/index.tsx

    ## Acceptance Criteria to Verify
    - Weak (red): <10 characters
    - Fair (orange): 10+ characters
    - Good (yellow): 10+ with letters+numbers
    - Strong (green): 12+ with all character types
```

## Collecting Learnings

Throughout the workflow, track any new learnings discovered by teammates or during coordination:
- New patterns or conventions discovered
- Gotchas or edge cases encountered
- Workflow improvements identified
- Documentation gaps found

### Learnings Summary Template

At the end of the workflow, present a summary:

```markdown
## Learnings from {TICKET-KEY}

### New Patterns Discovered
- {pattern 1}

### Gotchas / Edge Cases
- {gotcha 1}

### Documentation Updates Needed
- {doc update 1}
```

## User Preferences Storage

Store user responses in `.claude/settings.local.json` to avoid repeated prompts:

```json
{
  "env": {
    "SIBLING_REPO_PATH": "/Users/username/workspace/sibling-repo"
  },
  "preferences": {
    "skipSetup": {
      "atlassianMcp": false,
      "chromeDevtoolsMcp": false,
      "githubCli": false
    }
  }
}
```

**Behavior:**
- If `skipSetup.{component}` is `true`, don't ask user to set it up again
- If `false` or missing, ask user if they want to set it up
- When user declines setup, set the flag to `true`
- When user completes setup, remove the flag (or set to `false`)

## Progress Tracking

Use TaskCreate to maintain visibility:
```
- [ ] Step 0: Prerequisites & server startup
- [ ] Step 1: Ticket intake & validation
- [ ] Step 2: Planning (CHECKPOINT 1: Plan approval)
- [ ] Step 3: Development + QA (PARALLEL - dev implements, QA writes tests)
- [ ] Step 4: Commit approval (CHECKPOINT 2: commit only / commit+push / do nothing)
- [ ] Step 5: CI Build monitoring (if pushed)
- [ ] Step 6: Deployment (CHECKPOINT 3: Deploy approval)
- [ ] Step 7: QA Staging verification
- [ ] Step 8: Completion
```
