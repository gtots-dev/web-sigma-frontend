'use client'

import { useEffect, useState, useCallback } from 'react'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { useParams } from 'next/navigation'
import { useStatusLanesStore } from '../stores/status-lanes.store'
import type { LaneStatusInterface } from '@/modules/lanes/domain/interfaces/lane-status.interface'

export interface UseTableStatusLanesResult {
  statusList: LaneStatusInterface[]
  loading: boolean
}

export function useTableStatusLanesHook(): UseTableStatusLanesResult {
  const { operationId, contractId }: UrlParams = useParams()
  const {
    statusList,
    getStatusList: getStatusListFromStore,
    loading: storeLoading
  } = useStatusLanesStore()
  const [loading, setLoading] = useState(true)

  const getStatusList = useCallback(async () => {
    if (!operationId || !contractId) return
    setLoading(true)
    await getStatusListFromStore({
      operationId,
      contractId
    })
    setLoading(false)
  }, [getStatusListFromStore, operationId, contractId])

  useEffect(() => {
    getStatusList()
  }, [getStatusList])

  return { statusList, loading: loading || storeLoading }
}
