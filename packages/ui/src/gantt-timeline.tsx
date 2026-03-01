type TimelineVariant = 'positioning' | 'revenue' | 'active'

type TimelineBlock = Readonly<{
  label: string
  startCol: number
  spanCols: number
  variant: TimelineVariant
}>

type GanttTimelineProps = Readonly<{
  dates: string[]
  blocks: TimelineBlock[]
  className?: string
}>

const blockVariantClass: Record<TimelineVariant, string> = {
  positioning: 'bg-base-300 text-base-content/60',
  revenue: 'bg-success/20 text-success',
  active: 'bg-accent/20 text-accent',
}

export function GanttTimeline({
  dates,
  blocks,
  className = '',
}: GanttTimelineProps) {
  return (
    <div className={`overflow-x-auto ${className}`.trim()}>
      <div
        className="grid min-w-max"
        style={{
          gridTemplateColumns: `repeat(${dates.length}, minmax(80px, 1fr))`,
        }}
      >
        {dates.map((date) => (
          <div
            key={date}
            className="border-b border-r border-base-300 px-2 py-1.5 text-center text-xs font-medium text-base-content/60"
          >
            {date}
          </div>
        ))}

        {dates.map((date) => (
          <div
            key={`bg-${date}`}
            className="h-12 border-r border-base-300/50"
          />
        ))}
      </div>

      <div
        className="relative grid min-w-max"
        style={{
          gridTemplateColumns: `repeat(${dates.length}, minmax(80px, 1fr))`,
          marginTop: '-48px',
          height: '48px',
        }}
      >
        {blocks.map((block) => (
          <div
            key={`${block.label}-${block.startCol}`}
            className={`flex items-center justify-center rounded px-2 text-xs font-medium ${blockVariantClass[block.variant]}`}
            style={{
              gridColumn: `${block.startCol + 1} / span ${block.spanCols}`,
              margin: '8px 4px',
            }}
          >
            {block.label}
          </div>
        ))}
      </div>
    </div>
  )
}
