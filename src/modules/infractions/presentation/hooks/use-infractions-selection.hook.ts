'use client'

import { useState, useMemo, useCallback } from 'react'
import type { Infraction } from '../../domain/interfaces/infraction.interface'

export function useInfractionsSelection(
  infractions: Infraction[],
  initialSelectedId?: number | string | null
) {
  const [selectionState, setSelectionState] = useState<{
    id: number | string | null
    initialId: number | string | null | undefined
  }>({
    id: initialSelectedId ?? null,
    initialId: initialSelectedId
  })

  const sortedInfractions = useMemo(
    () =>
      [...infractions].sort((a, b) => {
        const numA =
          typeof a.id === 'number' ? a.id : parseInt(String(a.id), 10) || 0
        const numB =
          typeof b.id === 'number' ? b.id : parseInt(String(b.id), 10) || 0
        return numB - numA
      }),
    [infractions]
  )

  const activeId = useMemo(() => {
    if (sortedInfractions.length === 0) return null

    const candidateId =
      selectionState.initialId !== initialSelectedId &&
      initialSelectedId !== undefined &&
      initialSelectedId !== null &&
      sortedInfractions.some(
        (inf) => String(inf.id) === String(initialSelectedId)
      )
        ? initialSelectedId
        : selectionState.id

    if (
      candidateId !== null &&
      sortedInfractions.some((inf) => String(inf.id) === String(candidateId))
    ) {
      return candidateId
    }

    if (
      initialSelectedId !== undefined &&
      initialSelectedId !== null &&
      sortedInfractions.some(
        (inf) => String(inf.id) === String(initialSelectedId)
      )
    ) {
      return initialSelectedId
    }

    return sortedInfractions[0].id
  }, [sortedInfractions, selectionState, initialSelectedId])

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

  const handleSelect = useCallback(
    (id: number | string) => {
      setSelectionState({ id, initialId: initialSelectedId })
    },
    [initialSelectedId]
  )

  const handleNavigatePrevious = useCallback(() => {
    if (hasPrevious) {
      setSelectionState({
        id: sortedInfractions[currentIndex - 1].id,
        initialId: initialSelectedId
      })
    }
  }, [hasPrevious, sortedInfractions, currentIndex, initialSelectedId])

  const handleNavigateNext = useCallback(() => {
    if (hasNext) {
      setSelectionState({
        id: sortedInfractions[currentIndex + 1].id,
        initialId: initialSelectedId
      })
    }
  }, [hasNext, sortedInfractions, currentIndex, initialSelectedId])

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
