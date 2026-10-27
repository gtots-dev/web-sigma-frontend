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
  const { lanes, getLanes: getLanesFromStore, loading: storeLoading } = useLaneStore()
  const [loading, setLoading] = useState(true)

  const getLanes = useCallback(async () => {
    await getLanesFromStore({ operationId, contractId, processingUnitId })
  }, [getLanesFromStore, operationId, contractId, processingUnitId])

  useEffect(() => {
    let active = true
    Promise.resolve()
      .then(() => {
        if (active) setLoading(true)
        return getLanes()
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [getLanes])

  return { lanes, loading: loading || storeLoading }
}
