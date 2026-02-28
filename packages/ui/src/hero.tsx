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
    <div className="py-20 text-center md:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {eyebrow && (
          <div className="mb-6">
            <span className="badge badge-primary badge-outline font-medium">
              {eyebrow}
            </span>
          </div>
        )}
        <h1 className="text-4xl font-extrabold tracking-tight text-base-content sm:text-5xl lg:text-6xl">
          {heading}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-base-content/70 sm:text-xl">
          {description}
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          {primaryCta}
          {secondaryCta}
        </div>
      </div>
    </div>
  )
}
