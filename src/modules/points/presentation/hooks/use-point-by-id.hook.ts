'use client'

import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'next/navigation'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { usePointStore } from '../stores/point.store'
import type { PointEntity } from '../../domain/entities/point.entity'
import type { PointWithGroupInterface } from '../../domain/interfaces/point-with-group.interface'

export interface UsePointByIdResult {
  point: PointEntity | undefined
  pointWithGroup: PointWithGroupInterface | undefined
  points: PointWithGroupInterface[]
  loading: boolean
}

export function usePointById(pointId: number): UsePointByIdResult {
  const { operationId, contractId }: UrlParams = useParams()
  const { points, getPoints } = usePointStore()

  const pointWithGroup = useMemo(
    () => points.find((p) => p.point.id === pointId),
    [points, pointId]
  )

  const [loading, setLoading] = useState(!pointWithGroup)

  useEffect(() => {
    if (pointWithGroup) return

    let active = true
    getPoints({ operationId, contractId })
      .catch(() => undefined)
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
    // Busca apenas uma vez ao montar caso o ponto não esteja no store
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    point: pointWithGroup?.point,
    pointWithGroup,
    points,
    loading: loading && !pointWithGroup
  }
}
