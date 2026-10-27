'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { useProcessingUnitStore } from '@/modules/processing-units/presentation/stores/processing-units.store'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'

export function useProcessingUnitsOptions(enabled = true) {
  const { operationId, contractId }: UrlParams = useParams()
  const { processingUnits, getProcessingUnits } = useProcessingUnitStore()
  const canFetch = Boolean(enabled && operationId && contractId)
  const [loading, setLoading] = useState(canFetch)
  const [error, setError] = useState<HttpResponseError | null>(null)

  useEffect(() => {
    if (!canFetch) return

    let active = true
    Promise.resolve()
      .then(() => {
        if (!active) return
        setLoading(true)
        setError(null)
        return getProcessingUnits({ operationId, contractId })
      })
      .catch((err: unknown) => {
        if (active && err instanceof HttpResponseError) setError(err)
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [canFetch, getProcessingUnits, operationId, contractId])

  return {
    processingUnits: enabled && !error ? processingUnits : [],
    loading: canFetch ? loading : false,
    error
  }
}
