---
name: skill-creator
description: Create, validate, and improve agent skills. Use when building new skills, auditing existing skills for quality, optimizing token efficiency, or restructuring skill references.
---

# Skill Creator

Create and maintain high-quality agent skills that follow progressive disclosure and token-efficient design.

## Skill Anatomy

```
.claude/skills/
└── skill-name/
    ├── SKILL.md              # Required. Core instructions (<150 lines)
    ├── references/           # Optional. Loaded into context as needed (<150 lines each)
    └── assets/               # Optional. Files used in output, not loaded into context
```

## Size Constraints

| Resource                     | Limit       | Rationale                                  |
| ---------------------------- | ----------- | ------------------------------------------ |
| `description` in frontmatter | < 200 chars | Always in context; must be precise         |
| SKILL.md body                | < 150 lines | Loaded when skill triggers                 |
| Each reference file          | < 150 lines | Split larger files; progressive disclosure |

## Progressive Disclosure (Three Levels)

1. **Metadata** (name + description) -- always in context. Determines when skill activates.
2. **SKILL.md body** -- loaded when skill triggers. Quick reference, workflows, pointers.
3. **References** -- loaded as needed. Detailed docs, schemas, examples.

## Creating a Skill

1. **Define purpose and triggers** -- what phrases/scenarios activate this skill?
2. **Draft SKILL.md** -- purpose (2-3 sentences), when to use, quick patterns, reference pointers
3. **Extract detail to references/** -- move schemas, examples, deep guides out of SKILL.md
4. **Validate** against criteria in `references/validation-checklist.md`

## Writing Style

- **Imperative form**: "To accomplish X, do Y" (not "You should do X")
- **Practical, not educational**: teach _how_ to do tasks, not _what_ tools are
- **No duplication**: information lives in ONE place (SKILL.md or a reference, not both)
- **No fluff**: sacrifice grammar for concision in reference files

## Assessing an Existing Skill

To audit a skill, check criteria in `references/quality-criteria.md` and run through `references/validation-checklist.md`.

## Scope Consolidation

Related topics belong in a single skill. Separate skills for unrelated domains only.

## Agent vs Skill

| Use Case | Choose |
|---|---|
| Knowledge, patterns, how-to guides | Skill |
| Automated review/audit process | Agent |
| Multi-step workflow with structured output | Agent |
| Reference material for building | Skill |

## Agent Anatomy

```
.claude/agents/
└── agent-name.md    # Role, process, output format, rules
```

Agents are markdown files. Keep under 100 lines. Include:
- **Role definition** -- what the agent does and when to spawn it
- **Step-by-step process** -- numbered phases the agent follows
- **Structured output format** -- markdown template for the report/result
- **Rules/constraints** -- what to include, exclude, and how to handle edge cases

Agents can specify which tools they need and which model to use. Name agents by their function: `reviewer`, `planner`, `security-reviewer`.

## References

- **[quality-criteria.md](references/quality-criteria.md)** -- Metadata, token efficiency, structure, scope
- **[validation-checklist.md](references/validation-checklist.md)** -- Quick pass/fail validation
