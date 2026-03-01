import type { Meta, StoryObj } from '@storybook/react'
import { AppSidebar } from './app-sidebar'

const meta: Meta<typeof AppSidebar> = {
  title: 'Layout/AppSidebar',
  component: AppSidebar,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ height: '100vh' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof AppSidebar>

const PlaceholderIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
)

const sampleSections = [
  {
    label: 'Workspaces',
    items: [
      { label: 'Dashboard', href: '/dashboard', icon: <PlaceholderIcon /> },
      { label: 'Analytics', href: '/analytics', icon: <PlaceholderIcon /> },
    ],
  },
  {
    label: 'Operation',
    items: [
      { label: 'Trips', href: '/trips', icon: <PlaceholderIcon />, active: true },
      { label: 'Quotes', href: '/quotes', icon: <PlaceholderIcon /> },
      { label: 'Bookings', href: '/bookings', icon: <PlaceholderIcon /> },
    ],
  },
  {
    label: 'Marketplace',
    items: [
      { label: 'Aircraft', href: '/aircraft', icon: <PlaceholderIcon /> },
      { label: 'Operators', href: '/operators', icon: <PlaceholderIcon /> },
    ],
  },
  {
    label: 'Records',
    items: [
      { label: 'Clients', href: '/clients', icon: <PlaceholderIcon /> },
      { label: 'Contacts', href: '/contacts', icon: <PlaceholderIcon /> },
      { label: 'Airports', href: '/airports', icon: <PlaceholderIcon /> },
    ],
  },
]

export const Default: Story = {
  args: {
    sections: sampleSections,
    logo: (
      <span className="text-lg font-bold text-primary">Project</span>
    ),
    currentPath: '/trips',
  },
}

export const WithFooter: Story = {
  args: {
    sections: sampleSections,
    logo: (
      <span className="text-lg font-bold text-primary">Project</span>
    ),
    footer: (
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-content">
          JD
        </div>
        <div>
          <div className="text-sm font-medium">John Doe</div>
          <div className="text-xs text-base-content/50">john@example.com</div>
        </div>
      </div>
    ),
  },
}

export const MinimalSections: Story = {
  args: {
    sections: [
      {
        label: 'Navigation',
        items: [
          { label: 'Home', href: '/' },
          { label: 'Settings', href: '/settings' },
        ],
      },
    ],
  },
}
