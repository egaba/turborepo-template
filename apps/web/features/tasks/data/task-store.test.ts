import { taskStore } from './task-store'

describe('taskStore', () => {
  beforeEach(() => {
    taskStore.reset()
  })

  describe('getAll', () => {
    it('returns all seeded tasks', () => {
      const tasks = taskStore.getAll()
      expect(tasks).toHaveLength(5)
    })

    it('returns a copy, not a reference', () => {
      const a = taskStore.getAll()
      const b = taskStore.getAll()
      expect(a).not.toBe(b)
      expect(a).toEqual(b)
    })
  })

  describe('getById', () => {
    it('returns a task by id', () => {
      const task = taskStore.getById('550e8400-e29b-41d4-a716-446655440001')
      expect(task).toBeDefined()
      expect(task?.title).toBe('Set up CI/CD pipeline')
    })

    it('returns undefined for unknown id', () => {
      expect(taskStore.getById('nonexistent')).toBeUndefined()
    })
  })

  describe('create', () => {
    it('creates a task with generated id and timestamps', () => {
      const task = taskStore.create({
        title: 'New task',
        status: 'todo',
        priority: 'low',
      })

      expect(task.id).toBeDefined()
      expect(task.title).toBe('New task')
      expect(task.createdAt).toBeDefined()
      expect(task.updatedAt).toBeDefined()
      expect(taskStore.getAll()).toHaveLength(6)
    })
  })

  describe('update', () => {
    it('updates a task and sets updatedAt', () => {
      const original = taskStore.getById('550e8400-e29b-41d4-a716-446655440001')
      const updated = taskStore.update('550e8400-e29b-41d4-a716-446655440001', {
        title: 'Updated title',
      })

      expect(updated).not.toBeNull()
      expect(updated?.title).toBe('Updated title')
      expect(updated?.updatedAt).not.toBe(original?.updatedAt)
    })

    it('returns null for unknown id', () => {
      expect(taskStore.update('nonexistent', { title: 'x' })).toBeNull()
    })
  })

  describe('delete', () => {
    it('removes a task and returns true', () => {
      const result = taskStore.delete('550e8400-e29b-41d4-a716-446655440001')
      expect(result).toBe(true)
      expect(taskStore.getAll()).toHaveLength(4)
      expect(taskStore.getById('550e8400-e29b-41d4-a716-446655440001')).toBeUndefined()
    })

    it('returns false for unknown id', () => {
      expect(taskStore.delete('nonexistent')).toBe(false)
      expect(taskStore.getAll()).toHaveLength(5)
    })
  })

  describe('reset', () => {
    it('restores seed data after modifications', () => {
      taskStore.delete('550e8400-e29b-41d4-a716-446655440001')
      taskStore.create({ title: 'Extra', status: 'todo', priority: 'low' })
      expect(taskStore.getAll()).toHaveLength(5)

      taskStore.reset()
      expect(taskStore.getAll()).toHaveLength(5)
      expect(taskStore.getById('550e8400-e29b-41d4-a716-446655440001')).toBeDefined()
    })
  })
})
