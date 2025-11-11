'use client'

import { useEffect, useState, useCallback } from 'react'
import type { LaneEntity } from '../../domain/entities/lane.entity'
import { useLaneStore } from '../stores/lanes.store'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { useParams } from 'next/navigation'

export interface UseTableLanesResult {
  lanes: LaneEntity[]
  loading: boolean
}

export function useTableLanes(): UseTableLanesResult {
  const { operationId, contractId, processingUnitId }: UrlParams = useParams()
  const { lanes, getLanes: getLanesFromStore } = useLaneStore()
  const [loading, setLoading] = useState(true)

  const getLanes = useCallback(async () => {
    setLoading(true)
    await getLanesFromStore({ operationId, contractId, processingUnitId })
    setLoading(false)
  }, [getLanesFromStore, operationId, contractId, processingUnitId])

  useEffect(() => {
    getLanes()
  }, [getLanes])

  return { lanes, loading }
}
