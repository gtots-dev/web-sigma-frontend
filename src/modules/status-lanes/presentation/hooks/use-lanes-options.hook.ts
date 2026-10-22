'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { useLaneStore } from '@/modules/lanes/presentation/stores/lanes.store'

export function useLanesOptions() {
  const { operationId, contractId }: UrlParams = useParams()
  const { contractLanes, getContractLanes } = useLaneStore()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!operationId || !contractId) return
    setLoading(true)
    getContractLanes({ operationId, contractId }).finally(() =>
      setLoading(false)
    )
  }, [getContractLanes, operationId, contractId])

  return { contractLanes, loading }
}
