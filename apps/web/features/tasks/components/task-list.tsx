'use client'

import type { Task } from '../types'

import { TaskCard } from './task-card'

type TaskListProps = Readonly<{
  tasks: Task[]
  onDelete?: (id: string) => void
}>

export function TaskList({ tasks, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="py-12 text-center text-base-content/50">
        <p className="text-lg">No tasks yet</p>
        <p className="text-sm">Add your first task to get started.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} {...(onDelete ? { onDelete } : {})} />
      ))}
    </div>
  )
}
