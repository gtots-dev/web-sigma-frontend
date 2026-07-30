'use client'

import { useState, useEffect, useCallback } from 'react'
import type { Infraction } from '../../domain/interfaces/infraction.interface'

export function useInfractionsSelection(infractions: Infraction[]) {
  const [activeId, setActiveId] = useState<number | null>(null)

  const sortedInfractions = [...infractions].sort((a, b) => b.id - a.id)

  useEffect(() => {
    if (sortedInfractions.length > 0) {
      if (
        activeId === null ||
        !sortedInfractions.some((inf) => inf.id === activeId)
      ) {
        setActiveId(sortedInfractions[0].id)
      }
    } else {
      setActiveId(null)
    }
  }, [sortedInfractions, activeId])

  const handleSelect = useCallback((id: number) => {
    setActiveId(id)
  }, [])

  const activeInfraction =
    sortedInfractions.find((inf) => inf.id === activeId) ??
    sortedInfractions[0] ??
    null

  return {
    activeId,
    handleSelect,
    activeInfraction,
    sortedInfractions
  }
}
