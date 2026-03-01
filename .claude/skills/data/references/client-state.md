# Client State

Zustand stores, URL state, and React Context patterns for client-side state management.

## Zustand (Global UI State)

### Basic Store

```typescript
import { create } from 'zustand'

type SidebarStore = {
  isOpen: boolean
  toggle: () => void
  close: () => void
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  close: () => set({ isOpen: false }),
}))
```

### Store with Persistence

```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type ThemeStore = {
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: 'light',
      setTheme: (theme) => set({ theme }),
    }),
    { name: 'theme-preference' },
  ),
)
```

### When to Use Zustand vs Other Options

| Scenario | Tool |
|----------|------|
| Sidebar open/closed, theme, global UI toggles | Zustand |
| Server-fetched data that needs caching | React Query |
| Filters, search, pagination (URL-shareable) | URL state (`useSearchParams`) |
| Data scoped to a component subtree | React Context |

## URL State

### Filter Pattern with `useSearchParams`

```tsx
'use client'

import { useSearchParams, useRouter, usePathname } from 'next/navigation'

function useUrlFilters() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const filters = {
    search: searchParams.get('q') ?? '',
    page: Number(searchParams.get('page') ?? '1'),
    sort: searchParams.get('sort') ?? 'newest',
  }

  function setFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    if (key !== 'page') params.set('page', '1')
    router.push(`${pathname}?${params.toString()}`)
  }

  return { filters, setFilter }
}
```

## React Context (Tree-Scoped State)

Use Context for state scoped to a component subtree rather than global:

```tsx
type WizardContextValue = {
  currentStep: number
  totalSteps: number
  next: () => void
  back: () => void
}

const WizardContext = createContext<WizardContextValue | null>(null)

function useWizard() {
  const ctx = useContext(WizardContext)
  if (!ctx) throw new Error('useWizard must be used within WizardProvider')
  return ctx
}

function WizardProvider({ steps, children }: { steps: number; children: React.ReactNode }) {
  const [currentStep, setCurrentStep] = useState(0)

  const value: WizardContextValue = {
    currentStep,
    totalSteps: steps,
    next: () => setCurrentStep((s) => Math.min(s + 1, steps - 1)),
    back: () => setCurrentStep((s) => Math.max(s - 1, 0)),
  }

  return <WizardContext.Provider value={value}>{children}</WizardContext.Provider>
}
```
