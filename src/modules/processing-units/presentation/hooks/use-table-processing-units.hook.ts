'use client'

import { useEffect, useState, useCallback } from 'react'
import type { ProcessingUnitEntity } from '../../domain/entities/processing-unit.entity'
import { useProcessingUnitStore } from '../stores/processing-units.store'
import { useParams } from 'next/navigation'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export interface UseTableProcessingUnitsResult {
  processingUnits: ProcessingUnitEntity[]
  loading: boolean
}

export function useTableProcessingUnits(): UseTableProcessingUnitsResult {
  const { operationId, contractId }: UrlParams = useParams()
  const {
    processingUnits,
    getProcessingUnits: getProcessingUnitsFromStore,
    loading: storeLoading
  } = useProcessingUnitStore()
  const [loading, setLoading] = useState(true)

  const getProcessingUnits = useCallback(async () => {
    await getProcessingUnitsFromStore({ operationId, contractId })
  }, [getProcessingUnitsFromStore, operationId, contractId])

  useEffect(() => {
    Promise.resolve()
      .then(() => {
        setLoading(true)
        return getProcessingUnits()
      })
      .finally(() => setLoading(false))
  }, [getProcessingUnits])

  return { processingUnits, loading: loading || storeLoading }
}
