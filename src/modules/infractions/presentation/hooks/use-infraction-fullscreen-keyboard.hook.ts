'use client'

import { useEffect } from 'react'

interface UseInfractionFullscreenKeyboardProps {
  enabled: boolean
  onClose: () => void
  hasPrevious?: boolean
  hasNext?: boolean
  onPrevious?: () => void
  onNext?: () => void
}

export function useInfractionFullscreenKeyboard({
  enabled,
  onClose,
  hasPrevious = false,
  hasNext = false,
  onPrevious,
  onNext
}: UseInfractionFullscreenKeyboardProps) {
  useEffect(() => {
    if (!enabled) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowLeft' && hasPrevious && onPrevious) {
        onPrevious()
      } else if (e.key === 'ArrowRight' && hasNext && onNext) {
        onNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [enabled, onClose, hasPrevious, hasNext, onPrevious, onNext])
}
