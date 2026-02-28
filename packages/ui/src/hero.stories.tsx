import type { Meta, StoryObj } from '@storybook/react'
import { Hero } from './hero'
import { Button } from './button'

const meta: Meta<typeof Hero> = {
  title: 'Sections/Hero',
  component: Hero,
}

export default meta
type Story = StoryObj<typeof Hero>

export const WithEyebrow: Story = {
  args: {
    eyebrow: 'Now in Public Beta',
    heading: 'Ship faster with confidence',
    description:
      'The developer platform that scales with your team. Build, test, and deploy modern web applications with zero configuration.',
    primaryCta: <Button variant="primary" size="lg">Start Building</Button>,
    secondaryCta: <Button variant="ghost" size="lg">View Demo</Button>,
  },
}

export const Simple: Story = {
  args: {
    heading: 'Build the future of the web',
    description:
      'A complete toolkit for modern web development. From prototype to production in minutes, not months.',
    primaryCta: <Button variant="primary" size="lg">Get Started Free</Button>,
  },
}

export const LongDescription: Story = {
  args: {
    eyebrow: 'Trusted by 10,000+ teams',
    heading: 'Your entire backend, managed',
    description:
      'Authentication, database, storage, and edge functions — everything you need to build production-ready applications. No DevOps expertise required.',
    primaryCta: <Button variant="primary" size="lg">Start Your Project</Button>,
    secondaryCta: <Button variant="ghost" size="lg">Read Documentation</Button>,
  },
}
