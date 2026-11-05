'use client'

import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'next/navigation'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { useProcessingUnitStore } from '../stores/processing-units.store'
import type { ProcessingUnitEntity } from '../../domain/entities/processing-unit.entity'

export interface UseProcessingUnitByIdResult {
  processingUnit: ProcessingUnitEntity | undefined
  processingUnits: ProcessingUnitEntity[]
  loading: boolean
}

export function useProcessingUnitById(
  processingUnitId: number
): UseProcessingUnitByIdResult {
  const { operationId, contractId }: UrlParams = useParams()
  const { processingUnits, getProcessingUnits } = useProcessingUnitStore()

  const processingUnit = useMemo(
    () => processingUnits.find((pu) => pu.id === processingUnitId),
    [processingUnits, processingUnitId]
  )

  const [loading, setLoading] = useState(!processingUnit)

  useEffect(() => {
    if (processingUnit) return

    let active = true
    getProcessingUnits({ operationId, contractId })
      .catch(() => undefined)
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
    // Busca apenas uma vez ao montar caso a unidade de processamento não esteja no store
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    processingUnit,
    processingUnits,
    loading: loading && !processingUnit
  }
}
