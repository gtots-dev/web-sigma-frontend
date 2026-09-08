'use client'

import { useEffect } from 'react'

interface UseInfractionsKeyboardNavigationProps {
  enabled?: boolean
  onNavigatePrevious: () => void
  onNavigateNext: () => void
}

export function useInfractionsKeyboardNavigation({
  enabled = true,
  onNavigatePrevious,
  onNavigateNext
}: UseInfractionsKeyboardNavigationProps) {
  useEffect(() => {
    if (!enabled) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        onNavigatePrevious()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        onNavigateNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [enabled, onNavigatePrevious, onNavigateNext])
}
