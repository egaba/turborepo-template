---
name: debugging
description: 'Process skill: systematic 4-phase debugging, root-cause tracing, and verification-before-completion. Stack-agnostic — works across all technologies.'
globs: []
---

# Debugging — Systematic Process

ALWAYS find root cause before attempting fixes. Symptom fixes are failure.

## The Four Phases

Complete each phase before proceeding to the next.

### Phase 1: Root Cause Investigation

BEFORE attempting ANY fix:

1. **Read error messages carefully** — full stack traces, line numbers, error codes
2. **Reproduce consistently** — exact steps, every time. If not reproducible, gather more data
3. **Check recent changes** — `git diff`, recent commits, new dependencies, config changes
4. **Trace the data flow** — where does the bad value originate? What called this with a bad value? Keep tracing up until you find the source.

For multi-component systems, add diagnostic instrumentation at each boundary BEFORE proposing fixes:

```
For EACH component boundary:
  - Log what data enters
  - Log what data exits
  - Verify environment/config propagation
Run once -> analyze evidence -> identify failing component -> investigate
```

### Phase 2: Pattern Analysis

1. **Find working examples** — locate similar working code in the same codebase
2. **Compare against references** — read reference implementations COMPLETELY, don't skim
3. **Identify differences** — list every difference, however small
4. **Understand dependencies** — what settings, config, environment does this need?

### Phase 3: Hypothesis and Testing

1. **Form single hypothesis** — "I think X is the root cause because Y"
2. **Test minimally** — make the SMALLEST possible change, one variable at a time
3. **Verify** — did it work? Yes -> Phase 4. No -> form NEW hypothesis. Don't stack fixes.

### Phase 4: Implementation

1. **Create failing test case** — simplest possible reproduction, automated if possible
2. **Implement single fix** — address root cause, ONE change at a time, no bundled refactoring
3. **Verify fix** — test passes, no other tests broken, issue actually resolved

## The 3-Fix Rule

If 3+ fixes fail for the same issue, **STOP**. The problem is likely architectural, not a bug.

Signs of an architectural problem:

- Each fix reveals new shared state or coupling
- Fixes require "massive refactoring" to implement
- Each fix creates new symptoms elsewhere

Discuss with the user before attempting more fixes.

## Root-Cause Tracing

When a bug appears deep in the call stack:

```
Observe symptom
  -> Find immediate cause (what code directly causes this?)
  -> Ask: "What called this?" (trace one level up)
  -> Keep tracing up (what value was passed? where did it come from?)
  -> Find original trigger (the source of the bad data)
  -> Fix at source, not at symptom
```

NEVER fix just where the error appears. Trace back to find the original trigger.

## Verification Before Completion

### The Iron Law

```
NO COMPLETION CLAIMS WITHOUT FRESH VERIFICATION EVIDENCE
```

### The Gate

```
IDENTIFY command -> RUN full command -> READ output -> VERIFY confirms claim -> THEN claim
Skip any step = not verified
```

### What Counts as Verification

| Claim            | Requires                        | NOT Sufficient                |
| ---------------- | ------------------------------- | ----------------------------- |
| Tests pass       | Test output showing 0 failures  | Previous run, "should pass"   |
| Build succeeds   | Build command exit 0            | Linter passing                |
| Bug fixed        | Test original symptom passes    | "Code changed, assumed fixed" |
| Linter clean     | Linter output: 0 errors         | Partial check                 |
| Requirements met | Line-by-line checklist verified | "Tests passing"               |

### Red Flags — STOP and Verify

If you catch yourself thinking:

- "Should work now" / "Probably passes"
- "Just try changing X and see"
- "Quick fix for now, investigate later"
- "I'm confident" (confidence is not evidence)
- "It's simple, don't need process"

ALL of these mean: STOP. Return to Phase 1 or run the verification command.

## Related Skills

- **auth** — defense-in-depth validation, security hardening patterns
- **testing** — create regression tests after fixing bugs
