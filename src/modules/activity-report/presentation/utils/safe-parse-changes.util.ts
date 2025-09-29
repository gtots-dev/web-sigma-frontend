interface ChangesInterface {
  de: string
  para: string
}

export function safeParseChanges(
  value: unknown
): Record<string, ChangesInterface> | null {
  if (!value) return null
  try {
    if (typeof value === 'string') {
      return JSON.parse(value) as Record<string, ChangesInterface>
    }
    if (typeof value === 'object') {
      return value as Record<string, ChangesInterface>
    }
    return null
  } catch {
    return null
  }
}
