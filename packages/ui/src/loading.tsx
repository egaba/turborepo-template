import type { ReactNode } from 'react'

type SpinnerVariant = 'spinner' | 'dots' | 'ring' | 'ball' | 'bars' | 'infinity'
type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg'

type SpinnerProps = Readonly<{
  size?: SpinnerSize
  variant?: SpinnerVariant
  className?: string
}>

type SkeletonProps = Readonly<{
  className?: string
}>

type LoadingOverlayProps = Readonly<{
  loading: boolean
  children: ReactNode
  className?: string
}>

const spinnerVariantClass: Record<SpinnerVariant, string> = {
  spinner: 'loading-spinner',
  dots: 'loading-dots',
  ring: 'loading-ring',
  ball: 'loading-ball',
  bars: 'loading-bars',
  infinity: 'loading-infinity',
}

const spinnerSizeClass: Record<SpinnerSize, string> = {
  xs: 'loading-xs',
  sm: 'loading-sm',
  md: 'loading-md',
  lg: 'loading-lg',
}

export function Spinner({
  size = 'md',
  variant = 'spinner',
  className = '',
}: SpinnerProps) {
  return (
    <span
      className={`loading ${spinnerVariantClass[variant]} ${spinnerSizeClass[size]} ${className}`.trim()}
    />
  )
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return <div className={`skeleton ${className}`.trim()} />
}

export function LoadingOverlay({
  loading,
  children,
  className = '',
}: LoadingOverlayProps) {
  return (
    <div className={`relative ${className}`.trim()}>
      {children}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-base-100/60 rounded-inherit">
          <Spinner size="lg" variant="spinner" />
        </div>
      )}
    </div>
  )
}
