import type { Task } from '../types'

const SEED_TASKS: Task[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    title: 'Set up CI/CD pipeline',
    status: 'in_progress',
    priority: 'high',
    dueDate: '2026-03-04T17:00:00.000Z',
    description: 'Configure GitHub Actions for automated testing and deployment',
    createdAt: '2026-02-20T10:00:00.000Z',
    updatedAt: '2026-02-28T14:30:00.000Z',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    title: 'Write API documentation',
    status: 'todo',
    priority: 'medium',
    dueDate: '2026-03-08T17:00:00.000Z',
    description: 'Document all REST endpoints with request/response examples',
    createdAt: '2026-02-22T09:00:00.000Z',
    updatedAt: '2026-02-22T09:00:00.000Z',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440003',
    title: 'Fix login page redirect bug',
    status: 'done',
    priority: 'high',
    description: 'Users are redirected to 404 after successful OAuth login',
    createdAt: '2026-02-18T11:00:00.000Z',
    updatedAt: '2026-02-25T16:45:00.000Z',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440004',
    title: 'Add dark mode support',
    status: 'todo',
    priority: 'low',
    dueDate: '2026-03-15T17:00:00.000Z',
    description: 'Implement theme toggle with system preference detection',
    createdAt: '2026-02-24T08:00:00.000Z',
    updatedAt: '2026-02-24T08:00:00.000Z',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440005',
    title: 'Review pull request #42',
    status: 'in_progress',
    priority: 'medium',
    dueDate: '2026-03-02T17:00:00.000Z',
    description: 'Code review for the new search feature implementation',
    createdAt: '2026-02-28T13:00:00.000Z',
    updatedAt: '2026-02-28T13:00:00.000Z',
  },
]

let tasks: Task[] = [...SEED_TASKS]

export const taskStore = {
  getAll(): Task[] {
    return [...tasks]
  },

  getById(id: string): Task | undefined {
    return tasks.find((t) => t.id === id)
  },

  create(input: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Task {
    const now = new Date().toISOString()
    const task: Task = {
      ...input,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    }
    tasks.push(task)
    return task
  },

  update(id: string, input: Partial<Omit<Task, 'id' | 'createdAt' | 'updatedAt'>>): Task | null {
    const index = tasks.findIndex((t) => t.id === id)
    if (index === -1) return null
    const existing = tasks[index]!
    const updated: Task = {
      ...existing,
      ...input,
      updatedAt: new Date().toISOString(),
    }
    tasks[index] = updated
    return updated
  },

  delete(id: string): boolean {
    const before = tasks.length
    tasks = tasks.filter((t) => t.id !== id)
    return tasks.length < before
  },

  reset(): void {
    tasks = [...SEED_TASKS]
  },
}
