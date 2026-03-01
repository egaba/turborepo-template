import type { Meta, StoryObj } from '@storybook/react'
import { PricingCard } from './pricing-card'
import { Button } from './button'

const meta: Meta<typeof PricingCard> = {
  title: 'Components/PricingCard',
  component: PricingCard,
  parameters: { layout: 'centered' },
}

export default meta
type Story = StoryObj<typeof PricingCard>

export const Free: Story = {
  args: {
    name: 'Hobby',
    price: '$0',
    period: 'month',
    features: ['Up to 3 projects', '1 GB storage', 'Community support', 'Basic analytics'],
    cta: (
      <Button variant="ghost" className="w-full">
        Get Started
      </Button>
    ),
  },
}

export const Popular: Story = {
  args: {
    name: 'Pro',
    price: '$29',
    period: 'month',
    popular: true,
    features: [
      'Unlimited projects',
      '100 GB storage',
      'Priority support',
      'Advanced analytics',
      'Custom domains',
      'Team collaboration',
    ],
    cta: (
      <Button variant="primary" className="w-full">
        Start Free Trial
      </Button>
    ),
  },
}

export const PricingTiers: Story = {
  render: () => (
    <div className="grid max-w-5xl grid-cols-1 gap-6 p-8 md:grid-cols-3">
      <PricingCard
        name="Hobby"
        price="$0"
        period="month"
        features={['Up to 3 projects', '1 GB storage', 'Community support', 'Basic analytics']}
        cta={
          <Button variant="ghost" className="w-full">
            Get Started
          </Button>
        }
      />
      <PricingCard
        name="Pro"
        price="$29"
        period="month"
        popular
        features={[
          'Unlimited projects',
          '100 GB storage',
          'Priority support',
          'Advanced analytics',
          'Custom domains',
          'Team collaboration',
        ]}
        cta={
          <Button variant="primary" className="w-full">
            Start Free Trial
          </Button>
        }
      />
      <PricingCard
        name="Enterprise"
        price="$99"
        period="month"
        features={[
          'Everything in Pro',
          '1 TB storage',
          'Dedicated support',
          'Custom integrations',
          'SSO / SAML',
          'SLA guarantee',
          'Audit logs',
        ]}
        cta={
          <Button variant="secondary" className="w-full">
            Contact Sales
          </Button>
        }
      />
    </div>
  ),
}
