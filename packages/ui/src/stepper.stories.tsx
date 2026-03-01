import type { Meta, StoryObj } from '@storybook/react'
import { Stepper } from './stepper'

const meta: Meta<typeof Stepper> = {
  title: 'Data Display/Stepper',
  component: Stepper,
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div className="max-w-xl">{Story()}</div>],
}

export default meta
type Story = StoryObj<typeof Stepper>

export const Default: Story = {
  args: {
    steps: [
      { label: 'Request', status: 'completed' },
      { label: 'Quote', status: 'completed' },
      { label: 'Booking', status: 'active' },
      { label: 'Confirmation', status: 'upcoming' },
      { label: 'Complete', status: 'upcoming' },
    ],
  },
}

export const AllCompleted: Story = {
  args: {
    steps: [
      { label: 'Step 1', status: 'completed' },
      { label: 'Step 2', status: 'completed' },
      { label: 'Step 3', status: 'completed' },
    ],
  },
}

export const FirstStepActive: Story = {
  args: {
    steps: [
      { label: 'New Request', status: 'active' },
      { label: 'Review', status: 'upcoming' },
      { label: 'Approve', status: 'upcoming' },
      { label: 'Done', status: 'upcoming' },
    ],
  },
}

export const WithSublabels: Story = {
  args: {
    steps: [
      { label: 'Request', status: 'completed', sublabel: 'Feb 20' },
      { label: 'Quote', status: 'completed', sublabel: 'Feb 22' },
      { label: 'Booking', status: 'active', sublabel: 'In progress' },
      { label: 'Confirmation', status: 'upcoming', sublabel: 'Pending' },
    ],
  },
}
