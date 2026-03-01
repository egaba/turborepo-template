type TripCardProps = Readonly<{
  routeCode: string
  departureDate: string
  departureTime: string
  jetCategory?: string
  pax?: number
  luggage?: number
  pets?: number
  requirements?: string
  onEdit?: () => void
  className?: string
}>

export function TripCard({
  routeCode,
  departureDate,
  departureTime,
  jetCategory,
  pax,
  luggage,
  pets,
  requirements,
  onEdit,
  className = '',
}: TripCardProps) {
  return (
    <div
      className={`rounded-lg border border-base-300 bg-base-100 p-4 ${className}`.trim()}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold text-base-content">{routeCode}</h3>
          <p className="text-sm text-base-content/60">
            {departureDate} at {departureTime}
          </p>
        </div>
        {onEdit && (
          <button
            type="button"
            onClick={onEdit}
            className="btn btn-ghost btn-sm"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
        )}
      </div>

      <div className="mt-3 flex flex-wrap gap-4 text-sm text-base-content/70">
        {jetCategory && (
          <div className="flex items-center gap-1.5">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            {jetCategory}
          </div>
        )}
        {pax != null && (
          <div className="flex items-center gap-1.5">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {pax} PAX
          </div>
        )}
        {luggage != null && (
          <div className="flex items-center gap-1.5">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            {luggage} bag{luggage !== 1 ? 's' : ''}
          </div>
        )}
        {pets != null && pets > 0 && (
          <div className="flex items-center gap-1.5">
            <span className="text-base">&#128054;</span>
            {pets} pet{pets !== 1 ? 's' : ''}
          </div>
        )}
      </div>

      {requirements && (
        <div className="mt-3 rounded-md bg-base-200 px-3 py-2 text-sm text-base-content/70">
          {requirements}
        </div>
      )}
    </div>
  )
}
