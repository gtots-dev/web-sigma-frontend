'use client'

import { useEffect, useState, useCallback } from 'react'
import type { ProcessingUnitEntity } from '../../domain/entities/processing-unit.entity'
import { useProcessingUnitStore } from '../stores/processing-units.store'

export interface UseTableProcessingUnitsResult {
  processingUnits: ProcessingUnitEntity[]
  loading: boolean
}

export function useTableProcessingUnits(): UseTableProcessingUnitsResult {
  const { processingUnits, getProcessingUnits: getProcessingUnitsFromStore } = useProcessingUnitStore()
  const [loading, setLoading] = useState(true)

  const getProcessingUnits = useCallback(async () => {
    setLoading(true)
    await getProcessingUnitsFromStore()
    setLoading(false)
  }, [getProcessingUnitsFromStore])

  useEffect(() => {
    getProcessingUnits()
  }, [getProcessingUnits])

  return { processingUnits, loading }
}
