import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: { layout: 'centered' },
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: { children: 'Get Started', variant: 'primary', size: 'md' },
}

export const Secondary: Story = {
  args: { children: 'Learn More', variant: 'secondary', size: 'md' },
}

export const Accent: Story = {
  args: { children: 'Try It Free', variant: 'accent', size: 'md' },
}

export const Ghost: Story = {
  args: { children: 'Cancel', variant: 'ghost', size: 'md' },
}

export const Loading: Story = {
  args: { children: 'Saving...', variant: 'primary', loading: true },
}

export const Disabled: Story = {
  args: { children: 'Unavailable', variant: 'primary', disabled: true },
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="accent">Accent</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
}
