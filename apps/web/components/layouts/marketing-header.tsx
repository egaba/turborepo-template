'use client'

import Link from 'next/link'
import { useState } from 'react'

import { ThemeToggle } from '@repo/ui/theme-toggle'

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Documentation', href: '#docs' },
  { label: 'Pricing', href: '#pricing' },
] as const

export function MarketingHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="navbar bg-base-100/80 backdrop-blur-md border-b border-base-300/40 sticky top-0 z-50 px-4 sm:px-6 lg:px-8">
      <div className="navbar-start">
        <div className="dropdown lg:hidden">
          <button
            tabIndex={0}
            className="btn btn-ghost btn-sm"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          {mobileOpen && (
            <ul tabIndex={0} className="dropdown-content menu menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 border border-base-300/50 p-2 shadow-lg">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} onClick={() => setMobileOpen(false)}>{link.label}</a>
                </li>
              ))}
              <li>
                <Link href="/dashboard" onClick={() => setMobileOpen(false)}>Dashboard</Link>
              </li>
            </ul>
          )}
        </div>
        <Link href="/" className="text-lg font-bold tracking-tight text-base-content">
          Project
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-1 text-sm font-medium">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="rounded-field">{link.label}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-end gap-2">
        <ThemeToggle />
        <Link href="/dashboard" className="btn btn-ghost btn-sm hidden lg:inline-flex">
          Dashboard
        </Link>
        <a href="#get-started" className="btn btn-primary btn-sm">
          Get Started
        </a>
      </div>
    </header>
  )
}
