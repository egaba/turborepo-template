type Logo = Readonly<{
  src: string
  alt: string
  href?: string
}>

type LogoCloudProps = Readonly<{
  logos: Logo[]
  heading?: string
  className?: string
}>

export function LogoCloud({ logos, heading, className = '' }: LogoCloudProps) {
  return (
    <div className={`py-12 ${className}`.trim()}>
      {heading && (
        <p className="mb-8 text-center text-sm font-medium uppercase tracking-wider text-base-content/50">
          {heading}
        </p>
      )}
      <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
        {logos.map((logo) => {
          const img = (
            <img
              key={logo.src}
              src={logo.src}
              alt={logo.alt}
              className="h-8 max-w-[120px] object-contain grayscale transition-all hover:grayscale-0 md:h-10"
            />
          )

          if (logo.href) {
            return (
              <a key={logo.src} href={logo.href}>
                {img}
              </a>
            )
          }

          return img
        })}
      </div>
    </div>
  )
}
