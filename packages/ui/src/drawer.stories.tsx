import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Drawer } from './drawer'

const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer',
  component: Drawer,
  parameters: { layout: 'fullscreen' },
}

export default meta
type Story = StoryObj<typeof Drawer>

export const LeftDrawer: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div className="min-h-screen p-8">
        <button className="btn btn-primary" onClick={() => setOpen(true)}>
          Open Left Drawer
        </button>
        <Drawer open={open} onClose={() => setOpen(false)} side="left">
          <h2 className="mb-4 text-lg font-bold">Left Drawer</h2>
          <p>This drawer slides in from the left.</p>
        </Drawer>
      </div>
    )
  },
}

export const RightDrawer: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div className="min-h-screen p-8">
        <button className="btn btn-primary" onClick={() => setOpen(true)}>
          Open Right Drawer
        </button>
        <Drawer open={open} onClose={() => setOpen(false)} side="right">
          <h2 className="mb-4 text-lg font-bold">Right Drawer</h2>
          <p>This drawer slides in from the right.</p>
        </Drawer>
      </div>
    )
  },
}

export const NavigationDrawer: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div className="min-h-screen p-8">
        <button className="btn btn-primary" onClick={() => setOpen(true)}>
          Open Navigation
        </button>
        <Drawer open={open} onClose={() => setOpen(false)} side="left">
          <h2 className="mb-4 text-lg font-bold">Navigation</h2>
          <ul className="menu">
            <li>
              <a>Dashboard</a>
            </li>
            <li>
              <a>Projects</a>
            </li>
            <li>
              <a>Team</a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a className="text-error">Logout</a>
            </li>
          </ul>
        </Drawer>
      </div>
    )
  },
}

export const FilterDrawer: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div className="min-h-screen p-8">
        <button className="btn btn-primary" onClick={() => setOpen(true)}>
          Open Filters
        </button>
        <Drawer open={open} onClose={() => setOpen(false)} side="right">
          <h2 className="mb-4 text-lg font-bold">Filters</h2>
          <div className="flex flex-col gap-4">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Category</span>
              </div>
              <select className="select select-bordered w-full">
                <option>All</option>
                <option>Electronics</option>
                <option>Clothing</option>
                <option>Books</option>
              </select>
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Price Range</span>
              </div>
              <input type="range" min="0" max="100" className="range range-primary" />
            </label>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">In Stock Only</span>
                <input type="checkbox" className="checkbox checkbox-primary" />
              </label>
            </div>
            <button className="btn btn-primary mt-4">Apply Filters</button>
          </div>
        </Drawer>
      </div>
    )
  },
}
