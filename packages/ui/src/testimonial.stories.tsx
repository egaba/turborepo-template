import type { Meta, StoryObj } from '@storybook/react'
import { Testimonial } from './testimonial'

const meta: Meta<typeof Testimonial> = {
  title: 'Components/Testimonial',
  component: Testimonial,
  parameters: { layout: 'centered' },
}

export default meta
type Story = StoryObj<typeof Testimonial>

export const Default: Story = {
  args: {
    quote:
      'Switching to this platform cut our deployment time from hours to seconds. Our engineering team has never been more productive.',
    author: 'Sarah Chen',
    role: 'VP of Engineering',
    company: 'TechCorp',
  },
}

export const WithAvatar: Story = {
  args: {
    quote:
      'The developer experience is unmatched. We went from prototype to production in two weeks instead of two months.',
    author: 'Marcus Johnson',
    role: 'CTO',
    company: 'Rapidify',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
  },
}

export const TestimonialGrid: Story = {
  render: () => (
    <div className="grid max-w-4xl grid-cols-1 gap-6 p-8 md:grid-cols-2">
      <Testimonial
        quote="Switching to this platform cut our deployment time from hours to seconds. Our engineering team has never been more productive."
        author="Sarah Chen"
        role="VP of Engineering"
        company="TechCorp"
      />
      <Testimonial
        quote="The developer experience is unmatched. We went from prototype to production in two weeks."
        author="Marcus Johnson"
        role="CTO"
        company="Rapidify"
        avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus"
      />
      <Testimonial
        quote="Best-in-class monitoring and analytics. We can finally see exactly what matters to our users."
        author="Elena Rodriguez"
        role="Head of Product"
        company="DataFlow"
      />
      <Testimonial
        quote="The support team is incredible. Every question gets a thoughtful response within hours."
        author="James Park"
        role="Lead Developer"
        company="CloudBase"
        avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=James"
      />
    </div>
  ),
}
