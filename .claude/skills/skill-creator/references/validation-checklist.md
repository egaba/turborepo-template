# Skill Validation Checklist

Quick validation for skill quality. Check each criterion.

## Critical (Must Pass)

### Metadata
- [ ] `name`: kebab-case, descriptive
- [ ] `description`: under 200 characters, specific triggers, not generic

### Size Limits
- [ ] SKILL.md: under 150 lines
- [ ] Each reference file: under 150 lines
- [ ] No info duplication between SKILL.md and references

### Structure
- [ ] SKILL.md exists with valid YAML frontmatter
- [ ] Unused example files deleted
- [ ] File names: kebab-case, self-documenting

## Quality

### Writing Style
- [ ] Imperative form: "To accomplish X, do Y"
- [ ] Concise, no fluff -- sacrifice grammar for brevity in references

### Practical Utility
- [ ] Teaches *how* to do tasks, not *what* tools are
- [ ] Based on real workflows and patterns
- [ ] Includes concrete trigger phrases/use cases in description

### Progressive Disclosure
- [ ] SKILL.md contains only quick-reference patterns and pointers
- [ ] Detailed docs, schemas, examples live in references/
- [ ] References split at logical boundaries (< 150 lines each)

## Integration

- [ ] No duplication with existing skills
- [ ] Related topics consolidated into single skill
- [ ] Composable with other skills (clear boundaries)
