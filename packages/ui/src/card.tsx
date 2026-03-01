import type { ReactNode } from 'react'

type CardProps = Readonly<{
  children: ReactNode
  title?: string
  className?: string
}>

export function Card({ children, title, className = '' }: CardProps) {
  return (
    <div className={`card bg-base-100 border-base-300/50 border shadow-sm ${className}`.trim()}>
      <div className="card-body">
        {title && <h2 className="card-title">{title}</h2>}
        {children}
      </div>
    </div>
  )
}
