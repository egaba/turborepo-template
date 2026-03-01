import type { Meta, StoryObj } from '@storybook/react'
import { FlightSegmentsTable } from './flight-segments-table'

const meta: Meta<typeof FlightSegmentsTable> = {
  title: 'Aviation/FlightSegmentsTable',
  component: FlightSegmentsTable,
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj<typeof FlightSegmentsTable>

const sampleSegments = [
  {
    segNumber: 1,
    code: 'LFPG-KJFK',
    codeType: 'positioning' as const,
    from: 'Paris CDG',
    to: 'New York JFK',
    departureDate: 'Mar 15, 2026',
    departureTime: '08:30',
    arrivalTime: '11:45',
    ete: '7h 15m',
    pax: 0,
  },
  {
    segNumber: 2,
    code: 'KJFK-KLAX',
    codeType: 'revenue' as const,
    from: 'New York JFK',
    to: 'Los Angeles LAX',
    departureDate: 'Mar 16, 2026',
    departureTime: '10:00',
    arrivalTime: '13:30',
    ete: '5h 30m',
    pax: 6,
  },
  {
    segNumber: 3,
    code: 'KLAX-KLAS',
    codeType: 'revenue' as const,
    from: 'Los Angeles LAX',
    to: 'Las Vegas LAS',
    departureDate: 'Mar 18, 2026',
    departureTime: '09:00',
    arrivalTime: '10:15',
    ete: '1h 15m',
    pax: 6,
  },
  {
    segNumber: 4,
    code: 'KLAS-LFPG',
    codeType: 'positioning' as const,
    from: 'Las Vegas LAS',
    to: 'Paris CDG',
    departureDate: 'Mar 19, 2026',
    departureTime: '22:00',
    arrivalTime: '16:30+1',
    ete: '10h 30m',
    pax: 0,
  },
]

export const Default: Story = {
  args: {
    segments: sampleSegments,
  },
}

export const SingleLeg: Story = {
  args: {
    segments: [
      {
        segNumber: 1,
        code: 'EGLL-LEMD',
        codeType: 'revenue',
        from: 'London Heathrow',
        to: 'Madrid Barajas',
        departureDate: 'Apr 1, 2026',
        departureTime: '14:00',
        arrivalTime: '17:30',
        ete: '2h 30m',
        pax: 4,
      },
    ],
  },
}

export const Empty: Story = {
  args: {
    segments: [],
  },
}

export const ManySegments: Story = {
  args: {
    segments: [
      {
        segNumber: 1,
        code: 'OMDB-VABB',
        codeType: 'positioning',
        from: 'Dubai',
        to: 'Mumbai',
        departureDate: 'Apr 10',
        departureTime: '06:00',
        arrivalTime: '10:30',
        ete: '3h 30m',
        pax: 0,
      },
      {
        segNumber: 2,
        code: 'VABB-VIDP',
        codeType: 'revenue',
        from: 'Mumbai',
        to: 'Delhi',
        departureDate: 'Apr 10',
        departureTime: '12:00',
        arrivalTime: '14:00',
        ete: '2h 00m',
        pax: 8,
      },
      {
        segNumber: 3,
        code: 'VIDP-VIAR',
        codeType: 'revenue',
        from: 'Delhi',
        to: 'Amritsar',
        departureDate: 'Apr 11',
        departureTime: '08:00',
        arrivalTime: '09:00',
        ete: '1h 00m',
        pax: 8,
      },
      {
        segNumber: 4,
        code: 'VIAR-VIDP',
        codeType: 'revenue',
        from: 'Amritsar',
        to: 'Delhi',
        departureDate: 'Apr 13',
        departureTime: '16:00',
        arrivalTime: '17:00',
        ete: '1h 00m',
        pax: 8,
      },
      {
        segNumber: 5,
        code: 'VIDP-VABB',
        codeType: 'revenue',
        from: 'Delhi',
        to: 'Mumbai',
        departureDate: 'Apr 14',
        departureTime: '10:00',
        arrivalTime: '12:00',
        ete: '2h 00m',
        pax: 8,
      },
      {
        segNumber: 6,
        code: 'VABB-OMDB',
        codeType: 'positioning',
        from: 'Mumbai',
        to: 'Dubai',
        departureDate: 'Apr 14',
        departureTime: '14:00',
        arrivalTime: '16:00',
        ete: '3h 00m',
        pax: 0,
      },
    ],
  },
}
