type AircraftCardProps = Readonly<{
  name: string
  type: string
  suggested?: boolean
  price?: string
  availability?: { available: number; total: number }
  insights?: string[]
  onSelect?: () => void
  selected?: boolean
  className?: string
}>

export function AircraftCard({
  name,
  type,
  suggested = false,
  price,
  availability,
  insights,
  onSelect,
  selected = false,
  className = '',
}: AircraftCardProps) {
  return (
    <div
      className={`bg-base-100 transition-smooth-fast rounded-lg border ${
        selected
          ? 'border-accent ring-accent/20 ring-2'
          : 'border-base-300 hover:border-base-content/20'
      } ${className}`.trim()}
    >
      <div className="relative">
        <div className="bg-base-200 flex h-36 items-center justify-center rounded-t-lg">
          <svg
            className="text-base-content/20 h-16 w-16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </div>
        {suggested && (
          <span className="bg-accent text-accent-content absolute left-3 top-3 rounded-full px-2 py-0.5 text-xs font-medium">
            Suggested
          </span>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-base-content font-semibold">{name}</h3>
            <p className="text-base-content/60 text-sm">{type}</p>
          </div>
          {price && <span className="text-base-content text-sm font-semibold">{price}</span>}
        </div>

        {availability && (
          <div className="mt-3">
            <div className="text-base-content/60 flex items-center justify-between text-xs">
              <span>Availability</span>
              <span>
                {availability.available}/{availability.total}
              </span>
            </div>
            <div className="bg-base-300 mt-1 h-1.5 w-full rounded-full">
              <div
                className="bg-success h-1.5 rounded-full"
                style={{
                  width: `${(availability.available / availability.total) * 100}%`,
                }}
              />
            </div>
          </div>
        )}

        {insights && insights.length > 0 && (
          <ul className="mt-3 space-y-1">
            {insights.map((insight) => (
              <li key={insight} className="text-base-content/60 flex items-start gap-1.5 text-xs">
                <svg
                  className="text-info mt-0.5 h-3 w-3 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {insight}
              </li>
            ))}
          </ul>
        )}

        {onSelect && (
          <button
            type="button"
            onClick={onSelect}
            className={`btn btn-sm mt-4 w-full ${selected ? 'btn-accent' : 'btn-outline'}`}
          >
            {selected ? 'Selected' : 'Select Aircraft'}
          </button>
        )}
      </div>
    </div>
  )
}
