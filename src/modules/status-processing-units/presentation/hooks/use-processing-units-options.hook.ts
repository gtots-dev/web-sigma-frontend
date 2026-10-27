'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { useProcessingUnitStore } from '@/modules/processing-units/presentation/stores/processing-units.store'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'

export function useProcessingUnitsOptions(enabled = true) {
  const { operationId, contractId }: UrlParams = useParams()
  const { processingUnits, getProcessingUnits } = useProcessingUnitStore()
  const [loading, setLoading] = useState(enabled)
  const [error, setError] = useState<HttpResponseError | null>(null)

  useEffect(() => {
    if (!enabled || !operationId || !contractId) {
      setLoading(false)
      return
    }
    let active = true
    setLoading(true)
    setError(null)
    getProcessingUnits({ operationId, contractId })
      .catch((err: unknown) => {
        if (active && err instanceof HttpResponseError) setError(err)
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [enabled, getProcessingUnits, operationId, contractId])

  return {
    processingUnits: enabled && !error ? processingUnits : [],
    loading,
    error
  }
}
