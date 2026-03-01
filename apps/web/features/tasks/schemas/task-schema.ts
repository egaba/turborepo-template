import { z } from 'zod'

export const TASK_STATUSES = ['todo', 'in_progress', 'done'] as const

export const TASK_PRIORITIES = ['low', 'medium', 'high'] as const

export const taskSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1, 'Title is required').max(100, 'Title must be 100 characters or fewer'),
  status: z.enum(TASK_STATUSES),
  priority: z.enum(TASK_PRIORITIES),
  dueDate: z.string().datetime().optional(),
  description: z.string().max(500, 'Description must be 500 characters or fewer').optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})

export const createTaskSchema = taskSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export const updateTaskSchema = createTaskSchema.partial()
