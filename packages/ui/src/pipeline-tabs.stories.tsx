import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { PipelineTabs } from './pipeline-tabs'

const meta: Meta<typeof PipelineTabs> = {
  title: 'Aviation/PipelineTabs',
  component: PipelineTabs,
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj<typeof PipelineTabs>

const defaultStages = [
  { label: 'New Requests', count: 500 },
  { label: 'Quoting', count: 120 },
  { label: 'Booking', count: 45 },
  { label: 'Confirmed', count: 230 },
  { label: 'Completed', count: 1800 },
]

export const Default: Story = {
  args: {
    stages: defaultStages,
    activeIndex: 0,
    onStageClick: () => {},
  },
}

export const MiddleActive: Story = {
  args: {
    stages: defaultStages,
    activeIndex: 2,
    onStageClick: () => {},
  },
}

export const WithIcons: Story = {
  args: {
    stages: [
      {
        label: 'Inbox',
        count: 42,
        icon: (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        ),
      },
      {
        label: 'Processing',
        count: 15,
        icon: (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
      },
      {
        label: 'Done',
        count: 890,
        icon: (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ),
      },
    ],
    activeIndex: 0,
    onStageClick: () => {},
  },
}

export const Interactive: Story = {
  render: () => {
    const [active, setActive] = useState(0)
    return (
      <div>
        <PipelineTabs
          stages={defaultStages}
          activeIndex={active}
          onStageClick={setActive}
        />
        <div className="mt-4 rounded-lg bg-base-200 p-4 text-sm text-base-content/70">
          Showing: {defaultStages[active]?.label} ({defaultStages[active]?.count} items)
        </div>
      </div>
    )
  },
}
