import type { Meta, StoryObj } from '@storybook/react'
import { Section } from './section'
import { Card } from './card'

const meta: Meta<typeof Section> = {
  title: 'Layout/Section',
  component: Section,
}

export default meta
type Story = StoryObj<typeof Section>

export const WithHeading: Story = {
  args: {
    heading: 'Everything you need to ship fast',
    description:
      'A complete platform for building and deploying modern web applications.',
    children: (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card title="Instant Deploys">
          <p className="text-base-content/70">Push to Git and see your changes live in seconds.</p>
        </Card>
        <Card title="Edge Functions">
          <p className="text-base-content/70">Run serverless functions close to your users globally.</p>
        </Card>
        <Card title="Analytics">
          <p className="text-base-content/70">Real-time insights into your application performance.</p>
        </Card>
      </div>
    ),
  },
}

export const ContentOnly: Story = {
  args: {
    children: (
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-lg text-base-content/70">
          Sections can also be used without headings, as a simple padded container
          for any content that needs consistent spacing and max-width constraints.
        </p>
      </div>
    ),
  },
}
