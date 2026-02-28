import type { Meta, StoryObj } from '@storybook/react'
import { Alert } from './alert'

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj<typeof Alert>

export const Info: Story = {
  args: { children: 'New software update available.', variant: 'info' },
}

export const Success: Story = {
  args: { children: 'Your purchase has been confirmed!', variant: 'success' },
}

export const Warning: Story = {
  args: { children: 'Warning: Invalid email address!', variant: 'warning' },
}

export const Error: Story = {
  args: { children: 'Error! Task failed successfully.', variant: 'error' },
}

export const Dismissible: Story = {
  args: {
    children: 'This alert can be dismissed.',
    variant: 'info',
    onDismiss: () => {},
  },
}

export const CustomIcon: Story = {
  args: {
    children: 'Custom icon alert.',
    variant: 'success',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="h-6 w-6 shrink-0 stroke-current"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
      </svg>
    ),
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Alert variant="info">New software update available.</Alert>
      <Alert variant="success">Your purchase has been confirmed!</Alert>
      <Alert variant="warning">Warning: Invalid email address!</Alert>
      <Alert variant="error">Error! Task failed successfully.</Alert>
    </div>
  ),
}
