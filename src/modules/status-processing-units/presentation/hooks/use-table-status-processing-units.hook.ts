'use client'

import { useEffect, useState, useCallback } from 'react'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { useParams } from 'next/navigation'
import { useStatusProcessingUnitsStore } from '../stores/status-processing-units.store'
import type { ProcessingUnitStatusInterface } from '@/modules/processing-units/domain/interfaces/processing-unit-status-interface'

export interface UseTableStatusProcessingUnitsResult {
  statusList: ProcessingUnitStatusInterface[]
  loading: boolean
}

export function useTableStatusProcessingUnitsHook(): UseTableStatusProcessingUnitsResult {
  const { operationId, contractId }: UrlParams = useParams()
  const {
    statusList,
    getStatusList: getStatusListFromStore,
    loading: storeLoading
  } = useStatusProcessingUnitsStore()
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
