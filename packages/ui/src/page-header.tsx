import type { ReactNode } from 'react'

type PageHeaderProps = Readonly<{
  title: string
  badge?: ReactNode
  subtitle?: string
  tabs?: ReactNode
  actions?: ReactNode
  className?: string
}>

export function PageHeader({
  title,
  badge,
  subtitle,
  tabs,
  actions,
  className = '',
}: PageHeaderProps) {
  return (
    <div className={`space-y-4 ${className}`.trim()}>
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-h3 text-base-content font-bold">{title}</h1>
            {badge}
          </div>
          {subtitle && <p className="text-base-content/60 text-sm">{subtitle}</p>}
        </div>
        {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
      </div>
      {tabs}
    </div>
  )
}
