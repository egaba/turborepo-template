'use client'

import type { ReactNode } from 'react'
import { useState } from 'react'

type Tab = Readonly<{
  label: string
  content: ReactNode
}>

type TabsProps = Readonly<{
  tabs: Tab[]
  defaultIndex?: number
  className?: string
}>

export function Tabs({ tabs, defaultIndex = 0, className = '' }: TabsProps) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex)

  return (
    <div className={className}>
      <div className="tabs tabs-bordered" role="tablist">
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            role="tab"
            className={`tab ${index === activeIndex ? 'tab-active' : ''}`}
            onClick={() => setActiveIndex(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4">{tabs[activeIndex]?.content}</div>
    </div>
  )
}
