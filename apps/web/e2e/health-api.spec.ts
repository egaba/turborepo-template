import { test, expect } from '@playwright/test'

test.describe('Health API', () => {
  test('GET /api/health returns healthy status', async ({ request }) => {
    const response = await request.get('/api/health')
    expect(response.ok()).toBe(true)

    const body = await response.json()
    expect(body.status).toBe('healthy')
    expect(body.timestamp).toBeTruthy()
    expect(typeof body.uptime).toBe('number')
  })
})
