import type { Meta, StoryObj } from '@storybook/react'
import { PageHeader } from './page-header'

const meta: Meta<typeof PageHeader> = {
  title: 'Layout/PageHeader',
  component: PageHeader,
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj<typeof PageHeader>

export const Default: Story = {
  args: {
    title: 'Trip Requests',
  },
}

export const WithBadge: Story = {
  args: {
    title: 'Trip #1234',
    badge: <span className="badge badge-accent badge-sm">New Request</span>,
    subtitle: 'Created on Feb 28, 2026',
  },
}

export const WithActions: Story = {
  args: {
    title: 'Quotes',
    subtitle: 'Manage all outgoing quotes',
    actions: (
      <>
        <button className="btn btn-ghost btn-sm">Export</button>
        <button className="btn btn-primary btn-sm">New Quote</button>
      </>
    ),
  },
}

export const WithTabs: Story = {
  args: {
    title: 'Operations',
    badge: <span className="badge badge-primary badge-sm">Pro</span>,
    tabs: (
      <div className="tabs tabs-bordered">
        <button className="tab tab-active">All Trips</button>
        <button className="tab">Pending</button>
        <button className="tab">Confirmed</button>
      </div>
    ),
    actions: <button className="btn btn-primary btn-sm">Create Trip</button>,
  },
}

export const FullExample: Story = {
  args: {
    title: 'Trip Requests',
    subtitle: '1,234 total requests across all workspaces',
    badge: <span className="badge badge-accent badge-sm">500 new</span>,
    tabs: (
      <div className="tabs tabs-bordered">
        <button className="tab tab-active">New Requests (500)</button>
        <button className="tab">In Progress (234)</button>
        <button className="tab">Completed (500)</button>
      </div>
    ),
    actions: (
      <>
        <button className="btn btn-ghost btn-sm">Filter</button>
        <button className="btn btn-primary btn-sm">New Request</button>
      </>
    ),
  },
}
