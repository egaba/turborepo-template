import { formatDate, slugify, truncate } from './format'

describe('formatDate', () => {
  it('formats a Date object', () => {
    const result = formatDate(new Date('2025-03-15T00:00:00.000Z'))
    expect(result).toMatch(/Mar/)
    expect(result).toMatch(/2025/)
  })

  it('formats an ISO string', () => {
    const result = formatDate('2025-12-15T12:00:00.000Z')
    expect(result).toMatch(/Dec/)
    expect(result).toMatch(/2025/)
  })
})

describe('slugify', () => {
  it('converts text to URL-safe slug', () => {
    expect(slugify('Hello World')).toBe('hello-world')
  })

  it('strips special characters', () => {
    expect(slugify('React & Next.js!')).toBe('react-nextjs')
  })

  it('trims leading/trailing whitespace and hyphens', () => {
    expect(slugify('  hello  ')).toBe('hello')
  })

  it('returns empty string for empty input', () => {
    expect(slugify('')).toBe('')
  })

  it('replaces underscores with hyphens', () => {
    expect(slugify('hello_world')).toBe('hello-world')
  })
})

describe('truncate', () => {
  it('returns text unchanged when shorter than max', () => {
    expect(truncate('hello', 10)).toBe('hello')
  })

  it('returns text unchanged when exactly max length', () => {
    expect(truncate('hello', 5)).toBe('hello')
  })

  it('truncates and adds ellipsis when exceeding max', () => {
    expect(truncate('hello world', 5)).toBe('hello...')
  })

  it('handles empty string', () => {
    expect(truncate('', 5)).toBe('')
  })
})
