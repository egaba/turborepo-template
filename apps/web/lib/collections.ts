export function groupBy<T>(items: T[], key: keyof T): Record<string, T[]> {
  return items.reduce<Record<string, T[]>>((acc, item) => {
    const group = String(item[key])
    ;(acc[group] ??= []).push(item)
    return acc
  }, {})
}

export function uniqueBy<T>(items: T[], key: keyof T): T[] {
  const seen = new Set<unknown>()
  return items.filter((item) => {
    const value = item[key]
    if (seen.has(value)) return false
    seen.add(value)
    return true
  })
}

export function sortBy<T>(items: T[], key: keyof T, direction: 'asc' | 'desc' = 'asc'): T[] {
  const multiplier = direction === 'asc' ? 1 : -1
  return [...items].sort((a, b) => {
    const aVal = a[key]
    const bVal = b[key]
    if (aVal < bVal) return -1 * multiplier
    if (aVal > bVal) return 1 * multiplier
    return 0
  })
}
