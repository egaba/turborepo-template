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
      className={`bg-neutral text-neutral-content rounded-2xl px-6 py-20 text-center sm:px-16 ${className}`.trim()}
    >
      <h2 className="text-h2">{heading}</h2>
      <p className="text-neutral-content/80 mx-auto mt-4 max-w-2xl text-lg">{description}</p>
      <div className="mt-8 flex items-center justify-center gap-4">
        {primaryCta}
        {secondaryCta}
      </div>
    </div>
  )
}
