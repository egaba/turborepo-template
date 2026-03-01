'use client'

import { Button } from '@repo/ui/button'

import { TASK_PRIORITIES, TASK_STATUSES } from '../schemas/task-schema'
import type { CreateTaskInput } from '../types'
import { useTaskForm } from '../hooks/use-task-form'

type TaskFormProps = Readonly<{
  onSubmit: (data: CreateTaskInput) => void
  isPending?: boolean
  defaultValues?: Partial<CreateTaskInput>
}>

const STATUS_LABELS: Record<string, string> = {
  todo: 'To Do',
  in_progress: 'In Progress',
  done: 'Done',
}

export function TaskForm({ onSubmit, isPending = false, defaultValues }: TaskFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useTaskForm(defaultValues)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="form-control">
        <label className="label" htmlFor="task-title">
          <span className="label-text">Title</span>
        </label>
        <input
          id="task-title"
          {...register('title')}
          className={`input input-bordered ${errors.title ? 'input-error' : ''}`}
          placeholder="e.g. Fix authentication bug"
        />
        {errors.title && (
          <span className="label-text-alt text-error mt-1">{errors.title.message}</span>
        )}
      </div>

      <div className="form-control">
        <label className="label" htmlFor="task-status">
          <span className="label-text">Status</span>
        </label>
        <select
          id="task-status"
          {...register('status')}
          className={`select select-bordered ${errors.status ? 'select-error' : ''}`}
        >
          {TASK_STATUSES.map((status) => (
            <option key={status} value={status}>
              {STATUS_LABELS[status] ?? status}
            </option>
          ))}
        </select>
        {errors.status && (
          <span className="label-text-alt text-error mt-1">{errors.status.message}</span>
        )}
      </div>

      <div className="form-control">
        <label className="label" htmlFor="task-priority">
          <span className="label-text">Priority</span>
        </label>
        <select
          id="task-priority"
          {...register('priority')}
          className={`select select-bordered ${errors.priority ? 'select-error' : ''}`}
        >
          {TASK_PRIORITIES.map((priority) => (
            <option key={priority} value={priority}>
              {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="form-control">
        <label className="label" htmlFor="task-due-date">
          <span className="label-text">Due Date (optional)</span>
        </label>
        <input
          id="task-due-date"
          type="datetime-local"
          {...register('dueDate')}
          className={`input input-bordered ${errors.dueDate ? 'input-error' : ''}`}
        />
        {errors.dueDate && (
          <span className="label-text-alt text-error mt-1">{errors.dueDate.message}</span>
        )}
      </div>

      <div className="form-control">
        <label className="label" htmlFor="task-description">
          <span className="label-text">Description (optional)</span>
        </label>
        <textarea
          id="task-description"
          {...register('description')}
          className={`textarea textarea-bordered ${errors.description ? 'textarea-error' : ''}`}
          rows={3}
          placeholder="Brief description of this task..."
        />
        {errors.description && (
          <span className="label-text-alt text-error mt-1">{errors.description.message}</span>
        )}
      </div>

      <Button variant="primary" disabled={isPending}>
        {isPending ? 'Saving...' : 'Save Task'}
      </Button>
    </form>
  )
}
