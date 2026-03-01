'use client'

import { Badge } from '@repo/ui/badge'
import { Card } from '@repo/ui/card'

import type { Task, TaskPriority, TaskStatus } from '../types'

type TaskCardProps = Readonly<{
  task: Task
  onDelete?: (id: string) => void
}>

const statusVariant: Record<TaskStatus, string> = {
  todo: 'badge-info',
  in_progress: 'badge-warning',
  done: 'badge-success',
}

const statusLabel: Record<TaskStatus, string> = {
  todo: 'To Do',
  in_progress: 'In Progress',
  done: 'Done',
}

const priorityVariant: Record<TaskPriority, string> = {
  low: 'badge-ghost',
  medium: 'badge-secondary',
  high: 'badge-primary',
}

export function TaskCard({ task, onDelete }: TaskCardProps) {
  return (
    <Card title={task.title}>
      <div className="flex flex-wrap items-center gap-2">
        <Badge className={statusVariant[task.status]}>{statusLabel[task.status]}</Badge>
        <Badge className={priorityVariant[task.priority]}>{task.priority}</Badge>
      </div>
      {task.description && (
        <p className="mt-2 text-sm text-base-content/70">{task.description}</p>
      )}
      {task.dueDate && (
        <p className="mt-1 text-xs text-base-content/50">
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </p>
      )}
      {onDelete && (
        <div className="card-actions mt-4 justify-end">
          <button
            type="button"
            className="btn btn-ghost btn-sm text-error"
            onClick={() => onDelete(task.id)}
          >
            Delete
          </button>
        </div>
      )}
    </Card>
  )
}
