import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test('navigates from home to dashboard via header link', async ({ page }) => {
    await page.goto('/')
    await page
      .getByRole('link', { name: /dashboard/i })
      .first()
      .click()
    await expect(page).toHaveURL('/dashboard')
    await expect(page.getByRole('heading', { name: /dashboard/i })).toBeVisible()
  })

  test('navigates from dashboard to home via logo', async ({ page }) => {
    await page.goto('/dashboard')
    await page
      .locator('aside')
      .getByRole('link', { name: /project/i })
      .click()
    await expect(page).toHaveURL('/')
  })

  test('marketing layout has header and footer but no sidebar', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('banner')).toBeVisible()
    await expect(page.getByRole('contentinfo')).toBeVisible()
    await expect(page.locator('aside')).not.toBeVisible()
  })

  test('app layout has sidebar but no footer', async ({ page }) => {
    await page.goto('/dashboard')
    await expect(page.locator('aside')).toBeVisible()
    await expect(page.getByRole('contentinfo')).not.toBeVisible()
  })

  test('404 page renders for unknown routes', async ({ page }) => {
    await page.goto('/nonexistent-page')
    await expect(page.getByText('404')).toBeVisible()
    await expect(page.getByRole('link', { name: /go home/i })).toBeVisible()
  })
})
