import type { Meta, StoryObj } from '@storybook/react'
import { Navbar } from './navbar'
import { Button } from './button'

const meta: Meta<typeof Navbar> = {
  title: 'Layout/Navbar',
  component: Navbar,
}

export default meta
type Story = StoryObj<typeof Navbar>

const defaultLinks = [
  { label: 'Product', href: '#product' },
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Docs', href: '#docs' },
]

export const Default: Story = {
  args: {
    logo: 'Acme',
    links: defaultLinks,
    actions: (
      <>
        <Button variant="ghost" size="sm">
          Sign In
        </Button>
        <Button variant="primary" size="sm">
          Get Started
        </Button>
      </>
    ),
  },
}

export const MinimalLinks: Story = {
  args: {
    logo: 'Startup',
    links: [
      { label: 'About', href: '#about' },
      { label: 'Blog', href: '#blog' },
    ],
    actions: (
      <Button variant="primary" size="sm">
        Join Waitlist
      </Button>
    ),
  },
}

export const NoActions: Story = {
  args: {
    logo: 'DevTools',
    links: [
      { label: 'Documentation', href: '#docs' },
      { label: 'API Reference', href: '#api' },
      { label: 'Guides', href: '#guides' },
      { label: 'Changelog', href: '#changelog' },
    ],
  },
}
