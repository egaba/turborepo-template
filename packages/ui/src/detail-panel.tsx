'use client'

import type { ReactNode } from 'react'

type DetailPanelProps = Readonly<{
  title: string
  open: boolean
  onClose: () => void
  tabs?: ReactNode
  children: ReactNode
  className?: string
}>

export function DetailPanel({
  title,
  open,
  onClose,
  tabs,
  children,
  className = '',
}: DetailPanelProps) {
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-40 bg-black/30" onClick={onClose} aria-hidden="true" />
      )}

      <div
        className={`bg-base-100 fixed right-0 top-0 z-50 flex h-full w-full max-w-lg flex-col shadow-xl transition-transform duration-300 ease-[var(--ease-expo-out)] ${
          open ? 'translate-x-0' : 'translate-x-full'
        } ${className}`.trim()}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="border-base-300 flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-base-content text-lg font-semibold">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="btn btn-ghost btn-sm btn-circle"
            aria-label="Close panel"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {tabs && <div className="border-base-300 border-b px-6">{tabs}</div>}

        <div className="flex-1 overflow-y-auto px-6 py-4">{children}</div>
      </div>
    </>
  )
}
