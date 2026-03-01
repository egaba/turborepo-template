import type { Meta, StoryObj } from '@storybook/react'
import { CtaSection } from './cta-section'

const meta: Meta<typeof CtaSection> = {
  title: 'Sections/CTASection',
  component: CtaSection,
  decorators: [(Story) => <div className="p-8">{Story()}</div>],
}

export default meta
type Story = StoryObj<typeof CtaSection>

export const Default: Story = {
  args: {
    heading: 'Ready to get started?',
    description:
      'Join thousands of developers who are already building faster. Start your free trial today — no credit card required.',
    primaryCta: <button className="btn btn-secondary btn-lg">Start Free Trial</button>,
    secondaryCta: (
      <button className="btn btn-ghost btn-lg text-primary-content">Talk to Sales</button>
    ),
  },
}

export const Simple: Story = {
  args: {
    heading: 'Ship your next project today',
    description: 'Everything you need to go from idea to production. Free for hobby projects.',
    primaryCta: <button className="btn btn-secondary btn-lg">Get Started Free</button>,
  },
}
