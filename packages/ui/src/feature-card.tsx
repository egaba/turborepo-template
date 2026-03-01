import type { ReactNode } from 'react'

type FeatureCardProps = Readonly<{
  icon: ReactNode
  heading: string
  description: string
  href?: string
  className?: string
}>

export function FeatureCard({
  icon,
  heading,
  description,
  href,
  className = '',
}: FeatureCardProps) {
  const content = (
    <div
      className={`card bg-base-100 border border-base-300/50 transition-colors hover:border-base-300 ${className}`.trim()}
    >
      <div className="card-body">
        <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-2xl text-primary">{icon}</div>
        <h3 className="card-title text-lg">{heading}</h3>
        <p className="text-base-content/70">{description}</p>
        {href && (
          <div className="card-actions mt-2">
            <span className="font-medium text-primary">
              Learn more &rarr;
            </span>
          </div>
        )}
      </div>
    </div>
  )

  if (href) {
    return (
      <a href={href} className="block no-underline">
        {content}
      </a>
    )
  }

  return content
}
