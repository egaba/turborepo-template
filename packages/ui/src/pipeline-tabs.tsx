'use client'

import type { ReactNode } from 'react'

type PipelineStage = Readonly<{
  label: string
  count: number
  icon?: ReactNode
}>

type PipelineTabsProps = Readonly<{
  stages: PipelineStage[]
  activeIndex: number
  onStageClick: (index: number) => void
  className?: string
}>

export function PipelineTabs({
  stages,
  activeIndex,
  onStageClick,
  className = '',
}: PipelineTabsProps) {
  return (
    <div className={`flex items-stretch overflow-x-auto ${className}`.trim()} role="tablist">
      {stages.map((stage, index) => {
        const isActive = index === activeIndex

        return (
          <div key={stage.label} className="flex items-stretch">
            <button
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onStageClick(index)}
              className={`transition-smooth-fast flex items-center gap-2 px-4 py-3 text-sm ${
                isActive
                  ? 'border-accent text-accent border-b-2 font-medium'
                  : 'text-base-content/60 hover:text-base-content border-b-2 border-transparent'
              }`}
            >
              {stage.icon && (
                <span className="flex h-4 w-4 shrink-0 items-center justify-center">
                  {stage.icon}
                </span>
              )}
              <span>{stage.label}</span>
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                  isActive ? 'bg-accent/15 text-accent' : 'bg-base-300 text-base-content/50'
                }`}
              >
                {stage.count}
              </span>
            </button>

            {index < stages.length - 1 && (
              <div className="text-base-content/20 flex items-center px-1">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
