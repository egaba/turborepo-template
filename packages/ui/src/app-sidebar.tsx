'use client'

import type { ReactNode } from 'react'
import { useState } from 'react'

type NavItem = Readonly<{
  label: string
  href: string
  icon?: ReactNode
  active?: boolean
}>

type NavSection = Readonly<{
  label: string
  items: NavItem[]
}>

type AppSidebarProps = Readonly<{
  sections: NavSection[]
  logo?: ReactNode
  currentPath?: string
  footer?: ReactNode
  className?: string
}>

export function AppSidebar({
  sections,
  logo,
  currentPath,
  footer,
  className = '',
}: AppSidebarProps) {
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set())

  function toggleSection(label: string) {
    setCollapsedSections((prev) => {
      const next = new Set(prev)
      if (next.has(label)) {
        next.delete(label)
      } else {
        next.add(label)
      }
      return next
    })
  }

  return (
    <aside
      className={`bg-base-200 text-base-content flex h-full w-64 flex-col ${className}`.trim()}
    >
      {logo && (
        <div className="border-base-300 flex h-16 items-center gap-2 border-b px-4">{logo}</div>
      )}

      <nav className="flex-1 overflow-y-auto px-2 py-4">
        {sections.map((section) => {
          const isCollapsed = collapsedSections.has(section.label)

          return (
            <div key={section.label} className="mb-4">
              <button
                type="button"
                onClick={() => toggleSection(section.label)}
                className="text-base-content/50 hover:text-base-content/70 flex w-full items-center justify-between px-2 py-1 text-xs font-semibold uppercase tracking-wider"
              >
                {section.label}
                <svg
                  className={`h-3 w-3 transition-transform ${isCollapsed ? '' : 'rotate-180'}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {!isCollapsed && (
                <ul className="mt-1 space-y-0.5">
                  {section.items.map((item) => {
                    const isActive = item.active ?? currentPath === item.href

                    return (
                      <li key={item.href}>
                        <a
                          href={item.href}
                          className={`transition-smooth-fast flex items-center gap-3 rounded-lg px-3 py-2 text-sm ${
                            isActive
                              ? 'bg-accent/10 text-accent font-medium'
                              : 'text-base-content/70 hover:bg-base-300 hover:text-base-content'
                          }`}
                        >
                          {item.icon && (
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                              {item.icon}
                            </span>
                          )}
                          {item.label}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          )
        })}
      </nav>

      {footer && <div className="border-base-300 border-t p-4">{footer}</div>}
    </aside>
  )
}
