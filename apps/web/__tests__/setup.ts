import '@testing-library/jest-dom'

import { resetMockTasks } from './mocks/handlers'
import { server } from './mocks/server'

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' })
})

afterEach(() => {
  server.resetHandlers()
  resetMockTasks()
})

afterAll(() => {
  server.close()
})
