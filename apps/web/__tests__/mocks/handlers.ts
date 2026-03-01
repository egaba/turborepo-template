import type { Task } from '@/features/tasks/types'
import { createSeedTasks } from '@/mocks/data'
import { createHandlers } from '@/mocks/handlers'

let mockTasks: Task[] = createSeedTasks()

export function resetMockTasks() {
  mockTasks = createSeedTasks()
}

export const handlers = createHandlers({
  getTasks: () => mockTasks,
  setTasks: (tasks) => {
    mockTasks = tasks
  },
})
