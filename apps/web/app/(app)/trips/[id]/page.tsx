'use client'

import { useState } from 'react'

import { AircraftCard } from '@repo/ui/aircraft-card'
import { AvatarGroup } from '@repo/ui/avatar-group'
import { Badge } from '@repo/ui/badge'
import { Button } from '@repo/ui/button'
import { DetailPanel } from '@repo/ui/detail-panel'
import { FlightSegmentsTable } from '@repo/ui/flight-segments-table'
import { GanttTimeline } from '@repo/ui/gantt-timeline'
import { Stepper } from '@repo/ui/stepper'
import { Tabs } from '@repo/ui/tabs'
import { TripCard } from '@repo/ui/trip-card'

import { MOCK_TRIP } from './_data/mock-trip'

function ArrowLeftIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 19l-7-7m0 0l7-7m-7 7h18"
      />
    </svg>
  )
}

function InfoIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  )
}

function TripSummarySection() {
  return (
    <div className="space-y-4">
      <h3 className="text-base-content text-sm font-semibold">Trip summary</h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-base-content/60 text-sm">Status</span>
          <Badge status="in-progress" size="sm">
            {MOCK_TRIP.tripSummary.status}
          </Badge>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-base-content/60 text-sm">Type</span>
          <span className="text-base-content text-sm">{MOCK_TRIP.tripSummary.type}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-base-content/60 text-sm">Departure</span>
          <span className="text-base-content text-sm">{MOCK_TRIP.tripSummary.departure}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-base-content/60 text-sm">Team</span>
          <AvatarGroup avatars={MOCK_TRIP.tripSummary.team} size="sm" max={4} />
        </div>
      </div>
    </div>
  )
}

function RouteSection() {
  return (
    <div className="space-y-4">
      <h3 className="text-base-content text-sm font-semibold">Route</h3>
      <div className="bg-base-200 flex h-48 items-center justify-center rounded-lg">
        <span className="text-base-content/40 text-sm">Map placeholder</span>
      </div>
    </div>
  )
}

function ItinerarySection() {
  return (
    <div className="space-y-4">
      <h3 className="text-base-content text-sm font-semibold">Itinerary</h3>
      <div className="space-y-3">
        {MOCK_TRIP.itinerary.map((trip) => (
          <TripCard
            key={trip.routeCode}
            routeCode={trip.routeCode}
            departureDate={trip.departureDate}
            departureTime={trip.departureTime}
            jetCategory={trip.jetCategory}
            pax={trip.pax}
            luggage={trip.luggage}
            pets={trip.pets}
            {...(trip.requirements != null ? { requirements: trip.requirements } : {})}
          />
        ))}
      </div>
    </div>
  )
}

export default function TripDetailPage() {
  const [panelOpen, setPanelOpen] = useState(true)
  const [selectedAircraft, setSelectedAircraft] = useState<string>(
    MOCK_TRIP.aircraftOptions[0]?.name ?? '',
  )

  return (
    <div className="space-y-6">
      {/* Back button and trip header */}
      <div className="flex items-center gap-4">
        <a href="/pipeline" className="btn btn-ghost btn-sm gap-2">
          <ArrowLeftIcon />
          Back
        </a>
        <div className="flex items-center gap-3">
          <h1 className="text-h3 text-base-content font-bold">{MOCK_TRIP.tripId}</h1>
          <Badge status="in-progress" size="sm">
            Quotes in progress
          </Badge>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => setPanelOpen(true)}>
            <InfoIcon />
            Trip info
          </Button>
        </div>
      </div>

      {/* Stepper */}
      <div className="border-base-300 bg-base-100 rounded-lg border p-6">
        <Stepper steps={MOCK_TRIP.steps} />
      </div>

      {/* Aircraft selection */}
      <div className="space-y-4">
        <h2 className="text-base-content text-lg font-semibold">Aircraft selection</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {MOCK_TRIP.aircraftOptions.map((aircraft) => (
            <AircraftCard
              key={aircraft.name}
              name={aircraft.name}
              type={aircraft.type}
              suggested={aircraft.suggested}
              price={aircraft.price}
              availability={aircraft.availability}
              insights={aircraft.insights}
              selected={selectedAircraft === aircraft.name}
              onSelect={() => setSelectedAircraft(aircraft.name)}
            />
          ))}
        </div>
      </div>

      {/* Gantt timeline */}
      <div className="space-y-4">
        <h2 className="text-base-content text-lg font-semibold">Flight schedule</h2>
        <div className="border-base-300 bg-base-100 rounded-lg border p-4">
          <GanttTimeline dates={MOCK_TRIP.timelineDates} blocks={MOCK_TRIP.timelineBlocks} />
        </div>
      </div>

      {/* Flight segments */}
      <div className="space-y-4">
        <h2 className="text-base-content text-lg font-semibold">Flight segments</h2>
        <div className="border-base-300 bg-base-100 rounded-lg border">
          <FlightSegmentsTable segments={MOCK_TRIP.flightSegments} />
        </div>
      </div>

      {/* Detail panel */}
      <DetailPanel title="Trip information" open={panelOpen} onClose={() => setPanelOpen(false)}>
        <Tabs
          variant="underline"
          tabs={[
            {
              label: 'Summary',
              content: (
                <div className="space-y-6">
                  <TripSummarySection />
                  <div className="border-base-300 border-t" />
                  <RouteSection />
                </div>
              ),
            },
            {
              label: 'Itinerary',
              content: <ItinerarySection />,
            },
            {
              label: 'Documents',
              content: (
                <div className="text-base-content/40 flex h-32 items-center justify-center text-sm">
                  No documents uploaded
                </div>
              ),
            },
          ]}
        />
      </DetailPanel>
    </div>
  )
}
