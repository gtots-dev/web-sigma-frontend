'use client'

import { useEffect, useState, useCallback } from 'react'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { useParams } from 'next/navigation'
import { usePointStore } from '../stores/point.store'
import type { PointWithGroupInterface } from '../../domain/interfaces/point-with-group.interface'

export interface UseTablePointsResult {
  points: PointWithGroupInterface[]
  loading: boolean
}

export function useTablePoints(): UseTablePointsResult {
  const { operationId, contractId }: UrlParams = useParams()
  const { points, getPoints: getPointsFromStore } = usePointStore()
  const [loading, setLoading] = useState(true)

  const getPoints = useCallback(async () => {
    setLoading(true)
    await getPointsFromStore({
      operationId,
      contractId
    })
    setLoading(false)
  }, [getPointsFromStore, operationId, contractId])

  useEffect(() => {
    getPoints()
  }, [getPoints])

  return { points, loading }
}
