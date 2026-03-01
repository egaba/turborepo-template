import type { HttpHandler } from 'msw'
import { http, HttpResponse } from 'msw'

import { createTaskSchema, updateTaskSchema } from '@/features/tasks/schemas/task-schema'
import type { Task } from '@/features/tasks/types'

import { createSeedTasks } from './data'

type TaskState = {
  getTasks: () => Task[]
  setTasks: (tasks: Task[]) => void
}

export function createHandlers(state: TaskState): HttpHandler[] {
  return [
    http.get('/api/tasks', () => {
      return HttpResponse.json({ data: state.getTasks(), status: 'success' })
    }),

    http.get('/api/tasks/:id', ({ params }) => {
      const task = state.getTasks().find((t) => t.id === params['id'])
      if (!task) {
        return HttpResponse.json(
          { error: 'Task not found', code: 'NOT_FOUND' },
          { status: 404 },
        )
      }
      return HttpResponse.json({ data: task, status: 'success' })
    }),

    http.post('/api/tasks', async ({ request }) => {
      const body = await request.json()
      const parsed = createTaskSchema.safeParse(body)

      if (!parsed.success) {
        return HttpResponse.json(
          {
            error: 'Validation failed',
            code: 'VALIDATION_ERROR',
            details: parsed.error.flatten().fieldErrors,
          },
          { status: 400 },
        )
      }

      const now = new Date().toISOString()
      const { dueDate, description, ...required } = parsed.data
      const newTask: Task = {
        ...required,
        id: crypto.randomUUID(),
        ...(dueDate !== undefined ? { dueDate } : {}),
        ...(description !== undefined ? { description } : {}),
        createdAt: now,
        updatedAt: now,
      }
      state.setTasks([...state.getTasks(), newTask])
      return HttpResponse.json({ data: newTask, status: 'success' }, { status: 201 })
    }),

    http.patch('/api/tasks/:id', async ({ params, request }) => {
      const tasks = state.getTasks()
      const index = tasks.findIndex((t) => t.id === params['id'])
      if (index === -1) {
        return HttpResponse.json(
          { error: 'Task not found', code: 'NOT_FOUND' },
          { status: 404 },
        )
      }

      const body = await request.json()
      const parsed = updateTaskSchema.safeParse(body)

      if (!parsed.success) {
        return HttpResponse.json(
          {
            error: 'Validation failed',
            code: 'VALIDATION_ERROR',
            details: parsed.error.flatten().fieldErrors,
          },
          { status: 400 },
        )
      }

      const existing = tasks[index]!
      const definedUpdates = Object.fromEntries(
        Object.entries(parsed.data).filter(([, v]) => v !== undefined),
      )
      const updated: Task = {
        ...existing,
        ...definedUpdates,
        updatedAt: new Date().toISOString(),
      } as Task
      const newTasks = [...tasks]
      newTasks[index] = updated
      state.setTasks(newTasks)
      return HttpResponse.json({ data: updated, status: 'success' })
    }),

    http.delete('/api/tasks/:id', ({ params }) => {
      const tasks = state.getTasks()
      const index = tasks.findIndex((t) => t.id === params['id'])
      if (index === -1) {
        return HttpResponse.json(
          { error: 'Task not found', code: 'NOT_FOUND' },
          { status: 404 },
        )
      }
      state.setTasks(tasks.filter((_, i) => i !== index))
      return HttpResponse.json({ data: null, status: 'success' })
    }),

    http.get('/api/health', () => {
      return HttpResponse.json({ status: 'healthy', timestamp: new Date().toISOString() })
    }),
  ]
}

// Browser-ready handlers with closure-based state
let browserTasks: Task[] = createSeedTasks()

export const handlers = createHandlers({
  getTasks: () => browserTasks,
  setTasks: (tasks) => {
    browserTasks = tasks
  },
})
