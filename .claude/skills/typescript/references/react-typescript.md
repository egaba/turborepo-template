# React TypeScript Patterns

TypeScript conventions for React projects. Covers import organization, component typing, type generation, and shared patterns.

## Import Organization

- **Type imports must use `import type` syntax** -- separates types from runtime code
- **Type imports go at the top of the file** -- before all runtime imports
- Group type imports together, then add a blank line before runtime imports

```typescript
// CORRECT: Type imports first with `import type`
import type { ReactNode } from 'react'
import type { ButtonProps } from '@mui/material'
import type { SxProps, Theme } from '@mui/material/styles'

import { useState } from 'react'
import { Button } from '@mui/material'

import MyComponent from 'components/my-component'

// WRONG: Types mixed with runtime imports
import { ReactNode, useState } from 'react'
import { Button, ButtonProps } from '@mui/material'
```

## React Component Props

```typescript
import type { ReactNode } from 'react'
import type { ButtonProps } from '@mui/material'

import { Button } from '@mui/material'

// Props type named ComponentNameProps, defined above component
type MyButtonProps = Readonly<{
  children?: ReactNode
  isLoading?: boolean
  onClick?: () => void
}> & Omit<ButtonProps, 'children'>

// Use export default function ComponentName convention
export default function MyButton({ children, isLoading, onClick, ...props }: MyButtonProps) {
  return <Button {...props} onClick={onClick}>{children}</Button>
}
```

**Component conversion conventions:**
- **REQUIRED: Wrap props type object with `Readonly<>`** -- ensures props are immutable
- Use `export default function ComponentName` (not `const` + separate export)
- Name props type `ComponentNameProps` (PascalCase, matches component name)
- Define props type directly above the component function
- Remove PropTypes imports when converting to TypeScript

## Type Generation Best Practices

### Naming & Style

- Use `type` over `interface` unless inheritance or declaration merging is needed
- Follow PascalCase naming (e.g., `UserProfile`, `ApiResponse`)
- Use descriptive names reflecting data purpose

### Property Handling

- Mark optional properties with `?`
- Use `readonly` for immutable data
- Handle union types for multi-type properties
- Avoid `any` -- use `unknown` or specific types

### Advanced Patterns

```typescript
// Literal types over generic strings
type Status = 'pending' | 'active' | 'completed'

// Utility types for clarity
type PartialUser = Partial<User>
type UserWithoutPassword = Omit<User, 'password'>
type UserNameOnly = Pick<User, 'firstName' | 'lastName'>

// Generic types for reusable structures
type ApiResponse<T> = {
  data: T
  meta: { total: number; page: number }
}

// Discriminated unions
type Result<T> =
  | { success: true; data: T }
  | { success: false; error: string }

// Index signatures for dynamic keys
type DynamicRecord = { [key: string]: unknown }

// Recursive types
type TreeNode<T> = {
  value: T
  children?: TreeNode<T>[]
}
```

## API Response Types

Standard response wrappers:

```tsx
// utils/type-helpers.ts
export type ApiResponse<T> = {
  data: T
  status: 'success' | 'error'
  message?: string
}

export type PaginatedResponse<T> = ApiResponse<{
  items: T[]
  pagination: {
    page: number
    limit: number
    total: number
    hasNext: boolean
  }
}>

// Example domain type
export type Product = {
  id: string
  name: string
  price: number
  category: {
    id: string
    name: string
  }
}

export type ProductsResponse = PaginatedResponse<Product>
```

## MUI Theme Type Augmentation

Custom theme augmentation for projects using MUI:

```tsx
// types/theme.ts
import '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Palette {
    tertiary: Palette['primary']
  }
  interface PaletteOptions {
    tertiary: PaletteOptions['primary']
  }
  interface BreakpointOverrides {
    xs: true
    sm: true
    tb: true    // custom breakpoint
    md: true
    lg: true
    xl: true
  }
}

// Custom component prop extensions
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    tertiary: true
  }
}
```

## Shared Package Types

Pattern for shared types across workspace packages:

```tsx
// packages/ui/types/index.ts
export type BaseComponentProps = {
  className?: string
  'data-testid'?: string
}

export type ThemeComponentProps = BaseComponentProps & {
  variant?: 'primary' | 'secondary' | 'tertiary'
  size?: 'small' | 'medium' | 'large'
}

// App-specific extensions
// apps/my-app/types/ui-extensions.ts
import type { ThemeComponentProps } from '@my-org/ui'

export type AppButtonProps = ThemeComponentProps & {
  analyticsId?: string
  permission?: UserPermission
}
```

## Type Organization

Recommended folder structure:

```
types/
  api/
    products.ts
    users.ts
    auth.ts
  components/
    forms.ts
    tables.ts
    modals.ts
  utilities/
    helpers.ts
    guards.ts
    state.ts
  index.ts          # Re-export all types
```
