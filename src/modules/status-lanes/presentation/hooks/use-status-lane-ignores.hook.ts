'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useParams } from 'next/navigation'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { LaneWithPointAndGroupInterface } from '@/modules/lanes/domain/interfaces/lane-with-point-and-group.interface'
import { GetStatusLaneIgnoreRouterApiFactory } from '@/modules/api/infrastructure/factories/get-status-lane-ignore-router-api.factory'

export interface LaneIgnoreInfo {
  ignoreId: number
  upId: number
}

export function useStatusLaneIgnores(
  statusId: number,
  contractLanes: LaneWithPointAndGroupInterface[]
) {
  const { operationId, contractId }: UrlParams = useParams()
  const [initialLaneIds, setInitialLaneIds] = useState<number[]>([])
  const [ignoreMap, setIgnoreMap] = useState<Map<number, LaneIgnoreInfo>>(
    new Map()
  )
  const [fetchedKey, setFetchedKey] = useState<string | null>(null)

  // Chave estável: só refaz a busca se o conjunto de faixas realmente mudar
  const lanesKey = contractLanes
    .map((item) => `${item.lane.up_id ?? item.up_id}:${item.lane.id}`)
    .join(',')
  const lanesRef = useRef(contractLanes)
  lanesRef.current = contractLanes

  const fetchIgnores = useCallback(async () => {
    const lanes = lanesRef.current
    if (!operationId || !contractId || lanes.length === 0) {
      setFetchedKey(lanesKey)
      return
    }

    try {
      const newIgnoreMap = new Map<number, LaneIgnoreInfo>()
      const ignoredIds: number[] = []

      await Promise.all(
        lanes.map(async (item) => {
          try {
            const laneId = item.lane.id
            const upId = item.lane.up_id ?? item.up_id
            if (!upId) return

            const service = GetStatusLaneIgnoreRouterApiFactory.create({
              operationId,
              contractId,
              upId: String(upId),
              laneId: String(laneId)
            })
            const { data } = await service.execute()
            if (data && Array.isArray(data)) {
              const match = data.find(
                (ig) => ig.lane_status_list_id === statusId
              )
              if (match) {
                ignoredIds.push(laneId)
                newIgnoreMap.set(laneId, { ignoreId: match.id, upId })
              }
            }
          } catch {
            // Continua as outras faixas em caso de falha individual
          }
        })
      )

      setInitialLaneIds(ignoredIds)
      setIgnoreMap(newIgnoreMap)
    } finally {
      setFetchedKey(lanesKey)
    }
  }, [operationId, contractId, lanesKey, statusId])

  useEffect(() => {
    fetchIgnores()
  }, [fetchIgnores])

  // Só considera carregado quando os ignores buscados correspondem às faixas atuais
  const loading = fetchedKey !== lanesKey

  return { initialLaneIds, ignoreMap, loading, refetch: fetchIgnores }
}
