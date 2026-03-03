# Skill Assessment

Verify that skills produce correct output, measure quality, and detect regressions.

## Why Assess

Structural validation (line counts, YAML, file existence) confirms a skill is well-formed.
Assessment confirms it **works** -- a realistic prompt produces correct, convention-following output.

## Scenario Structure

Each scenario has four parts:

```
### {Skill Name} -- Scenario {Letter}: {Short Title}

**Prompt**: "{Exact text a user would type}"
**Priority**: P0 (must pass) | P1 (should pass)
**Pass criteria**:
- {Observable output 1}
- {Observable output 2}
- {Observable output 3}
```

## Writing Good Criteria

Criteria must be **observable and binary** -- verifiable without subjective judgment.

| Good Criterion                              | Bad Criterion               |
| ------------------------------------------- | --------------------------- |
| Uses `Record<AlertVariant, string>` map     | "Good component design"     |
| Runs `check-types` and reports output       | "Verifies correctness"      |
| Creates `features/projects/index.ts` barrel | "Follows project structure" |
| No `any` types in output                    | "Type-safe code"            |

## Writing Good Prompts

- Use exact phrasing a user would type (not technical test language)
- Include enough context to be unambiguous but don't lead the answer
- Test one skill capability per scenario

## Scoring Rubric

Each scenario gets a score from 0-3:

| Score | Label          | Meaning                                                       |
| ----- | -------------- | ------------------------------------------------------------- |
| **3** | Correct        | All criteria met, output follows conventions                  |
| **2** | Mostly correct | All criteria met but minor convention gaps                    |
| **1** | Partial        | Some criteria met, core approach correct but significant gaps |
| **0** | Incorrect      | Wrong approach, missing criteria, or harmful output           |

**Skill score** = median of all scenario scores.

| Median  | Quality    | Action                          |
| ------- | ---------- | ------------------------------- |
| 3.0     | Excellent  | No action needed                |
| 2.0-2.9 | Good       | Fix convention gaps in SKILL.md |
| 1.0-1.9 | Needs work | Rewrite sections of SKILL.md    |
| 0.0-0.9 | Broken     | Investigate root cause          |

## Running an Assessment

### Full Assessment (all skills)

1. Open a fresh Claude Code session (clean context)
2. For each skill, run at least 1 P0 scenario (all 3 for thorough assessment)
3. Score each scenario immediately after running
4. Record results in the format below

### Targeted Assessment (after a skill edit)

1. Run all scenarios for the edited skill
2. Run 1 scenario for each skill in its "Commonly co-loads with" list (CLAUDE.md)
3. Compare scores to previous run

### When to Run

| Trigger                                  | Scope                               |
| ---------------------------------------- | ----------------------------------- |
| After editing a SKILL.md or reference    | Targeted (edited skill + co-loaded) |
| Before releasing template to new project | Full assessment                     |
| After upgrading framework dependencies   | Full assessment                     |
| Monthly maintenance                      | 1 P0 scenario per skill minimum     |

## Recording Results

Use this format in a plan file (`~/.claude/plans/assessment-{date}.md`):

```markdown
## Assessment: {date}

Context: {reason -- e.g., "after editing data SKILL.md", "monthly check"}

| Skill | S-A | S-B | S-C | Median | Prev | Delta |
| ----- | --- | --- | --- | ------ | ---- | ----- |
| ui    | 3   | 2   | 3   | 3.0    | 3.0  | 0     |
| data  | 2   | 3   | 2   | 2.0    | 3.0  | -1.0  |

### Regressions

- data: S-A dropped 3->2. Missing `StatusCodes` in API route output.
  Cause: removed HTTP status reference from SKILL.md line 51.

### Notes

- {Observations, patterns, or follow-ups}
```

## Detecting Regressions

A **regression** = skill median score drops after a change.

1. Compare current median to the most recent previous assessment
2. Any drop of 1+ point on any scenario = investigate
3. Check: did the SKILL.md change? A reference? CLAUDE.md conventions?
4. If a SKILL.md edit caused the drop, the edit needs revision

**3-scenario rule**: If any single scenario drops 2+ points, investigate regardless of median.

## Assessment vs Validation

|             | Validation Checklist             | Assessment                        |
| ----------- | -------------------------------- | --------------------------------- |
| **Tests**   | Structure, size, metadata        | Behavioral output                 |
| **When**    | Every skill edit                 | After edits, before releases      |
| **Speed**   | < 1 minute per skill             | 5-10 minutes per scenario         |
| **Catches** | Missing files, oversized content | Wrong advice, missing conventions |

Run validation first (fast). Run assessment when validation passes (slow).

## Scenario Design Principles

1. **One capability per scenario** -- isolate what you are testing
2. **Template-generic prompts** -- work on any project bootstrapped from this template
3. **Convention-heavy criteria** -- reference CLAUDE.md conventions (the source of truth)
4. **Three per skill** -- enough for breadth without diluting signal
5. **P0 first** -- every skill needs at least one must-pass scenario
