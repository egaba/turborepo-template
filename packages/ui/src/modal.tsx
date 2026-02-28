import type { ReactNode } from 'react'

type ModalProps = Readonly<{
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  actions?: ReactNode
  className?: string
}>

export function Modal({
  open,
  onClose,
  title,
  children,
  actions,
  className = '',
}: ModalProps) {
  return (
    <dialog className={`modal ${open ? 'modal-open' : ''}`}>
      <div className={`modal-box ${className}`.trim()}>
        {title && <h3 className="text-lg font-bold">{title}</h3>}
        <div className="py-4">{children}</div>
        {actions && <div className="modal-action">{actions}</div>}
      </div>
      <form method="dialog" className="modal-backdrop">
        <button type="button" onClick={onClose}>
          close
        </button>
      </form>
    </dialog>
  )
}
