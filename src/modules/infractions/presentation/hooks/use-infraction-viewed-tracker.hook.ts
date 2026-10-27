'use client'

import { useState } from 'react'
import type { LiveInfractionCapture } from '../../domain/interfaces/infractions-websocket.interface'

export function useInfractionViewedTracker(
  activeItem: LiveInfractionCapture | null
) {
  const [viewedIds, setViewedIds] = useState<Set<string | number>>(
    () => new Set()
  )

  const activeId = activeItem?.id
  if (activeId !== undefined && activeId !== null && !viewedIds.has(activeId)) {
    const next = new Set(viewedIds)
    next.add(activeId)
    setViewedIds(next)
  }

  return viewedIds
}
