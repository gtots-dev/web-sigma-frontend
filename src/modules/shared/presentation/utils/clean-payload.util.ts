export function cleanPayload<T>(obj: T): T | undefined {
  if (obj === null || obj === undefined) return undefined

  if (typeof obj === 'string' && obj.trim() === '') return undefined

  if (Array.isArray(obj)) {
    const cleaned = obj
      .map((item) => cleanPayload(item))
      .filter((v): v is NonNullable<typeof v> => v !== undefined)
    return cleaned.length > 0 ? (cleaned as unknown as T) : undefined
  }

  if (typeof obj === 'object' && obj !== null) {
    const proto = Object.getPrototypeOf(obj)
    const isPlainObject = proto === null || proto === Object.prototype

    if (!isPlainObject) return obj

    const cleaned: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
      const val = cleanPayload(value)
      if (val !== undefined) {
        cleaned[key] = val
      }
    }
    return Object.keys(cleaned).length > 0
      ? (cleaned as unknown as T)
      : undefined
  }

  return obj
}
