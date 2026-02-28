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
        <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-base-content/50">
          Display Headings
        </h3>
        <div className="space-y-4">
          <p className="text-6xl font-extrabold tracking-tight text-base-content">
            Display Large (text-6xl)
          </p>
          <p className="text-5xl font-extrabold tracking-tight text-base-content">
            Display Medium (text-5xl)
          </p>
          <p className="text-4xl font-bold tracking-tight text-base-content">
            Display Small (text-4xl)
          </p>
        </div>
      </section>

      {/* Section Headings */}
      <section>
        <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-base-content/50">
          Section Headings
        </h3>
        <div className="space-y-4">
          <p className="text-3xl font-bold text-base-content">
            Section Heading (text-3xl)
          </p>
          <p className="text-2xl font-bold text-base-content">
            Subsection Heading (text-2xl)
          </p>
          <p className="text-xl font-semibold text-base-content">
            Card Title (text-xl)
          </p>
        </div>
      </section>

      {/* Body Text */}
      <section>
        <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-base-content/50">
          Body Text
        </h3>
        <div className="max-w-2xl space-y-4">
          <p className="text-lg text-base-content">
            Large body text for introductory paragraphs and hero descriptions.
            Ship faster with confidence using our developer-first platform. (text-lg)
          </p>
          <p className="text-base text-base-content">
            Default body text for general content and descriptions. Build, deploy,
            and scale your applications with zero configuration. (text-base)
          </p>
          <p className="text-sm text-base-content">
            Small text for captions, labels, and secondary information. Last updated
            3 minutes ago. (text-sm)
          </p>
          <p className="text-xs text-base-content">
            Extra small text for fine print and metadata. Terms and conditions apply. (text-xs)
          </p>
        </div>
      </section>

      {/* Code / Mono */}
      <section>
        <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-base-content/50">
          Code / Monospace
        </h3>
        <div className="space-y-4">
          <p>
            <code className="rounded bg-base-200 px-2 py-1 font-mono text-sm text-base-content">
              npx create-next-app@latest
            </code>
          </p>
          <pre className="rounded-lg bg-base-200 p-4 font-mono text-sm text-base-content">
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
        <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-base-content/50">
          Color Variants
        </h3>
        <div className="space-y-3">
          <p className="text-lg text-base-content">Base content (default)</p>
          <p className="text-lg text-base-content/70">Base content / 70% (secondary text)</p>
          <p className="text-lg text-base-content/50">Base content / 50% (muted text)</p>
          <p className="text-lg text-primary">Primary color</p>
          <p className="text-lg text-secondary">Secondary color</p>
          <p className="text-lg text-accent">Accent color</p>
          <p className="text-lg text-success">Success color</p>
          <p className="text-lg text-warning">Warning color</p>
          <p className="text-lg text-error">Error color</p>
        </div>
      </section>

      {/* Font Weight Scale */}
      <section>
        <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-base-content/50">
          Font Weight Scale
        </h3>
        <div className="space-y-3">
          <p className="text-2xl font-normal text-base-content">Regular (400)</p>
          <p className="text-2xl font-medium text-base-content">Medium (500)</p>
          <p className="text-2xl font-semibold text-base-content">Semibold (600)</p>
          <p className="text-2xl font-bold text-base-content">Bold (700)</p>
          <p className="text-2xl font-extrabold text-base-content">Extrabold (800)</p>
          <p className="text-2xl font-black text-base-content">Black (900)</p>
        </div>
      </section>
    </div>
  ),
}
