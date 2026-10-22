'use client'

import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'next/navigation'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { useStatusProcessingUnitsStore } from '../stores/status-processing-units.store'
import { useStatusStore } from '@/modules/status/presentation/stores/status.store'

export function useStatusProcessingUnitById(statusId: number) {
  const { operationId, contractId }: UrlParams = useParams()
  const { statusList: unifiedList } = useStatusStore()
  const { statusList, getStatusList } = useStatusProcessingUnitsStore()

  const cachedFromUnified = useMemo(
    () =>
      unifiedList.find((item) => item.origin === 'UP' && item.id === statusId),
    [unifiedList, statusId]
  )

  const hasData = Boolean(cachedFromUnified) || statusList.length > 0
  const [loading, setLoading] = useState(!hasData)

  useEffect(() => {
    if (hasData) {
      setLoading(false)
      return
    }
    if (!operationId || !contractId) return

    let active = true
    setLoading(true)
    getStatusList({ operationId, contractId }).finally(() => {
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

  return { status, loading }
}
