import { http, HttpResponse } from 'msw'

import { createTaskSchema, updateTaskSchema } from '@/features/tasks/schemas/task-schema'
import type { Task } from '@/features/tasks/types'

let mockTasks: Task[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    title: 'Set up CI/CD pipeline',
    status: 'in_progress',
    priority: 'high',
    dueDate: '2026-03-04T17:00:00.000Z',
    description: 'Configure GitHub Actions for automated testing',
    createdAt: '2026-02-20T00:00:00.000Z',
    updatedAt: '2026-02-20T00:00:00.000Z',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    title: 'Write API documentation',
    status: 'todo',
    priority: 'medium',
    description: 'Document all REST endpoints',
    createdAt: '2026-02-22T00:00:00.000Z',
    updatedAt: '2026-02-22T00:00:00.000Z',
  },
]

export function resetMockTasks() {
  mockTasks = [
    {
      id: '550e8400-e29b-41d4-a716-446655440001',
      title: 'Set up CI/CD pipeline',
      status: 'in_progress',
      priority: 'high',
      dueDate: '2026-03-04T17:00:00.000Z',
      description: 'Configure GitHub Actions for automated testing',
      createdAt: '2026-02-20T00:00:00.000Z',
      updatedAt: '2026-02-20T00:00:00.000Z',
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440002',
      title: 'Write API documentation',
      status: 'todo',
      priority: 'medium',
      description: 'Document all REST endpoints',
      createdAt: '2026-02-22T00:00:00.000Z',
      updatedAt: '2026-02-22T00:00:00.000Z',
    },
  ]
}

export const handlers = [
  http.get('/api/tasks', () => {
    return HttpResponse.json({ data: mockTasks, status: 'success' })
  }),

  http.get('/api/tasks/:id', ({ params }) => {
    const task = mockTasks.find((t) => t.id === params['id'])
    if (!task) {
      return HttpResponse.json({ error: 'Task not found', code: 'NOT_FOUND' }, { status: 404 })
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
    mockTasks.push(newTask)
    return HttpResponse.json({ data: newTask, status: 'success' }, { status: 201 })
  }),

  http.patch('/api/tasks/:id', async ({ params, request }) => {
    const index = mockTasks.findIndex((t) => t.id === params['id'])
    if (index === -1) {
      return HttpResponse.json({ error: 'Task not found', code: 'NOT_FOUND' }, { status: 404 })
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

    const existing = mockTasks[index]!
    const definedUpdates = Object.fromEntries(
      Object.entries(parsed.data).filter(([, v]) => v !== undefined),
    )
    const updated: Task = {
      ...existing,
      ...definedUpdates,
      updatedAt: new Date().toISOString(),
    } as Task
    mockTasks[index] = updated
    return HttpResponse.json({ data: updated, status: 'success' })
  }),

  http.delete('/api/tasks/:id', ({ params }) => {
    const index = mockTasks.findIndex((t) => t.id === params['id'])
    if (index === -1) {
      return HttpResponse.json({ error: 'Task not found', code: 'NOT_FOUND' }, { status: 404 })
    }
    mockTasks.splice(index, 1)
    return HttpResponse.json({ data: null, status: 'success' })
  }),

  http.get('/api/health', () => {
    return HttpResponse.json({ status: 'healthy', timestamp: new Date().toISOString() })
  }),
]
