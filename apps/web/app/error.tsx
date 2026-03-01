'use client'

import { Button } from '@repo/ui/button'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 p-8">
      <h2 className="text-2xl font-bold text-error">Something went wrong</h2>
      <p className="text-base-content/70">
        {error.message || 'An unexpected error occurred.'}
      </p>
      <Button variant="primary" onClick={reset}>
        Try again
      </Button>
    </div>
  )
}
