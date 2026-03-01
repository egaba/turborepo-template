import { DataTable } from './data-table.js'

type CodeType = 'positioning' | 'revenue'

type FlightSegment = {
  segNumber: number
  code: string
  codeType?: CodeType
  from: string
  to: string
  departureDate: string
  departureTime: string
  arrivalTime: string
  ete: string
  pax: number
}

type FlightSegmentsTableProps = Readonly<{
  segments: FlightSegment[]
  className?: string
}>

const codeTypeClass: Record<CodeType, string> = {
  positioning: 'bg-base-300 text-base-content/60',
  revenue: 'bg-success/15 text-success',
}

const columns = [
  {
    key: 'segNumber',
    header: '#',
    className: 'w-12',
    render: (row: FlightSegment) => <span className="text-base-content/50">{row.segNumber}</span>,
  },
  {
    key: 'code',
    header: 'Code',
    render: (row: FlightSegment) => (
      <div className="flex items-center gap-2">
        <span className="font-medium">{row.code}</span>
        {row.codeType && (
          <span className={`rounded px-1.5 py-0.5 text-xs ${codeTypeClass[row.codeType]}`}>
            {row.codeType === 'positioning' ? 'POS' : 'REV'}
          </span>
        )}
      </div>
    ),
  },
  {
    key: 'from',
    header: 'From',
    sortable: true,
  },
  {
    key: 'to',
    header: 'To',
    sortable: true,
  },
  {
    key: 'departureDate',
    header: 'Date',
    sortable: true,
  },
  {
    key: 'departureTime',
    header: 'Dep',
  },
  {
    key: 'arrivalTime',
    header: 'Arr',
  },
  {
    key: 'ete',
    header: 'ETE',
  },
  {
    key: 'pax',
    header: 'PAX',
    render: (row: FlightSegment) => (
      <span className={row.pax === 0 ? 'text-base-content/40' : ''}>{row.pax}</span>
    ),
  },
]

export function FlightSegmentsTable({ segments, className = '' }: FlightSegmentsTableProps) {
  return <DataTable<FlightSegment> columns={columns} data={segments} className={className} />
}
