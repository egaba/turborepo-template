import { test, expect } from '@playwright/test'

test.describe('Dashboard Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard')
  })

  test('renders the dashboard heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /dashboard/i, level: 1 })).toBeVisible()
  })

  test('displays stat cards', async ({ page }) => {
    await expect(page.getByText('Total Tasks')).toBeVisible()
    await expect(page.getByText('In Progress')).toBeVisible()
    await expect(page.getByText('Completed')).toBeVisible()
  })

  test('has sidebar navigation', async ({ page }) => {
    const sidebar = page.locator('aside')
    await expect(sidebar).toBeVisible()
    await expect(sidebar.getByRole('link', { name: /dashboard/i })).toBeVisible()
  })

  test('sidebar dashboard link is active', async ({ page }) => {
    const dashboardLink = page.locator('aside').getByRole('link', { name: /dashboard/i })
    await expect(dashboardLink).toHaveClass(/text-accent/)
  })
})
