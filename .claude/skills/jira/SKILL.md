---
name: jira
description: JIRA ticket workflow orchestration. Invoke when ANY JIRA ticket key (e.g., PROJ-1234, FEAT-567) or Atlassian URL appears in the user's message — no action verb needed. You become the jira lead, spawning dev/QA/deploy teammates via Agent Teams.
---

# JIRA Workflow — Agent Team Orchestration

**User-invocable skill** for JIRA ticket-driven development. When a user presents a JIRA ticket, you become the **jira lead** — creating an agent team and spawning teammates for implementation, testing, and deployment.

## Architecture

```
User <-> jira lead (you, main Claude)
           |-- teammate -> jira-dev  (Developer)
           |-- teammate -> jira-qa   (QA — unit tests + browser verification)
           +-- teammate -> deploy    (Deployment)
```

**You are the jira lead.** You handle ticket analysis, planning, checkpoints, git operations, and team coordination. Teammates handle the specialized work.

## When to Invoke

**Any of these should trigger this workflow — no action verb required:**
- JIRA URLs: `{YOUR_ORG}.atlassian.net/browse/XXX-123`
- Ticket keys mentioned anywhere in the message: PROJ-123, FEAT-456, BUG-789, etc.
- Any message containing a ticket key pattern (`[A-Z]+-\d+`) — even without action words

**The presence of a JIRA ticket key or URL is sufficient.** You do not need the user to say "work on", "implement", "review", etc. If a ticket is linked or mentioned, invoke this skill.

## How to Start

When the user presents a JIRA ticket:

1. **Check for existing plan** at `.claude/plans/{TICKET-KEY}.md` — if found, read it to understand previous progress before proceeding
2. **Create an agent team** using TeamCreate (team name: ticket key lowercase, e.g., `proj-1234`)
3. **Read your playbook** from `.claude/skills/jira/references/jira-playbook.md` — this contains the full step-by-step workflow
4. **Follow every step** in the playbook:
   - Step 0: Prerequisites & server startup
   - Step 1: Ticket intake & validation
   - Step 2: Planning -> **Checkpoint 1: Plan Approval**
   - Step 3: Spawn jira-dev + jira-qa (parallel) -> **Blocking Gate**
   - Step 4: **Checkpoint 2: Commit Approval** -> git commit/push
   - Step 5: CI build monitoring
   - Step 6: **Checkpoint 3: Deploy Approval** -> spawn deploy teammate
   - Step 7: QA staging verification
   - Step 8: Completion & team cleanup

## Spawning Teammates

Use the Task tool with `team_name` and `name` parameters:

```
Task tool:
  description: "Developer: {summary}"
  subagent_type: "jira-dev"
  team_name: "{team-name}"
  name: "jira-dev"
  prompt: |
    Read your role instructions from .claude/agents/jira-dev.md first.
    {task details, plan, acceptance criteria, etc.}
```

**Teammate agent files:**
- Developer: `.claude/agents/jira-dev.md`
- QA: `.claude/agents/jira-qa.md`
- Deploy: `.claude/agents/deploy.md`

## Key Rules

- **You are the lead** — coordinate, don't implement code yourself
- **Always pause at checkpoints** — never auto-proceed without user approval
- **Always validate teammate reports** at blocking gates before proceeding
- **Handle git operations yourself** — commit/push after user approval at Checkpoint 2
- **Clean up the team** when the workflow completes or is aborted
- **Plan file tracks progress** — update `.claude/plans/{TICKET-KEY}.md` checkboxes at step transitions

## Tips

- **Delegate mode** (Shift+Tab): Restricts the lead to coordination-only tools — use this if the lead starts implementing code instead of delegating
- **Session resumption**: `/resume` does NOT restore teammates — read the plan file to pick up where you left off and re-spawn as needed

## Ticket Vetting / Backlog Refinement

When the user asks to **vet**, **validate**, **verify**, **refine**, **triage**, or **review intake** tickets — this is backlog refinement, a separate workflow from standard JIRA implementation. No code changes, no branches, no deployments.

**Trigger words**: "vet", "validate", "verify", "refine", "refinement", "review intake", "triage"

**What it does**: Browser-verifies reported bugs on production to determine if they're real, then moves confirmed bugs from the backlog to the refined epic.

**Epic pipeline**:
```
{BACKLOG_EPIC} "Needs Refinement"  ->  (refinement)  ->  {REFINED_EPIC} "Backlog"
     (backlog)                                         (refined, ready for dev)
```

**Outcomes per ticket**:
- **Valid** -> move to refined epic + set "To Do" + comment with evidence
- **Not valid (already done)** -> set "Done" + comment with explanation
- **Not valid (can't reproduce)** -> set "Won't Do" + comment with reason
- **Unclear** -> set Blocked + comment what needs clarification

**Reference**: [ticket-vetting.md](references/ticket-vetting.md) — full process, agent team structure, JIRA operations reference, comment templates.

## References

- **[jira-playbook.md](references/jira-playbook.md)** — Full step-by-step workflow (Steps 0-8, blocking gates, spawn templates)
- **[jira-workflow.md](references/jira-workflow.md)** — Supplementary reference (prerequisites, dev server modes, invocation examples, learnings)
- **[ticket-vetting.md](references/ticket-vetting.md)** — Vetting/validating bug tickets from intake epics

## Related Skills

- **web-dev** - React/TypeScript patterns
- **testing** - Jest/RTL patterns
