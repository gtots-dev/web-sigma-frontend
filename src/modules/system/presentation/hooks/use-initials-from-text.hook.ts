export function useInitialsFromText() {
  function getInitials(name?: string | null): string {
    if (!name || typeof name !== 'string') return ''

    const words = name.trim().split(/\s+/)
    return words.length === 1
      ? words[0].slice(0, 2).toUpperCase()
      : words[0][0].toUpperCase() + words[1][0].toUpperCase()
  }

  return { getInitials }
}
