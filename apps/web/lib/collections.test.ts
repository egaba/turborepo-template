import { groupBy, uniqueBy, sortBy } from './collections'

describe('groupBy', () => {
  it('groups items by a string key', () => {
    const items = [
      { name: 'Alice', role: 'dev' },
      { name: 'Bob', role: 'design' },
      { name: 'Charlie', role: 'dev' },
    ]
    const result = groupBy(items, 'role')
    expect(result).toEqual({
      dev: [
        { name: 'Alice', role: 'dev' },
        { name: 'Charlie', role: 'dev' },
      ],
      design: [{ name: 'Bob', role: 'design' }],
    })
  })

  it('returns empty object for empty array', () => {
    expect(groupBy([], 'id' as never)).toEqual({})
  })
})

describe('uniqueBy', () => {
  it('removes duplicates by key', () => {
    const items = [
      { id: 1, name: 'a' },
      { id: 2, name: 'b' },
      { id: 1, name: 'c' },
    ]
    expect(uniqueBy(items, 'id')).toEqual([
      { id: 1, name: 'a' },
      { id: 2, name: 'b' },
    ])
  })

  it('returns empty array for empty input', () => {
    expect(uniqueBy([], 'id' as never)).toEqual([])
  })
})

describe('sortBy', () => {
  it('sorts ascending by default', () => {
    const items = [{ n: 3 }, { n: 1 }, { n: 2 }]
    expect(sortBy(items, 'n')).toEqual([{ n: 1 }, { n: 2 }, { n: 3 }])
  })

  it('sorts descending when specified', () => {
    const items = [{ n: 1 }, { n: 3 }, { n: 2 }]
    expect(sortBy(items, 'n', 'desc')).toEqual([{ n: 3 }, { n: 2 }, { n: 1 }])
  })

  it('does not mutate the original array', () => {
    const items = [{ n: 3 }, { n: 1 }]
    const sorted = sortBy(items, 'n')
    expect(items[0]!.n).toBe(3)
    expect(sorted[0]!.n).toBe(1)
  })
})
