'use client'

import type { ReactNode } from 'react'
import { useState } from 'react'

type NavLink = Readonly<{
  label: string
  href: string
}>

type NavbarProps = Readonly<{
  logo: ReactNode
  links: NavLink[]
  actions?: ReactNode
}>

export function Navbar({ logo, links, actions }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="navbar bg-base-100/80 border-base-300/40 sticky top-0 z-50 border-b backdrop-blur-md">
      <div className="navbar-start">
        {/* Mobile dropdown */}
        <div className="dropdown">
          <button
            tabIndex={0}
            className="btn btn-ghost lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
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
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
          {mobileOpen && (
            <ul
              tabIndex={0}
              className="dropdown-content menu menu-sm rounded-box bg-base-100 z-[1] mt-3 w-52 p-2 shadow"
            >
              {links.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <a className="btn btn-ghost text-xl">{logo}</a>
      </div>

      {/* Desktop links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-1 px-1">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      </div>

      <div className="navbar-end gap-2">{actions}</div>
    </div>
  )
}
