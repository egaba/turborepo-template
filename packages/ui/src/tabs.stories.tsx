import type { Meta, StoryObj } from '@storybook/react'
import { Tabs } from './tabs'

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  decorators: [(Story) => <div className="max-w-2xl p-8">{Story()}</div>],
}

export default meta
type Story = StoryObj<typeof Tabs>

export const Default: Story = {
  args: {
    tabs: [
      {
        label: 'Overview',
        content: (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Platform Overview</h3>
            <p className="text-base-content/70">
              Build and deploy full-stack web applications with zero configuration. Our platform
              handles infrastructure so you can focus on your product.
            </p>
          </div>
        ),
      },
      {
        label: 'Features',
        content: (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Key Features</h3>
            <ul className="text-base-content/70 list-inside list-disc space-y-1">
              <li>Automatic SSL certificates</li>
              <li>Global CDN distribution</li>
              <li>Serverless functions</li>
              <li>Edge middleware</li>
            </ul>
          </div>
        ),
      },
      {
        label: 'Pricing',
        content: (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Simple Pricing</h3>
            <p className="text-base-content/70">
              Start free, scale as you grow. No surprise bills, no hidden fees. Pay only for what
              you use beyond the generous free tier.
            </p>
          </div>
        ),
      },
    ],
  },
}

export const SecondTabActive: Story = {
  args: {
    defaultIndex: 1,
    tabs: [
      {
        label: 'Code',
        content: <p className="text-base-content/70">Write your application code.</p>,
      },
      {
        label: 'Preview',
        content: <p className="text-base-content/70">Preview your changes in real time.</p>,
      },
      {
        label: 'Deploy',
        content: <p className="text-base-content/70">Deploy to production with one click.</p>,
      },
    ],
  },
}

export const UnderlineVariant: Story = {
  args: {
    variant: 'underline',
    tabs: [
      {
        label: 'New Requests',
        count: 500,
        content: <p className="text-base-content/70">New incoming trip requests.</p>,
      },
      {
        label: 'In Progress',
        count: 234,
        content: <p className="text-base-content/70">Trips currently being processed.</p>,
      },
      {
        label: 'Completed',
        count: 1200,
        content: <p className="text-base-content/70">Successfully completed trips.</p>,
      },
    ],
  },
}

export const WithCounts: Story = {
  args: {
    tabs: [
      {
        label: 'All',
        count: 1934,
        content: <p className="text-base-content/70">All items.</p>,
      },
      {
        label: 'Active',
        count: 42,
        content: <p className="text-base-content/70">Active items.</p>,
      },
      {
        label: 'Archived',
        count: 8,
        content: <p className="text-base-content/70">Archived items.</p>,
      },
    ],
  },
}

export const UnderlineWithCounts: Story = {
  args: {
    variant: 'underline',
    tabs: [
      {
        label: 'Pending Review',
        count: 12,
        content: <p className="text-base-content/70">Items pending review.</p>,
      },
      {
        label: 'Approved',
        count: 89,
        content: <p className="text-base-content/70">Approved items.</p>,
      },
      {
        label: 'Rejected',
        count: 3,
        content: <p className="text-base-content/70">Rejected items.</p>,
      },
    ],
  },
}
