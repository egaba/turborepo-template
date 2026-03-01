import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { DetailPanel } from './detail-panel'

const meta: Meta<typeof DetailPanel> = {
  title: 'Layout/DetailPanel',
  component: DetailPanel,
  parameters: { layout: 'fullscreen' },
}

export default meta
type Story = StoryObj<typeof DetailPanel>

export const Default: Story = {
  args: {
    title: 'Trip Details',
    open: true,
    onClose: () => {},
    children: (
      <div className="space-y-4">
        <p className="text-base-content/70">
          This is the detail panel body content. It scrolls when content overflows.
        </p>
        <div className="bg-base-200 rounded-lg p-4">
          <h3 className="font-medium">Route</h3>
          <p className="text-base-content/60 text-sm">LFPG → KJFK</p>
        </div>
        <div className="bg-base-200 rounded-lg p-4">
          <h3 className="font-medium">Passengers</h3>
          <p className="text-base-content/60 text-sm">4 PAX, 2 luggage</p>
        </div>
      </div>
    ),
  },
}

export const WithTabs: Story = {
  args: {
    title: 'Quote #Q-2024-001',
    open: true,
    onClose: () => {},
    tabs: (
      <div className="tabs tabs-bordered">
        <button className="tab tab-active tab-sm">Overview</button>
        <button className="tab tab-sm">Flight Plan</button>
        <button className="tab tab-sm">Pricing</button>
      </div>
    ),
    children: (
      <div className="space-y-4">
        <div className="bg-base-200 rounded-lg p-4">
          <h3 className="font-medium">Overview content</h3>
          <p className="text-base-content/60 text-sm">Quote details and summary information.</p>
        </div>
      </div>
    ),
  },
}

export const Interactive: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div className="p-8">
        <button className="btn btn-primary" onClick={() => setOpen(true)}>
          Open Panel
        </button>
        <DetailPanel title="Interactive Panel" open={open} onClose={() => setOpen(false)}>
          <p className="text-base-content/70">Click the X or overlay to close.</p>
        </DetailPanel>
      </div>
    )
  },
}

export const Closed: Story = {
  args: {
    title: 'Hidden Panel',
    open: false,
    onClose: () => {},
    children: <p>You should not see this.</p>,
  },
}
