import type { Meta, StoryObj } from '@storybook/react'
import { TripCard } from './trip-card'

const meta: Meta<typeof TripCard> = {
  title: 'Aviation/TripCard',
  component: TripCard,
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div className="w-96">{Story()}</div>],
}

export default meta
type Story = StoryObj<typeof TripCard>

export const Default: Story = {
  args: {
    routeCode: 'LFPG - KJFK',
    departureDate: 'Mar 15, 2026',
    departureTime: '08:30',
    jetCategory: 'Heavy Jet',
    pax: 6,
    luggage: 4,
  },
}

export const WithPets: Story = {
  args: {
    routeCode: 'EHAM - LEMD',
    departureDate: 'Mar 20, 2026',
    departureTime: '14:00',
    jetCategory: 'Light Jet',
    pax: 2,
    luggage: 2,
    pets: 1,
  },
}

export const WithRequirements: Story = {
  args: {
    routeCode: 'EGLL - LFPG',
    departureDate: 'Apr 1, 2026',
    departureTime: '10:00',
    jetCategory: 'Super Midsize',
    pax: 4,
    luggage: 3,
    requirements: 'VIP client. Catering required: champagne, canapes. Ground transport at destination.',
  },
}

export const Editable: Story = {
  args: {
    routeCode: 'OMDB - VABB',
    departureDate: 'Apr 10, 2026',
    departureTime: '22:00',
    jetCategory: 'Ultra Long Range',
    pax: 8,
    luggage: 10,
    pets: 2,
    requirements: 'Wheelchair access needed.',
    onEdit: () => alert('Edit clicked'),
  },
}

export const Minimal: Story = {
  args: {
    routeCode: 'KJFK - KLAX',
    departureDate: 'May 5, 2026',
    departureTime: '06:00',
  },
}
