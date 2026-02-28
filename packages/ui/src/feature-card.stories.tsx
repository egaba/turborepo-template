import type { Meta, StoryObj } from '@storybook/react'
import { FeatureCard } from './feature-card'

const meta: Meta<typeof FeatureCard> = {
  title: 'Components/FeatureCard',
  component: FeatureCard,
  parameters: { layout: 'centered' },
}

export default meta
type Story = StoryObj<typeof FeatureCard>

const BoltIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
  </svg>
)

const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
  </svg>
)

const GlobeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5a17.92 17.92 0 0 1-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
  </svg>
)

export const Default: Story = {
  args: {
    icon: <BoltIcon />,
    heading: 'Lightning Fast',
    description: 'Sub-millisecond response times with our globally distributed edge network.',
  },
}

export const WithLink: Story = {
  args: {
    icon: <ShieldIcon />,
    heading: 'Enterprise Security',
    description: 'SOC2 compliant with end-to-end encryption and role-based access control.',
    href: '#security',
  },
}

export const FeatureGrid: Story = {
  render: () => (
    <div className="grid max-w-5xl grid-cols-1 gap-6 p-8 md:grid-cols-3">
      <FeatureCard
        icon={<BoltIcon />}
        heading="Lightning Fast"
        description="Sub-millisecond response times with our globally distributed edge network."
      />
      <FeatureCard
        icon={<ShieldIcon />}
        heading="Enterprise Security"
        description="SOC2 compliant with end-to-end encryption and role-based access control."
        href="#security"
      />
      <FeatureCard
        icon={<GlobeIcon />}
        heading="Global Scale"
        description="Deploy to 30+ regions worldwide. Automatic failover and load balancing included."
      />
    </div>
  ),
}
