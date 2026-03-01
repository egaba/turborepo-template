import { createTaskSchema, taskSchema, updateTaskSchema } from './task-schema'

describe('taskSchema', () => {
  const validTask = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    title: 'Set up CI/CD pipeline',
    status: 'in_progress',
    priority: 'high',
    createdAt: '2026-02-20T10:00:00.000Z',
    updatedAt: '2026-02-20T10:00:00.000Z',
  }

  it('validates a complete task object', () => {
    expect(taskSchema.safeParse(validTask).success).toBe(true)
  })

  it('accepts optional description', () => {
    const result = taskSchema.safeParse({ ...validTask, description: 'Configure GitHub Actions' })
    expect(result.success).toBe(true)
  })

  it('accepts optional dueDate', () => {
    const result = taskSchema.safeParse({ ...validTask, dueDate: '2026-03-05T17:00:00.000Z' })
    expect(result.success).toBe(true)
  })

  it('rejects invalid UUID', () => {
    const result = taskSchema.safeParse({ ...validTask, id: 'not-a-uuid' })
    expect(result.success).toBe(false)
  })

  it('rejects invalid status', () => {
    const result = taskSchema.safeParse({ ...validTask, status: 'cancelled' })
    expect(result.success).toBe(false)
  })

  it('rejects invalid priority', () => {
    const result = taskSchema.safeParse({ ...validTask, priority: 'urgent' })
    expect(result.success).toBe(false)
  })

  it('rejects empty title', () => {
    const result = taskSchema.safeParse({ ...validTask, title: '' })
    expect(result.success).toBe(false)
  })
})

describe('createTaskSchema', () => {
  it('validates without id and timestamps', () => {
    const result = createTaskSchema.safeParse({
      title: 'Write tests',
      status: 'todo',
      priority: 'medium',
    })
    expect(result.success).toBe(true)
  })

  it('rejects missing required fields', () => {
    const result = createTaskSchema.safeParse({ title: 'Write tests' })
    expect(result.success).toBe(false)
  })
})

describe('updateTaskSchema', () => {
  it('allows partial updates', () => {
    const result = updateTaskSchema.safeParse({ title: 'Updated Title' })
    expect(result.success).toBe(true)
  })

  it('allows empty object', () => {
    const result = updateTaskSchema.safeParse({})
    expect(result.success).toBe(true)
  })
})
