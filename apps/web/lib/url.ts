export function buildSearchParams(
  params: Record<string, string | number | boolean | undefined>,
): URLSearchParams {
  const sp = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) {
      sp.set(key, String(value))
    }
  }
  return sp
}

export function mergeSearchParams(
  base: URLSearchParams,
  updates: Record<string, string | undefined>,
): URLSearchParams {
  const merged = new URLSearchParams(base)
  for (const [key, value] of Object.entries(updates)) {
    if (value === undefined) {
      merged.delete(key)
    } else {
      merged.set(key, value)
    }
  }
  return merged
}
