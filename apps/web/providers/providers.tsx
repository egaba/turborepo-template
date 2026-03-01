'use client'

import type { ReactNode } from 'react'

import { MSWProvider } from './msw-provider'
import { QueryProvider } from './query-provider'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MSWProvider>
      <QueryProvider>{children}</QueryProvider>
    </MSWProvider>
  )
}
