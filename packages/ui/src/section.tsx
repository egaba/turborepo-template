import type { ReactNode } from 'react'

type SectionProps = Readonly<{
  children: ReactNode
  heading?: string
  description?: string
  className?: string
}>

export function Section({
  children,
  heading,
  description,
  className = '',
}: SectionProps) {
  return (
    <section
      className={`py-[var(--space-section)] ${className}`.trim()}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {(heading || description) && (
          <div className="mb-16 text-center">
            {heading && (
              <h2 className="text-h2 text-base-content">
                {heading}
              </h2>
            )}
            {description && (
              <p className="mx-auto mt-4 max-w-2xl text-lg text-base-content/70">
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
