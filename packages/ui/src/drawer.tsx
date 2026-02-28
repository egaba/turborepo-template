import type { ReactNode } from 'react'

type DrawerSide = 'left' | 'right'

type DrawerProps = Readonly<{
  open: boolean
  onClose: () => void
  side?: DrawerSide
  children: ReactNode
  className?: string
}>

export function Drawer({
  open,
  onClose,
  side = 'left',
  children,
  className = '',
}: DrawerProps) {
  const isRight = side === 'right'

  return (
    <div className={`drawer ${isRight ? 'drawer-end' : ''} ${open ? 'drawer-open' : ''}`}>
      <input
        type="checkbox"
        className="drawer-toggle"
        checked={open}
        readOnly
      />
      <div className="drawer-side z-50">
        <label
          className="drawer-overlay"
          onClick={onClose}
          aria-label="Close drawer"
        />
        <div
          className={`menu bg-base-200 text-base-content min-h-full w-80 p-4 ${className}`.trim()}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
