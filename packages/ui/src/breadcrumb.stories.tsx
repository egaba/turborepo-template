import type { Meta, StoryObj } from '@storybook/react'
import { Breadcrumb } from './breadcrumb'

const meta: Meta<typeof Breadcrumb> = {
  title: 'Layout/Breadcrumb',
  component: Breadcrumb,
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj<typeof Breadcrumb>

export const Default: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Trips', href: '/trips' },
      { label: 'Trip #1234' },
    ],
  },
}

export const TwoLevels: Story = {
  args: {
    items: [
      { label: 'Dashboard', href: '/' },
      { label: 'Settings' },
    ],
  },
}

export const DeepPath: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Operations', href: '/operations' },
      { label: 'Trips', href: '/operations/trips' },
      { label: 'Trip #5678', href: '/operations/trips/5678' },
      { label: 'Flight Segments' },
    ],
  },
}
