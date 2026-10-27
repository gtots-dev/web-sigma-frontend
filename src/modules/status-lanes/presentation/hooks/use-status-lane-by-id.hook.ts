'use client'

import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'next/navigation'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { useStatusLanesStore } from '../stores/status-lanes.store'
import { useStatusStore } from '@/modules/status/presentation/stores/status.store'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'

export function useStatusLaneById(statusId: number) {
  const { operationId, contractId }: UrlParams = useParams()
  const { statusList: unifiedList } = useStatusStore()
  const { statusList, getStatusList } = useStatusLanesStore()

  const cachedFromUnified = useMemo(
    () =>
      unifiedList.find(
        (item) => item.origin === 'LANE' && item.id === statusId
      ),
    [unifiedList, statusId]
  )

  const hasData = Boolean(cachedFromUnified) || statusList.length > 0
  const [loading, setLoading] = useState(!hasData)
  const [error, setError] = useState<HttpResponseError | null>(null)

  useEffect(() => {
    if (hasData || !operationId || !contractId) return

    let active = true
    Promise.resolve()
      .then(() => {
        if (!active) return
        setLoading(true)
        setError(null)
        return getStatusList({ operationId, contractId })
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
  }, [hasData, getStatusList, operationId, contractId])

  const status = useMemo(
    () => cachedFromUnified ?? statusList.find((item) => item.id === statusId),
    [cachedFromUnified, statusList, statusId]
  )

  return { status, loading: hasData ? false : loading, error }
}
