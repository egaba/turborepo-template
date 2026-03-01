# Skill Quality Criteria

Metadata, token efficiency, and structure requirements for high-quality skills.

## Metadata

Metadata determines when the agent activates the skill. Poor metadata = wrong or missed activation.

### Name Field

**Format:** kebab-case, lowercase, descriptive

Good: `pdf-editor`, `bigquery-analyst`, `frontend-webapp-builder`
Bad: `helper` (generic), `mySkill` (wrong case), `pdf` (unclear purpose)

### Description Field

**Constraint:** Under 200 characters. Answer: "What scenarios should trigger this skill?"

```yaml
# Good: specific, action-oriented, includes use cases
description: Build React/TypeScript frontends with modern patterns. Use for components, Suspense, lazy loading, performance optimization.
```

### Trigger Precision

Description should cover phrases/scenarios a user would express:

- "Remove red-eye from this image" -> image-editor skill
- "Set up CI/CD pipeline" -> devops skill
- "Fix the 401 error on login" -> auth skill

### Globs Field

```yaml
globs: ['**/*.test.{ts,tsx}', '**/mocks/**/*']
```

- Match files the skill is relevant to
- Avoid overly broad patterns that cause false activations

---

## Token Efficiency

Skills use progressive disclosure to minimize context window usage.

### Three-Level Loading

1. **Metadata** (name + description) -- always loaded (~200 chars)
2. **SKILL.md body** -- loaded when skill triggers (< 150 lines)
3. **References** -- loaded as needed by agent (< 150 lines each)

### Size Limits

| Resource | Limit |
|----------|-------|
| Description | < 200 chars |
| SKILL.md | < 150 lines |
| Each reference | < 150 lines |

### SKILL.md Content Strategy

**Include in SKILL.md:** Purpose (2-3 sentences), trigger conditions, quick-reference patterns, pointers to references.

**Move to references/:** Detailed documentation, API specs, step-by-step guides, best practices compilations.

### No Duplication Rule

Information lives in ONE place -- either SKILL.md or a reference, never both.

---

## Structure & Organization

### Required Directory Layout

```
.claude/skills/
└── skill-name/
    ├── SKILL.md          # Required, uppercase, valid YAML frontmatter
    ├── references/       # Optional: documentation loaded as needed
    └── assets/           # Optional: output resources (templates, images)
```

### YAML Frontmatter (Required)

```yaml
---
name: skill-name
description: Under 200 chars, specific triggers
globs: ['**/*.relevant-pattern']   # Optional
---
```

### File Naming

**Format:** kebab-case, self-documenting

Good: `api-endpoints-authentication.md`, `database-schema-users.md`
Bad: `docs.md` (not descriptive), `apiEndpoints.md` (wrong case), `1.md` (meaningless)

### Scope Consolidation

Related topics belong in a single skill. Separate skills for unrelated domains only.

---

## Unified Quality Checklist

### Critical

- [ ] `name`: kebab-case, descriptive
- [ ] `description`: under 200 chars, specific triggers
- [ ] SKILL.md under 150 lines with valid frontmatter
- [ ] Each reference under 150 lines
- [ ] No info duplication between SKILL.md and references
- [ ] All referenced files actually exist
- [ ] File names kebab-case and self-documenting

### Quality

- [ ] Imperative writing: "To accomplish X, do Y"
- [ ] Teaches *how*, not *what* -- practical over educational
- [ ] SKILL.md has quick-reference patterns + pointers only
- [ ] Detailed content lives in references/
- [ ] Related topics consolidated into single skill
- [ ] No unused/empty files or directories
