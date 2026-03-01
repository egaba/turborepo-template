'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { ThemeToggle } from '@repo/ui/theme-toggle'

import { cn } from '@/lib/cn'

type NavItem = {
  label: string
  href: string
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Tasks', href: '/tasks' },
]

export function SidebarContent() {
  const pathname = usePathname()

  return (
    <>
      <div className="p-6">
        <Link href="/" className="text-base-content text-xl font-bold tracking-tight">
          Project
        </Link>
      </div>
      <nav className="flex-1 px-4">
        <ul className="menu gap-1">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className={cn(pathname === item.href && 'active')}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="border-base-300/40 border-t p-4">
        <ThemeToggle />
      </div>
    </>
  )
}
