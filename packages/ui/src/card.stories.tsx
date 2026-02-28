import type { Meta, StoryObj } from '@storybook/react'
import { Card } from './card'
import { Button } from './button'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: { layout: 'centered' },
}

export default meta
type Story = StoryObj<typeof Card>

export const Basic: Story = {
  args: {
    title: 'Deploy in seconds',
    children: (
      <p className="text-base-content/70">
        Push your code and watch it go live instantly. Zero configuration required
        for most frameworks.
      </p>
    ),
  },
}

export const WithActions: Story = {
  render: () => (
    <Card title="Upgrade your plan">
      <p className="text-base-content/70">
        Get unlimited deployments, team collaboration, and priority support.
      </p>
      <div className="card-actions mt-4 justify-end">
        <Button variant="ghost" size="sm">Maybe Later</Button>
        <Button variant="primary" size="sm">Upgrade Now</Button>
      </div>
    </Card>
  ),
}

export const GridLayout: Story = {
  render: () => (
    <div className="grid max-w-4xl grid-cols-1 gap-6 p-8 md:grid-cols-3">
      <Card title="Starter">
        <p className="text-base-content/70">Perfect for hobby projects and experiments.</p>
      </Card>
      <Card title="Pro">
        <p className="text-base-content/70">For professional developers and small teams.</p>
      </Card>
      <Card title="Enterprise">
        <p className="text-base-content/70">Custom solutions for large organizations.</p>
      </Card>
    </div>
  ),
}
