import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Modal } from './modal'

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: { layout: 'centered' },
}

export default meta
type Story = StoryObj<typeof Modal>

export const Basic: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <button className="btn btn-primary" onClick={() => setOpen(true)}>
          Open Modal
        </button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Hello!"
          actions={
            <button className="btn" onClick={() => setOpen(false)}>
              Close
            </button>
          }
        >
          <p>This is a basic modal dialog.</p>
        </Modal>
      </>
    )
  },
}

export const WithForm: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <button className="btn btn-primary" onClick={() => setOpen(true)}>
          Edit Profile
        </button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Edit Profile"
          actions={
            <div className="flex gap-2">
              <button className="btn btn-ghost" onClick={() => setOpen(false)}>
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={() => setOpen(false)}
              >
                Save
              </button>
            </div>
          }
        >
          <div className="flex flex-col gap-4">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Name</span>
              </div>
              <input
                type="text"
                placeholder="John Doe"
                className="input input-bordered w-full"
              />
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Email</span>
              </div>
              <input
                type="email"
                placeholder="john@example.com"
                className="input input-bordered w-full"
              />
            </label>
          </div>
        </Modal>
      </>
    )
  },
}

export const Confirmation: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <button className="btn btn-error" onClick={() => setOpen(true)}>
          Delete Account
        </button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Are you sure?"
          actions={
            <div className="flex gap-2">
              <button className="btn btn-ghost" onClick={() => setOpen(false)}>
                Cancel
              </button>
              <button
                className="btn btn-error"
                onClick={() => setOpen(false)}
              >
                Delete
              </button>
            </div>
          }
        >
          <p>
            This action cannot be undone. This will permanently delete your
            account and remove all associated data.
          </p>
        </Modal>
      </>
    )
  },
}

export const ScrollableContent: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <button className="btn btn-primary" onClick={() => setOpen(true)}>
          Terms of Service
        </button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Terms of Service"
          className="max-h-[60vh]"
          actions={
            <div className="flex gap-2">
              <button className="btn btn-ghost" onClick={() => setOpen(false)}>
                Decline
              </button>
              <button
                className="btn btn-primary"
                onClick={() => setOpen(false)}
              >
                Accept
              </button>
            </div>
          }
        >
          <div className="overflow-y-auto">
            {Array.from({ length: 20 }, (_, i) => (
              <p key={i} className="mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </p>
            ))}
          </div>
        </Modal>
      </>
    )
  },
}
