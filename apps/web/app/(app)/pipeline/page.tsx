'use client'

import { useState } from 'react'

import { AvatarGroup } from '@repo/ui/avatar-group'
import { Badge } from '@repo/ui/badge'
import { Button } from '@repo/ui/button'
import { DataTable } from '@repo/ui/data-table'
import { PageHeader } from '@repo/ui/page-header'
import { PipelineTabs } from '@repo/ui/pipeline-tabs'

import { MOCK_LEADS, PIPELINE_STAGES } from './_data/mock-leads'

function SearchIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  )
}

function FilterIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
      />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  )
}

function EllipsisIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 12h.01M12 12h.01M19 12h.01"
      />
    </svg>
  )
}

type LeadRow = (typeof MOCK_LEADS)[number]

const columns = [
  {
    key: 'tripId',
    header: 'Trip ID',
    sortable: true,
    className: 'font-medium',
    render: (row: LeadRow) => (
      <a href={`/trips/${row.tripId}`} className="text-accent font-medium hover:underline">
        {row.tripId}
      </a>
    ),
  },
  {
    key: 'tripStatus',
    header: 'Status',
    render: (row: LeadRow) => (
      <Badge status={row.tripStatusVariant} size="sm">
        {row.tripStatus}
      </Badge>
    ),
  },
  {
    key: 'itinerary',
    header: 'Itinerary',
    sortable: true,
    render: (row: LeadRow) => (
      <span className="text-base-content font-medium">{row.itinerary}</span>
    ),
  },
  {
    key: 'departureDate',
    header: 'Departure',
    sortable: true,
  },
  {
    key: 'contact',
    header: 'Contact',
    render: (row: LeadRow) => (
      <div>
        <div className="text-base-content text-sm font-medium">{row.contact}</div>
        <div className="text-base-content/50 text-xs">{row.contactCompany}</div>
      </div>
    ),
  },
  {
    key: 'salesAgents',
    header: 'Sales agent',
    render: (row: LeadRow) => <AvatarGroup avatars={row.salesAgents} size="sm" max={3} />,
  },
  {
    key: 'aircraftAvailability',
    header: 'Aircraft',
    render: (row: LeadRow) => (
      <span
        className={`text-sm ${
          row.aircraftAvailability.startsWith('0') ? 'text-error' : 'text-base-content/70'
        }`}
      >
        {row.aircraftAvailability}
      </span>
    ),
  },
  {
    key: 'totalPrice',
    header: 'Price',
    sortable: true,
    render: (row: LeadRow) => (
      <span className="text-base-content font-medium">{row.totalPrice}</span>
    ),
  },
  {
    key: 'lastThread',
    header: 'Last thread',
    className: 'max-w-48',
    render: (row: LeadRow) => (
      <span className="text-base-content/70 truncate text-sm">{row.lastThread}</span>
    ),
  },
  {
    key: 'lastUpdate',
    header: 'Updated',
    sortable: true,
    render: (row: LeadRow) => (
      <span className="text-base-content/50 text-xs">{row.lastUpdate}</span>
    ),
  },
  {
    key: 'actions',
    header: '',
    className: 'w-10',
    render: () => (
      <button type="button" className="btn btn-ghost btn-xs btn-circle">
        <EllipsisIcon />
      </button>
    ),
  },
]

export default function PipelinePage() {
  const [activeStage, setActiveStage] = useState(0)

  return (
    <div className="space-y-6">
      <PageHeader
        title="Pipeline"
        actions={
          <>
            <Button variant="ghost" size="sm">
              <SearchIcon />
              Search
            </Button>
            <Button variant="ghost" size="sm">
              <FilterIcon />
              Filters
            </Button>
            <Button variant="primary" size="sm">
              <PlusIcon />
              Create new trip
            </Button>
          </>
        }
      />

      <PipelineTabs
        stages={PIPELINE_STAGES.map((s) => ({ label: s.label, count: s.count }))}
        activeIndex={activeStage}
        onStageClick={setActiveStage}
        className="border-base-300 bg-base-100 rounded-lg border px-2"
      />

      <div className="border-base-300 bg-base-100 rounded-lg border">
        <DataTable<LeadRow>
          columns={columns}
          data={MOCK_LEADS}
          selectable
          onRowClick={(row) => {
            window.location.href = `/trips/${row.tripId}`
          }}
        />
      </div>
    </div>
  )
}
