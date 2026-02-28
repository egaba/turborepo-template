import type { Meta, StoryObj } from '@storybook/react'
import { LogoCloud } from './logo-cloud'

const meta: Meta<typeof LogoCloud> = {
  title: 'Components/LogoCloud',
  component: LogoCloud,
}

export default meta
type Story = StoryObj<typeof LogoCloud>

// Using placeholder SVG data URIs for logos
const placeholderLogo = (text: string) =>
  `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="120" height="40" viewBox="0 0 120 40"><rect width="120" height="40" fill="%23e5e7eb" rx="4"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui" font-size="14" fill="%236b7280">${text}</text></svg>`)}`

export const Default: Story = {
  args: {
    heading: 'Trusted by industry leaders',
    logos: [
      { src: placeholderLogo('Vercel'), alt: 'Vercel' },
      { src: placeholderLogo('Stripe'), alt: 'Stripe' },
      { src: placeholderLogo('GitHub'), alt: 'GitHub' },
      { src: placeholderLogo('Linear'), alt: 'Linear' },
      { src: placeholderLogo('Notion'), alt: 'Notion' },
      { src: placeholderLogo('Figma'), alt: 'Figma' },
    ],
  },
}

export const WithLinks: Story = {
  args: {
    heading: 'Powering teams worldwide',
    logos: [
      { src: placeholderLogo('Acme'), alt: 'Acme', href: '#' },
      { src: placeholderLogo('Globex'), alt: 'Globex', href: '#' },
      { src: placeholderLogo('Initech'), alt: 'Initech', href: '#' },
      { src: placeholderLogo('Hooli'), alt: 'Hooli', href: '#' },
    ],
  },
}

export const NoHeading: Story = {
  args: {
    logos: [
      { src: placeholderLogo('AWS'), alt: 'AWS' },
      { src: placeholderLogo('GCP'), alt: 'GCP' },
      { src: placeholderLogo('Azure'), alt: 'Azure' },
    ],
  },
}
