import type { Task } from '@/features/tasks/types'

export const SEED_TASKS: readonly Task[] = [
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
] as const

export function createSeedTasks(): Task[] {
  return SEED_TASKS.map((task) => ({ ...task }))
}
