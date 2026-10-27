'use client'

import { useEffect, useState } from 'react'

export function useMediaQuery(query: string): boolean | undefined {
  const [matches, setMatches] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)

    const handleChange = () => setMatches(mediaQuery.matches)
    queueMicrotask(handleChange)

    mediaQuery.addEventListener('change', handleChange)

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [query])

  return matches
}
