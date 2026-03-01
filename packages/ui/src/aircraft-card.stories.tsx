import type { Meta, StoryObj } from '@storybook/react'
import { AircraftCard } from './aircraft-card'

const meta: Meta<typeof AircraftCard> = {
  title: 'Aviation/AircraftCard',
  component: AircraftCard,
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div className="w-72">{Story()}</div>],
}

export default meta
type Story = StoryObj<typeof AircraftCard>

export const Default: Story = {
  args: {
    name: 'Cessna Citation XLS+',
    type: 'Midsize Jet',
  },
}

export const Suggested: Story = {
  args: {
    name: 'Bombardier Global 7500',
    type: 'Ultra Long Range',
    suggested: true,
    price: 'EUR 85,000',
    availability: { available: 3, total: 5 },
    insights: [
      'Best fit for 8+ hour routes',
      'Full standing cabin with shower',
      'Client preferred aircraft type',
    ],
  },
}

export const WithAvailability: Story = {
  args: {
    name: 'Gulfstream G650',
    type: 'Heavy Jet',
    price: 'USD 72,000',
    availability: { available: 1, total: 8 },
    insights: ['Limited availability for March'],
  },
}

export const Selectable: Story = {
  args: {
    name: 'Embraer Phenom 300E',
    type: 'Light Jet',
    price: 'EUR 18,500',
    availability: { available: 6, total: 10 },
    onSelect: () => {},
  },
}

export const Selected: Story = {
  args: {
    name: 'Embraer Phenom 300E',
    type: 'Light Jet',
    price: 'EUR 18,500',
    availability: { available: 6, total: 10 },
    onSelect: () => {},
    selected: true,
  },
}

export const CardGrid: Story = {
  decorators: [(Story) => <div className="w-full max-w-3xl">{Story()}</div>],
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <AircraftCard
        name="Phenom 300E"
        type="Light Jet"
        price="EUR 18,500"
        availability={{ available: 6, total: 10 }}
        onSelect={() => {}}
      />
      <AircraftCard
        name="Citation XLS+"
        type="Midsize Jet"
        suggested
        price="EUR 32,000"
        availability={{ available: 3, total: 5 }}
        insights={['Best match for this route']}
        onSelect={() => {}}
        selected
      />
      <AircraftCard
        name="Global 7500"
        type="Ultra Long Range"
        price="EUR 85,000"
        availability={{ available: 1, total: 3 }}
        onSelect={() => {}}
      />
    </div>
  ),
}
