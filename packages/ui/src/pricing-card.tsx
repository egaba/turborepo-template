import type { ReactNode } from 'react'

type PricingCardProps = Readonly<{
  name: string
  price: string
  period: string
  features: string[]
  cta: ReactNode
  popular?: boolean
  className?: string
}>

export function PricingCard({
  name,
  price,
  period,
  features,
  cta,
  popular = false,
  className = '',
}: PricingCardProps) {
  return (
    <div
      className={`card bg-base-100 border border-base-300/50 ${popular ? 'border-2 border-primary' : ''} ${className}`.trim()}
    >
      <div className="card-body">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-base-content">{name}</h3>
          {popular && (
            <span className="badge badge-primary badge-sm">Popular</span>
          )}
        </div>
        <div className="mt-4">
          <span className="text-4xl font-bold text-base-content">
            {price}
          </span>
          <span className="text-base-content/60">/{period}</span>
        </div>
        <ul className="mt-6 space-y-3">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm">
              <svg
                className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-base-content/70">{feature}</span>
            </li>
          ))}
        </ul>
        <div className="card-actions mt-8">{cta}</div>
      </div>
    </div>
  )
}
