import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'ghost' | 'outline'
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg'

type ButtonProps = Readonly<{
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
}> &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>

const variantClass: Record<ButtonVariant, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  accent: 'btn-accent',
  ghost: 'btn-ghost',
  outline: 'btn-outline',
}

const sizeClass: Record<ButtonSize, string> = {
  xs: 'btn-xs',
  sm: 'btn-sm',
  md: 'btn-md',
  lg: 'btn-lg',
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`btn transition-smooth ${variantClass[variant]} ${sizeClass[size]} ${className}`.trim()}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && <span className="loading loading-spinner loading-sm" />}
      {children}
    </button>
  )
}
