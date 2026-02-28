import { Button } from '@repo/ui/button'
import { Card } from '@repo/ui/card'
import { ThemeToggle } from '@repo/ui/theme-toggle'

export default function Home() {
  return (
    <main className="min-h-screen bg-base-200 p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-bold text-base-content">My Skills</h1>
          <ThemeToggle />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card title="Getting Started">
            <p className="text-base-content/70">
              This monorepo is built with Turborepo, Next.js, and DaisyUI.
            </p>
            <div className="card-actions mt-4 justify-end">
              <Button variant="primary">Learn More</Button>
            </div>
          </Card>

          <Card title="Components">
            <p className="text-base-content/70">
              Shared UI components live in packages/ui and are styled with DaisyUI.
            </p>
            <div className="card-actions mt-4 justify-end">
              <Button variant="secondary">Explore</Button>
            </div>
          </Card>
        </div>
      </div>
    </main>
  )
}
