import type { ReactNode } from 'react'

type CtaSectionProps = Readonly<{
  heading: string
  description: string
  primaryCta: ReactNode
  secondaryCta?: ReactNode
  className?: string
}>

export function CtaSection({
  heading,
  description,
  primaryCta,
  secondaryCta,
  className = '',
}: CtaSectionProps) {
  return (
    <div
      className={`rounded-2xl bg-neutral px-6 py-16 text-center text-neutral-content sm:px-12 ${className}`.trim()}
    >
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
        {heading}
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-content/80">
        {description}
      </p>
      <div className="mt-8 flex items-center justify-center gap-4">
        {primaryCta}
        {secondaryCta}
      </div>
    </div>
  )
}
