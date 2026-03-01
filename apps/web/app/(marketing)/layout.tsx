import type { ReactNode } from 'react'

import { Footer } from '@repo/ui/footer'

import { MarketingHeader } from '@/components/layouts/marketing-header'

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <MarketingHeader />
      <main className="flex-1">{children}</main>
      <Footer
        logo="Project"
        columns={[
          {
            title: 'Product',
            links: [
              { label: 'Features', href: '#features' },
              { label: 'Pricing', href: '#pricing' },
              { label: 'Changelog', href: '#' },
              { label: 'Documentation', href: '#docs' },
            ],
          },
          {
            title: 'Company',
            links: [
              { label: 'About', href: '#' },
              { label: 'Blog', href: '#' },
              { label: 'Careers', href: '#' },
              { label: 'Contact', href: '#' },
            ],
          },
          {
            title: 'Legal',
            links: [
              { label: 'Privacy Policy', href: '#' },
              { label: 'Terms of Service', href: '#' },
              { label: 'Cookie Policy', href: '#' },
            ],
          },
        ]}
        copyright={`\u00a9 ${new Date().getFullYear()} Project. All rights reserved.`}
      />
    </div>
  )
}
