import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta = {
  title: 'Foundations/Typography',
}

export default meta

type Story = StoryObj

export const TypeScale: Story = {
  render: () => (
    <div className="space-y-12 p-8">
      {/* Display Headings */}
      <section>
        <h3 className="text-base-content/50 mb-6 text-sm font-semibold uppercase tracking-wider">
          Display Headings
        </h3>
        <div className="space-y-4">
          <p className="text-base-content text-6xl font-extrabold tracking-tight">
            Display Large (text-6xl)
          </p>
          <p className="text-base-content text-5xl font-extrabold tracking-tight">
            Display Medium (text-5xl)
          </p>
          <p className="text-base-content text-4xl font-bold tracking-tight">
            Display Small (text-4xl)
          </p>
        </div>
      </section>

      {/* Section Headings */}
      <section>
        <h3 className="text-base-content/50 mb-6 text-sm font-semibold uppercase tracking-wider">
          Section Headings
        </h3>
        <div className="space-y-4">
          <p className="text-base-content text-3xl font-bold">Section Heading (text-3xl)</p>
          <p className="text-base-content text-2xl font-bold">Subsection Heading (text-2xl)</p>
          <p className="text-base-content text-xl font-semibold">Card Title (text-xl)</p>
        </div>
      </section>

      {/* Body Text */}
      <section>
        <h3 className="text-base-content/50 mb-6 text-sm font-semibold uppercase tracking-wider">
          Body Text
        </h3>
        <div className="max-w-2xl space-y-4">
          <p className="text-base-content text-lg">
            Large body text for introductory paragraphs and hero descriptions. Ship faster with
            confidence using our developer-first platform. (text-lg)
          </p>
          <p className="text-base-content text-base">
            Default body text for general content and descriptions. Build, deploy, and scale your
            applications with zero configuration. (text-base)
          </p>
          <p className="text-base-content text-sm">
            Small text for captions, labels, and secondary information. Last updated 3 minutes ago.
            (text-sm)
          </p>
          <p className="text-base-content text-xs">
            Extra small text for fine print and metadata. Terms and conditions apply. (text-xs)
          </p>
        </div>
      </section>

      {/* Code / Mono */}
      <section>
        <h3 className="text-base-content/50 mb-6 text-sm font-semibold uppercase tracking-wider">
          Code / Monospace
        </h3>
        <div className="space-y-4">
          <p>
            <code className="bg-base-200 text-base-content rounded px-2 py-1 font-mono text-sm">
              npx create-next-app@latest
            </code>
          </p>
          <pre className="bg-base-200 text-base-content rounded-lg p-4 font-mono text-sm">
            {`const config = {
  framework: 'next',
  deploy: 'vercel',
  database: 'supabase',
}`}
          </pre>
        </div>
      </section>

      {/* Color Variants */}
      <section>
        <h3 className="text-base-content/50 mb-6 text-sm font-semibold uppercase tracking-wider">
          Color Variants
        </h3>
        <div className="space-y-3">
          <p className="text-base-content text-lg">Base content (default)</p>
          <p className="text-base-content/70 text-lg">Base content / 70% (secondary text)</p>
          <p className="text-base-content/50 text-lg">Base content / 50% (muted text)</p>
          <p className="text-primary text-lg">Primary color</p>
          <p className="text-secondary text-lg">Secondary color</p>
          <p className="text-accent text-lg">Accent color</p>
          <p className="text-success text-lg">Success color</p>
          <p className="text-warning text-lg">Warning color</p>
          <p className="text-error text-lg">Error color</p>
        </div>
      </section>

      {/* Font Weight Scale */}
      <section>
        <h3 className="text-base-content/50 mb-6 text-sm font-semibold uppercase tracking-wider">
          Font Weight Scale
        </h3>
        <div className="space-y-3">
          <p className="text-base-content text-2xl font-normal">Regular (400)</p>
          <p className="text-base-content text-2xl font-medium">Medium (500)</p>
          <p className="text-base-content text-2xl font-semibold">Semibold (600)</p>
          <p className="text-base-content text-2xl font-bold">Bold (700)</p>
          <p className="text-base-content text-2xl font-extrabold">Extrabold (800)</p>
          <p className="text-base-content text-2xl font-black">Black (900)</p>
        </div>
      </section>
    </div>
  ),
}
