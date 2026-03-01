import type { z } from 'zod'

import type { createTaskSchema, taskSchema, updateTaskSchema } from '../schemas/task-schema'

export type Task = z.infer<typeof taskSchema>

export type CreateTaskInput = z.infer<typeof createTaskSchema>

export type UpdateTaskInput = z.infer<typeof updateTaskSchema>

export type TaskStatus = 'todo' | 'in_progress' | 'done'

export type TaskPriority = 'low' | 'medium' | 'high'
