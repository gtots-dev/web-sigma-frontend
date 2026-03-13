export function removeEmptyFilters<T>(obj: T): Partial<T> {
  if (obj === null || obj === undefined) return obj as Partial<T>

  if (Array.isArray(obj)) {
    const cleanedArray = obj
      .map((v) => removeEmptyFilters(v))
      .filter((v) => v !== undefined && v !== null)

    if (cleanedArray.length === 0) return undefined as unknown as Partial<T>

    return cleanedArray as unknown as Partial<T>
  }

  if (typeof obj === 'object') {
    const cleaned = Object.entries(obj as Record<string, unknown>).reduce(
      (acc, [key, value]) => {
        const cleanedValue = removeEmptyFilters(value)

        const isEmptyString =
          typeof cleanedValue === 'string' && cleanedValue.trim() === ''

        const isEmptyArray =
          Array.isArray(cleanedValue) && cleanedValue.length === 0

        const isEmptyObject =
          typeof cleanedValue === 'object' &&
          cleanedValue !== null &&
          !Array.isArray(cleanedValue) &&
          Object.keys(cleanedValue).length === 0

        if (
          cleanedValue !== undefined &&
          cleanedValue !== null &&
          !isEmptyString &&
          !isEmptyArray &&
          !isEmptyObject
        ) {
          acc[key] = cleanedValue
        }

        return acc
      },
      {} as Record<string, unknown>
    )

    if (Object.keys(cleaned).length === 0)
      return undefined as unknown as Partial<T>

    return cleaned as Partial<T>
  }

  return obj
}
