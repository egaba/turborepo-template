import Link from 'next/link'

import { Button } from '@repo/ui/button'

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 p-8">
      <h2 className="text-6xl font-bold text-base-content">404</h2>
      <p className="text-xl text-base-content/70">Page not found</p>
      <Link href="/">
        <Button variant="primary">Go Home</Button>
      </Link>
    </div>
  )
}
