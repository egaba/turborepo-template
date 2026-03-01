import type { ReactNode } from 'react'

import { SidebarContent } from '@/components/layouts/app-sidebar'

const DRAWER_ID = 'app-drawer'

export default function AppLayout({ children }: { children: ReactNode }) {
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
        <aside className="flex min-h-full w-64 flex-col border-r border-base-300/40 bg-base-100">
          <SidebarContent />
        </aside>
      </div>
    </div>
  )
}
