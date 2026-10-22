'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { useProcessingUnitStore } from '@/modules/processing-units/presentation/stores/processing-units.store'

export function useProcessingUnitsOptions() {
  const { operationId, contractId }: UrlParams = useParams()
  const { processingUnits, getProcessingUnits } = useProcessingUnitStore()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!operationId || !contractId) return
    setLoading(true)
    getProcessingUnits({ operationId, contractId }).finally(() =>
      setLoading(false)
    )
  }, [getProcessingUnits, operationId, contractId])

  return { processingUnits, loading }
}
