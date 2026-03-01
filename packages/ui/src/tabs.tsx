'use client'

import type { ReactNode } from 'react'
import { useState } from 'react'

type TabVariant = 'default' | 'underline'

type Tab = Readonly<{
  label: string
  count?: number
  content: ReactNode
}>

type TabsProps = Readonly<{
  tabs: Tab[]
  defaultIndex?: number
  variant?: TabVariant
  className?: string
}>

const variantClass: Record<TabVariant, string> = {
  default: 'tabs-bordered',
  underline: 'border-b border-base-300',
}

export function Tabs({
  tabs,
  defaultIndex = 0,
  variant = 'default',
  className = '',
}: TabsProps) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex)

  const isUnderline = variant === 'underline'

  return (
    <div className={className}>
      <div
        className={`tabs ${variantClass[variant]}`}
        role="tablist"
      >
        {tabs.map((tab, index) => {
          const isActive = index === activeIndex

          return (
            <button
              key={tab.label}
              role="tab"
              className={
                isUnderline
                  ? `tab ${isActive ? 'border-b-2 border-accent text-accent font-medium' : 'text-base-content/60 hover:text-base-content'}`
                  : `tab ${isActive ? 'tab-active' : ''}`
              }
              onClick={() => setActiveIndex(index)}
            >
              {tab.label}
              {tab.count != null && (
                <span
                  className={`ml-1.5 rounded-full px-1.5 py-0.5 text-xs ${
                    isActive
                      ? 'bg-accent/15 text-accent'
                      : 'bg-base-300 text-base-content/50'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          )
        })}
      </div>
      <div className="mt-4">{tabs[activeIndex]?.content}</div>
    </div>
  )
}
