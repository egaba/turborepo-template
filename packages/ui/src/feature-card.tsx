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
      className={`card bg-base-100 border-base-300/30 transition-smooth hover:border-accent/40 border ${className}`.trim()}
    >
      <div className="card-body">
        <div className="bg-accent/10 text-accent mb-3 flex h-10 w-10 items-center justify-center rounded-lg text-2xl">
          {icon}
        </div>
        <h3 className="card-title text-h6">{heading}</h3>
        <p className="text-base-content/70">{description}</p>
        {href && (
          <div className="card-actions mt-2">
            <span className="text-accent font-medium">Learn more &rarr;</span>
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
