type StatusVariant = 'new-request' | 'quote-sent' | 'booking-confirmed' | 'trip-info-missing'

type EmailListItemProps = Readonly<{
  sender: string
  company?: string
  subject: string
  preview: string
  tripId?: string
  status?: string
  statusVariant?: StatusVariant
  timestamp: string
  unread?: boolean
  starred?: boolean
  threadCount?: number
  selected?: boolean
  onSelect?: () => void
  onStar?: () => void
  className?: string
}>

const statusVariantClass: Record<StatusVariant, string> = {
  'new-request': 'bg-warning/15 text-warning border-warning/30',
  'quote-sent': 'bg-success/15 text-success border-success/30',
  'booking-confirmed': 'bg-secondary/15 text-secondary border-secondary/30',
  'trip-info-missing': 'bg-error/15 text-error border-error/30',
}

export function EmailListItem({
  sender,
  company,
  subject,
  preview,
  tripId,
  status,
  statusVariant,
  timestamp,
  unread = false,
  starred = false,
  threadCount,
  selected = false,
  onSelect,
  onStar,
  className = '',
}: EmailListItemProps) {
  return (
    <div
      className={`border-base-300 transition-smooth-fast flex items-start gap-3 border-b px-4 py-3 ${
        selected ? 'bg-accent/5' : 'hover:bg-base-200'
      } ${className}`.trim()}
    >
      {onSelect && (
        <div className="flex shrink-0 pt-1">
          <input
            type="checkbox"
            className="checkbox checkbox-sm"
            checked={selected}
            onChange={onSelect}
          />
        </div>
      )}

      {onStar && (
        <button
          type="button"
          onClick={onStar}
          className="shrink-0 pt-1"
          aria-label={starred ? 'Unstar' : 'Star'}
        >
          <svg
            className={`h-4 w-4 ${starred ? 'fill-warning text-warning' : 'text-base-content/30 hover:text-warning'}`}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            fill={starred ? 'currentColor' : 'none'}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
        </button>
      )}

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 truncate">
            <span
              className={`truncate text-sm ${unread ? 'text-base-content font-semibold' : 'text-base-content/80'}`}
            >
              {sender}
            </span>
            {company && <span className="text-base-content/50 truncate text-xs">{company}</span>}
            {threadCount != null && threadCount > 1 && (
              <span className="text-base-content/40 shrink-0 text-xs">({threadCount})</span>
            )}
          </div>
          <span className="text-base-content/50 shrink-0 text-xs">{timestamp}</span>
        </div>

        <div className="flex items-center gap-2">
          <p
            className={`truncate text-sm ${unread ? 'text-base-content font-medium' : 'text-base-content/70'}`}
          >
            {subject}
          </p>
          {tripId && (
            <span className="bg-base-200 text-base-content/50 shrink-0 rounded px-1.5 py-0.5 text-xs">
              {tripId}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <p className="text-base-content/50 truncate text-xs">{preview}</p>
          {status && statusVariant && (
            <span
              className={`shrink-0 rounded-full border px-2 py-0.5 text-xs ${statusVariantClass[statusVariant]}`}
            >
              {status}
            </span>
          )}
        </div>
      </div>

      {unread && <div className="bg-accent mt-2 h-2 w-2 shrink-0 rounded-full" />}
    </div>
  )
}
