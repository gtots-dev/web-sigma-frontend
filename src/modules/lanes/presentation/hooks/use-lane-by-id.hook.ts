'use client'

import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'next/navigation'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { useLaneStore } from '../stores/lanes.store'
import type { LaneEntity } from '../../domain/entities/lane.entity'

export interface UseLaneByIdResult {
  lane: LaneEntity | undefined
  lanes: LaneEntity[]
  loading: boolean
}

export function useLaneById(laneId: number): UseLaneByIdResult {
  const { operationId, contractId, processingUnitId }: UrlParams = useParams()
  const { lanes, getLanes } = useLaneStore()

  const lane = useMemo(
    () => lanes.find((l) => l.id === laneId),
    [lanes, laneId]
  )

  const [loading, setLoading] = useState(!lane)

  useEffect(() => {
    if (lane) return

    let active = true
    getLanes({ operationId, contractId, processingUnitId })
      .catch(() => undefined)
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
    // Busca apenas uma vez ao montar caso a faixa não esteja no store
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    lane,
    lanes,
    loading: loading && !lane
  }
}
