import type { Meta, StoryObj } from '@storybook/react'
import { GanttTimeline } from './gantt-timeline'

const meta: Meta<typeof GanttTimeline> = {
  title: 'Aviation/GanttTimeline',
  component: GanttTimeline,
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj<typeof GanttTimeline>

export const Default: Story = {
  args: {
    dates: ['Mar 10', 'Mar 11', 'Mar 12', 'Mar 13', 'Mar 14', 'Mar 15', 'Mar 16'],
    blocks: [
      { label: 'Positioning', startCol: 0, spanCols: 2, variant: 'positioning' },
      { label: 'Revenue Flight', startCol: 2, spanCols: 3, variant: 'revenue' },
      { label: 'Return', startCol: 5, spanCols: 2, variant: 'positioning' },
    ],
  },
}

export const SingleBlock: Story = {
  args: {
    dates: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    blocks: [{ label: 'Active Trip', startCol: 1, spanCols: 3, variant: 'active' }],
  },
}

export const MultipleRows: Story = {
  args: {
    dates: ['Mar 1', 'Mar 2', 'Mar 3', 'Mar 4', 'Mar 5', 'Mar 6', 'Mar 7', 'Mar 8'],
    blocks: [
      { label: 'POS LFPG-KJFK', startCol: 0, spanCols: 1, variant: 'positioning' },
      { label: 'KJFK-KLAX', startCol: 1, spanCols: 2, variant: 'revenue' },
      { label: 'KLAX-KLAS', startCol: 3, spanCols: 1, variant: 'active' },
      { label: 'Return POS', startCol: 5, spanCols: 2, variant: 'positioning' },
    ],
  },
}

export const FullWeek: Story = {
  args: {
    dates: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    blocks: [
      { label: 'Repo', startCol: 0, spanCols: 1, variant: 'positioning' },
      { label: 'Charter Revenue', startCol: 1, spanCols: 4, variant: 'revenue' },
      { label: 'Repo', startCol: 5, spanCols: 1, variant: 'positioning' },
    ],
  },
}
