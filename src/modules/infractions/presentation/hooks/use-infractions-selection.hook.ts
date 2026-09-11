'use client'

import { useState, useEffect, useCallback } from 'react'
import type { Infraction } from '../../domain/interfaces/infraction.interface'

export function useInfractionsSelection(
  infractions: Infraction[],
  initialSelectedId?: number | string | null
) {
  const [activeId, setActiveId] = useState<number | string | null>(
    initialSelectedId ?? null
  )

  const sortedInfractions = [...infractions].sort((a, b) => {
    const numA =
      typeof a.id === 'number' ? a.id : parseInt(String(a.id), 10) || 0
    const numB =
      typeof b.id === 'number' ? b.id : parseInt(String(b.id), 10) || 0
    return numB - numA
  })

  useEffect(() => {
    if (
      initialSelectedId !== undefined &&
      initialSelectedId !== null &&
      sortedInfractions.some(
        (inf) => String(inf.id) === String(initialSelectedId)
      )
    ) {
      setActiveId(initialSelectedId)
    }
  }, [initialSelectedId])

  useEffect(() => {
    if (sortedInfractions.length > 0) {
      if (
        activeId === null ||
        !sortedInfractions.some((inf) => String(inf.id) === String(activeId))
      ) {
        setActiveId(
          initialSelectedId &&
            sortedInfractions.some(
              (inf) => String(inf.id) === String(initialSelectedId)
            )
            ? initialSelectedId
            : sortedInfractions[0].id
        )
      }
    } else {
      setActiveId(null)
    }
  }, [sortedInfractions, activeId, initialSelectedId])

  const activeInfraction =
    sortedInfractions.find((inf) => String(inf.id) === String(activeId)) ??
    sortedInfractions[0] ??
    null

  const currentIndex = activeInfraction
    ? sortedInfractions.findIndex(
        (inf) => String(inf.id) === String(activeInfraction.id)
      )
    : -1

  const hasPrevious = currentIndex > 0
  const hasNext =
    currentIndex >= 0 && currentIndex < sortedInfractions.length - 1

  const handleSelect = useCallback((id: number | string) => {
    setActiveId(id)
  }, [])

  const handleNavigatePrevious = useCallback(() => {
    if (hasPrevious) {
      setActiveId(sortedInfractions[currentIndex - 1].id)
    }
  }, [hasPrevious, sortedInfractions, currentIndex])

  const handleNavigateNext = useCallback(() => {
    if (hasNext) {
      setActiveId(sortedInfractions[currentIndex + 1].id)
    }
  }, [hasNext, sortedInfractions, currentIndex])

  return {
    activeId,
    handleSelect,
    activeInfraction,
    sortedInfractions,
    currentIndex,
    hasPrevious,
    hasNext,
    handleNavigatePrevious,
    handleNavigateNext
  }
}
