'use client'

import { useState, useEffect } from 'react'
import type { LiveInfractionCapture } from '../../domain/interfaces/infractions-websocket.interface'

export function useInfractionViewedTracker(
  activeItem: LiveInfractionCapture | null
) {
  const [viewedIds, setViewedIds] = useState<Set<string | number>>(new Set())

  useEffect(() => {
    if (activeItem?.id !== undefined && activeItem?.id !== null) {
      setViewedIds((prev) => {
        if (prev.has(activeItem.id)) return prev
        const next = new Set(prev)
        next.add(activeItem.id)
        return next
      })
    }
  }, [activeItem])

  return viewedIds
}
