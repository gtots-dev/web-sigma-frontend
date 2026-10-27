'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { useLaneStore } from '@/modules/lanes/presentation/stores/lanes.store'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'

export function useLanesOptions(enabled = true) {
  const { operationId, contractId }: UrlParams = useParams()
  const { contractLanes, getContractLanes } = useLaneStore()
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
    getContractLanes({ operationId, contractId })
      .catch((err: unknown) => {
        if (active && err instanceof HttpResponseError) setError(err)
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [enabled, getContractLanes, operationId, contractId])

  return {
    contractLanes: enabled && !error ? contractLanes : [],
    loading,
    error
  }
}
