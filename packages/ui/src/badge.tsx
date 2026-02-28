import type { ReactNode } from 'react'

type BadgeVariant = 'primary' | 'secondary' | 'accent' | 'ghost' | 'outline'
type BadgeSize = 'sm' | 'md' | 'lg'

type BadgeProps = Readonly<{
  children: ReactNode
  variant?: BadgeVariant
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

const sizeClass: Record<BadgeSize, string> = {
  sm: 'badge-sm',
  md: 'badge-md',
  lg: 'badge-lg',
}

export function Badge({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
}: BadgeProps) {
  return (
    <span
      className={`badge ${variantClass[variant]} ${sizeClass[size]} ${className}`.trim()}
    >
      {children}
    </span>
  )
}
