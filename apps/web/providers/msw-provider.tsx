'use client'

import type { ReactNode } from 'react'
import { Suspense, use } from 'react'

const MSW_ENABLED =
  process.env['NEXT_PUBLIC_API_MOCKING'] === 'enabled' && process.env['NODE_ENV'] === 'development'

async function enableMocking(): Promise<void> {
  if (!MSW_ENABLED) return

  const { initMSW } = await import('@/lib/msw')
  return initMSW()
}

const mswReady = enableMocking()

function MSWReadyGate({ children }: Readonly<{ children: ReactNode }>) {
  use(mswReady)
  return <>{children}</>
}

type MSWProviderProps = Readonly<{
  children: ReactNode
}>

export function MSWProvider({ children }: MSWProviderProps) {
  if (!MSW_ENABLED) return <>{children}</>

  return (
    <Suspense fallback={null}>
      <MSWReadyGate>{children}</MSWReadyGate>
    </Suspense>
  )
}
