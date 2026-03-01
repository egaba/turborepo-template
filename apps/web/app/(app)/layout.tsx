'use client'

import type { ReactNode } from 'react'

import { usePathname } from 'next/navigation'

import { AppSidebar } from '@repo/ui/app-sidebar'
import { ThemeToggle } from '@repo/ui/theme-toggle'

const DRAWER_ID = 'app-drawer'

const SIDEBAR_SECTIONS = [
  {
    label: 'Workspaces',
    items: [
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'AI Inbox', href: '/inbox' },
      { label: 'Pipeline', href: '/pipeline' },
    ],
  },
  {
    label: 'Operation',
    items: [
      { label: 'Trips', href: '/trips/TRP-2847' },
      { label: 'Scheduling', href: '/scheduling' },
      { label: 'Fleet', href: '/fleet' },
    ],
  },
  {
    label: 'Marketplace',
    items: [
      { label: 'Browse', href: '/marketplace' },
      { label: 'Saved', href: '/marketplace/saved' },
    ],
  },
  {
    label: 'Records',
    items: [
      { label: 'Contacts', href: '/contacts' },
      { label: 'Accounts', href: '/accounts' },
      { label: 'Reports', href: '/reports' },
    ],
  },
]

export default function AppLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const pathname = usePathname()

  return (
    <div className="drawer lg:drawer-open">
      <input id={DRAWER_ID} type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex min-h-screen flex-col bg-base-200">
        <div className="flex items-center gap-2 p-4 lg:hidden">
          <label
            htmlFor={DRAWER_ID}
            className="btn btn-square btn-ghost"
            aria-label="Open navigation"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
        </div>

        <main className="flex-1 p-6">{children}</main>
      </div>

      <div className="drawer-side">
        <label
          htmlFor={DRAWER_ID}
          className="drawer-overlay"
          aria-label="Close navigation"
        />
        <AppSidebar
          sections={SIDEBAR_SECTIONS}
          currentPath={pathname}
          logo={
            <span className="text-lg font-bold tracking-tight text-base-content">
              Project
            </span>
          }
          footer={<ThemeToggle />}
        />
      </div>
    </div>
  )
}
