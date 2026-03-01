import type { ReactNode } from 'react'

type HeroProps = Readonly<{
  eyebrow?: string
  heading: string
  description: string
  primaryCta: ReactNode
  secondaryCta?: ReactNode
}>

export function Hero({
  eyebrow,
  heading,
  description,
  primaryCta,
  secondaryCta,
}: HeroProps) {
  return (
    <div className="pb-[var(--space-section)] pt-[var(--space-page-top)] text-center">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {eyebrow && (
          <div className="mb-6">
            <span className="badge badge-primary badge-outline font-medium">
              {eyebrow}
            </span>
          </div>
        )}
        <h1 className="text-h1 text-base-content">
          {heading}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-base-content/50 sm:text-xl">
          {description}
        </p>
        <div className="mt-12 flex items-center justify-center gap-4">
          {primaryCta}
          {secondaryCta}
        </div>
      </div>
    </div>
  )
}
