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
      <Badge variant="primary" size="sm">
        Small
      </Badge>
      <Badge variant="primary" size="md">
        Medium
      </Badge>
      <Badge variant="primary" size="lg">
        Large
      </Badge>
    </div>
  ),
}

export const StatusNewRequest: Story = {
  args: { children: 'New Request', status: 'new-request' },
}

export const StatusQuoteSent: Story = {
  args: { children: 'Quote Sent', status: 'quote-sent' },
}

export const StatusBookingConfirmed: Story = {
  args: { children: 'Booking Confirmed', status: 'booking-confirmed' },
}

export const StatusTripInfoMissing: Story = {
  args: { children: 'Trip Info Missing', status: 'trip-info-missing' },
}

export const StatusInProgress: Story = {
  args: { children: 'In Progress', status: 'in-progress' },
}

export const StatusCompleted: Story = {
  args: { children: 'Completed', status: 'completed' },
}

export const AllStatuses: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge status="new-request">New Request</Badge>
      <Badge status="quote-sent">Quote Sent</Badge>
      <Badge status="booking-confirmed">Booking Confirmed</Badge>
      <Badge status="trip-info-missing">Trip Info Missing</Badge>
      <Badge status="in-progress">In Progress</Badge>
      <Badge status="completed">Completed</Badge>
    </div>
  ),
}

export const StatusSizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Badge status="new-request" size="sm">
        SM
      </Badge>
      <Badge status="new-request" size="md">
        MD
      </Badge>
      <Badge status="new-request" size="lg">
        LG
      </Badge>
    </div>
  ),
}
