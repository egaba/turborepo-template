import { test, expect } from '@playwright/test'

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('renders the page title', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /my skills/i, level: 1 })).toBeVisible()
  })

  test('displays Getting Started and Components cards', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Getting Started' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Components' })).toBeVisible()
  })

  test('has a header with navigation', async ({ page }) => {
    await expect(page.getByRole('banner')).toBeVisible()
    await expect(page.getByRole('link', { name: /dashboard/i })).toBeVisible()
  })

  test('has a footer', async ({ page }) => {
    await expect(page.getByRole('contentinfo')).toBeVisible()
  })

  test('theme toggle switches data-theme attribute', async ({ page }) => {
    const html = page.locator('html')
    const initialTheme = await html.getAttribute('data-theme')
    expect(initialTheme).toBeTruthy()

    const themeToggle = page.getByLabel('Toggle theme')
    await themeToggle.check({ force: true })

    const newTheme = await html.getAttribute('data-theme')
    expect(newTheme).toBeTruthy()
    expect(newTheme).not.toBe(initialTheme)
  })
})
