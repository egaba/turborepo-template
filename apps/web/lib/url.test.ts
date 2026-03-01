import { buildSearchParams, mergeSearchParams } from './url'

describe('buildSearchParams', () => {
  it('builds params from an object', () => {
    const sp = buildSearchParams({ page: 1, q: 'hello' })
    expect(sp.get('page')).toBe('1')
    expect(sp.get('q')).toBe('hello')
  })

  it('omits undefined values', () => {
    const sp = buildSearchParams({ page: 1, q: undefined })
    expect(sp.has('page')).toBe(true)
    expect(sp.has('q')).toBe(false)
  })

  it('converts booleans to strings', () => {
    const sp = buildSearchParams({ active: true })
    expect(sp.get('active')).toBe('true')
  })
})

describe('mergeSearchParams', () => {
  it('adds new params to existing ones', () => {
    const base = new URLSearchParams('page=1')
    const merged = mergeSearchParams(base, { q: 'test' })
    expect(merged.get('page')).toBe('1')
    expect(merged.get('q')).toBe('test')
  })

  it('overrides existing params', () => {
    const base = new URLSearchParams('page=1')
    const merged = mergeSearchParams(base, { page: '2' })
    expect(merged.get('page')).toBe('2')
  })

  it('deletes params set to undefined', () => {
    const base = new URLSearchParams('page=1&q=test')
    const merged = mergeSearchParams(base, { q: undefined })
    expect(merged.has('q')).toBe(false)
    expect(merged.get('page')).toBe('1')
  })
})
