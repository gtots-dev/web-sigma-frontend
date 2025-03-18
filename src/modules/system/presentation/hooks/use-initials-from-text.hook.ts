export function useInitialsFromText() {
  function getInitials(name: string): string {
    const words = name.trim().split(/\s+/)
    return words.length === 1
      ? words[0].slice(0, 2).toUpperCase()
      : words
          .slice(0, 2)
          .map((word) => word[0].toUpperCase())
          .join('')
  }

  return { getInitials }
}
