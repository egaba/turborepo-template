import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './badge'

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: { layout: 'centered' },
}

export default meta
type Story = StoryObj<typeof Badge>

export const Primary: Story = {
  args: { children: 'New', variant: 'primary' },
}

export const Secondary: Story = {
  args: { children: 'Updated', variant: 'secondary' },
}

export const Accent: Story = {
  args: { children: 'Beta', variant: 'accent' },
}

export const Ghost: Story = {
  args: { children: 'Draft', variant: 'ghost' },
}

export const Outline: Story = {
  args: { children: 'v2.0', variant: 'outline' },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="accent">Accent</Badge>
      <Badge variant="ghost">Ghost</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Badge variant="primary" size="sm">Small</Badge>
      <Badge variant="primary" size="md">Medium</Badge>
      <Badge variant="primary" size="lg">Large</Badge>
    </div>
  ),
}
