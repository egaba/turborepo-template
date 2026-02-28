---
name: typescript
description: TypeScript patterns for React projects. Component typing, import conventions, and type generation best practices.
globs: ['**/*.ts', '**/*.tsx']
---

# TypeScript Patterns for React Projects

Conventions and patterns for TypeScript in React/Next.js applications.

## Quick Patterns

### Import Organization

```typescript
// Type imports first with `import type`
import type { ReactNode } from 'react'
import type { ButtonProps } from '@mui/material'

import { useState } from 'react'
import { Button } from '@mui/material'

import MyComponent from 'components/my-component'
```

### Component Props

```tsx
type MyButtonProps = Readonly<{
  children?: ReactNode
  isLoading?: boolean
  onClick?: () => void
}>

export default function MyButton({ children, isLoading, onClick }: MyButtonProps) {
  return <Button onClick={onClick}>{children}</Button>
}
```

### Key Conventions

- Use `type` over `interface` (unless declaration merging is needed)
- Wrap props with `Readonly<{...}>`
- Use `export default function ComponentName` (not `const` + separate export)
- Name props type `ComponentNameProps`

## Reference

See **[react-typescript.md](references/react-typescript.md)** for import rules, type generation patterns, API response types, MUI augmentation, and shared package types.
