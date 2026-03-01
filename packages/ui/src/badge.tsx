import type { ReactNode } from 'react'

type BadgeVariant = 'primary' | 'secondary' | 'accent' | 'ghost' | 'outline'
type BadgeStatus =
  | 'new-request'
  | 'quote-sent'
  | 'booking-confirmed'
  | 'trip-info-missing'
  | 'in-progress'
  | 'completed'
type BadgeSize = 'sm' | 'md' | 'lg'

type BadgeProps = Readonly<{
  children: ReactNode
  variant?: BadgeVariant
  status?: BadgeStatus
  size?: BadgeSize
  className?: string
}>

const variantClass: Record<BadgeVariant, string> = {
  primary: 'badge-primary',
  secondary: 'badge-secondary',
  accent: 'badge-accent',
  ghost: 'badge-ghost',
  outline: 'badge-outline',
}

const statusClass: Record<BadgeStatus, string> = {
  'new-request': 'bg-warning/15 text-warning border-warning/30',
  'quote-sent': 'bg-success/15 text-success border-success/30',
  'booking-confirmed': 'bg-secondary/15 text-secondary border-secondary/30',
  'trip-info-missing': 'bg-error/15 text-error border-error/30',
  'in-progress': 'bg-info/15 text-info border-info/30',
  'completed': 'bg-success/15 text-success border-success/30',
}

const sizeClass: Record<BadgeSize, string> = {
  sm: 'badge-sm',
  md: 'badge-md',
  lg: 'badge-lg',
}

export function Badge({
  children,
  variant = 'primary',
  status,
  size = 'md',
  className = '',
}: BadgeProps) {
  const baseClass = status
    ? `badge border ${statusClass[status]}`
    : `badge ${variantClass[variant]}`

  return (
    <span
      className={`${baseClass} ${sizeClass[size]} ${className}`.trim()}
    >
      {children}
    </span>
  )
}
