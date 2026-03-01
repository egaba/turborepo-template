type StepStatus = 'completed' | 'active' | 'upcoming'

type TripStep = Readonly<{
  label: string
  status: StepStatus
  sublabel?: string
}>

type AircraftOption = Readonly<{
  name: string
  type: string
  suggested: boolean
  price: string
  availability: { available: number; total: number }
  insights: string[]
}>

type TimelineBlock = Readonly<{
  label: string
  startCol: number
  spanCols: number
  variant: 'positioning' | 'revenue' | 'active'
}>

type FlightSegment = Readonly<{
  segNumber: number
  code: string
  codeType?: 'positioning' | 'revenue'
  from: string
  to: string
  departureDate: string
  departureTime: string
  arrivalTime: string
  ete: string
  pax: number
}>

type TripCardData = Readonly<{
  routeCode: string
  departureDate: string
  departureTime: string
  jetCategory: string
  pax: number
  luggage: number
  pets: number
  requirements?: string
}>

type TripDetail = Readonly<{
  tripId: string
  steps: TripStep[]
  aircraftOptions: AircraftOption[]
  timelineDates: string[]
  timelineBlocks: TimelineBlock[]
  flightSegments: FlightSegment[]
  tripSummary: {
    status: string
    type: string
    departure: string
    team: Readonly<{ alt: string; fallback?: string }>[]
  }
  itinerary: TripCardData[]
}>

export const MOCK_TRIP: TripDetail = {
  tripId: 'TRP-2847',
  steps: [
    { label: 'Itinerary', status: 'completed', sublabel: 'Confirmed' },
    { label: 'Quotes', status: 'active', sublabel: '2 of 3 sent' },
    { label: 'Booking', status: 'upcoming' },
    { label: 'Dispatch', status: 'upcoming' },
    { label: 'Day of flight', status: 'upcoming' },
  ],
  aircraftOptions: [
    {
      name: 'Challenger 350',
      type: 'Super Midsize Jet',
      suggested: true,
      price: '$82,400',
      availability: { available: 3, total: 5 },
      insights: [
        'Best match for 6 PAX with luggage',
        'Available at KPBI on requested date',
        'Crew positioned within 2 hrs',
      ],
    },
    {
      name: 'Citation Longitude',
      type: 'Super Midsize Jet',
      suggested: false,
      price: '$76,800',
      availability: { available: 2, total: 4 },
      insights: ['Slightly smaller cabin', 'Lower operating cost'],
    },
    {
      name: 'Global 6000',
      type: 'Large Cabin Jet',
      suggested: false,
      price: '$124,500',
      availability: { available: 1, total: 3 },
      insights: ['Premium cabin experience', 'Intercontinental range', 'Higher price point'],
    },
  ],
  timelineDates: ['Mar 10', 'Mar 11', 'Mar 12', 'Mar 13', 'Mar 14', 'Mar 15', 'Mar 16'],
  timelineBlocks: [
    { label: 'Positioning KTEB-KPBI', startCol: 0, spanCols: 1, variant: 'positioning' },
    { label: 'Revenue KPBI-KTEB', startCol: 2, spanCols: 2, variant: 'revenue' },
    { label: 'Available', startCol: 5, spanCols: 2, variant: 'active' },
  ],
  flightSegments: [
    {
      segNumber: 1,
      code: 'POS-101',
      codeType: 'positioning',
      from: 'KTEB',
      to: 'KPBI',
      departureDate: 'Mar 11',
      departureTime: '06:00',
      arrivalTime: '09:15',
      ete: '3h 15m',
      pax: 0,
    },
    {
      segNumber: 2,
      code: 'REV-201',
      codeType: 'revenue',
      from: 'KPBI',
      to: 'KTEB',
      departureDate: 'Mar 12',
      departureTime: '10:00',
      arrivalTime: '13:30',
      ete: '3h 30m',
      pax: 6,
    },
    {
      segNumber: 3,
      code: 'REV-202',
      codeType: 'revenue',
      from: 'KTEB',
      to: 'KORD',
      departureDate: 'Mar 13',
      departureTime: '14:00',
      arrivalTime: '16:15',
      ete: '2h 15m',
      pax: 4,
    },
  ],
  tripSummary: {
    status: 'Quotes in progress',
    type: 'Multi-leg charter',
    departure: 'Mar 12, 2026',
    team: [{ alt: 'Tom Anderson' }, { alt: 'Lisa Park' }, { alt: 'Mike Chen' }],
  },
  itinerary: [
    {
      routeCode: 'KPBI - KTEB',
      departureDate: 'Mar 12, 2026',
      departureTime: '10:00 AM',
      jetCategory: 'Super Midsize',
      pax: 6,
      luggage: 8,
      pets: 0,
      requirements: 'Full catering, WiFi required, 2 passengers need lie-flat seating',
    },
    {
      routeCode: 'KTEB - KORD',
      departureDate: 'Mar 13, 2026',
      departureTime: '2:00 PM',
      jetCategory: 'Super Midsize',
      pax: 4,
      luggage: 5,
      pets: 0,
    },
  ],
}
