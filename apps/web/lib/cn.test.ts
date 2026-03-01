import { cn } from './cn'

describe('cn', () => {
  it('merges class names', () => {
    expect(cn('btn', 'btn-primary')).toBe('btn btn-primary')
  })

  it('handles conditional classes', () => {
    const isDisabled = false
    expect(cn('btn', isDisabled && 'btn-disabled', 'btn-lg')).toBe('btn btn-lg')
  })

  it('resolves Tailwind conflicts (last wins)', () => {
    expect(cn('p-4', 'p-8')).toBe('p-8')
  })

  it('handles undefined and null inputs', () => {
    expect(cn('btn', undefined, null, 'btn-sm')).toBe('btn btn-sm')
  })

  it('returns empty string for no inputs', () => {
    expect(cn()).toBe('')
  })
})
