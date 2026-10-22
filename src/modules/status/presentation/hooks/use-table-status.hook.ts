'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { useStatusStore } from '../stores/status.store'
import type { StatusItemInterface } from '../../domain/interfaces/status-item.interface'

export function useTableStatusHook(): {
  statusList: StatusItemInterface[]
  loading: boolean
} {
  const { operationId, contractId }: UrlParams = useParams()
  const { statusList, loading, getStatusList } = useStatusStore()

  useEffect(() => {
    if (!operationId || !contractId) return
    getStatusList({ operationId, contractId })
  }, [getStatusList, operationId, contractId])

  return { statusList, loading }
}
