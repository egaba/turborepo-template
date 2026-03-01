import type { ReactNode } from 'react'

type FooterColumn = Readonly<{
  title: string
  links: Readonly<{ label: string; href: string }>[]
}>

type SocialLink = Readonly<{
  label: string
  href: string
  icon: ReactNode
}>

type FooterProps = Readonly<{
  logo: ReactNode
  columns: FooterColumn[]
  copyright: string
  socialLinks?: SocialLink[]
}>

export function Footer({ logo, columns, copyright, socialLinks }: FooterProps) {
  return (
    <footer className="border-t border-base-300/40 bg-base-200 text-base-content">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="text-xl font-bold">{logo}</div>
          </div>

          {/* Link columns */}
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-base-content/50">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-base-content/70 transition-colors hover:text-base-content"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between border-t border-base-300 pt-8 sm:flex-row">
          <p className="text-sm text-base-content/50">{copyright}</p>
          {socialLinks && socialLinks.length > 0 && (
            <div className="mt-4 flex gap-4 sm:mt-0">
              {socialLinks.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  className="text-base-content/50 transition-colors hover:text-base-content"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  )
}
