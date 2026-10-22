'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useParams } from 'next/navigation'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { ProcessingUnitEntity } from '@/modules/processing-units/domain/entities/processing-unit.entity'
import { GetStatusProcessingUnitIgnoreRouterApiFactory } from '@/modules/api/infrastructure/factories/get-status-processing-unit-ignore-router-api.factory'

export function useStatusProcessingUnitIgnores(
  statusId: number,
  processingUnits: ProcessingUnitEntity[]
) {
  const { operationId, contractId }: UrlParams = useParams()
  const [initialProcessingUnitIds, setInitialProcessingUnitIds] = useState<number[]>([])
  const [ignoreMap, setIgnoreMap] = useState<Map<number, number>>(new Map())
  const [fetchedKey, setFetchedKey] = useState<string | null>(null)

  // Chave estável: só refaz a busca se o conjunto de U.P.s realmente mudar
  const unitsKey = processingUnits.map((unit) => unit.id).join(',')
  const unitsRef = useRef(processingUnits)
  unitsRef.current = processingUnits

  const fetchIgnores = useCallback(async () => {
    const units = unitsRef.current
    if (!operationId || !contractId || units.length === 0) {
      setFetchedKey(unitsKey)
      return
    }

    try {
      const newIgnoreMap = new Map<number, number>()
      const ignoredIds: number[] = []

      await Promise.all(
        units.map(async (unit) => {
          try {
            const service = GetStatusProcessingUnitIgnoreRouterApiFactory.create({
              operationId,
              contractId,
              upId: String(unit.id)
            })
            const { data } = await service.execute()
            if (data && Array.isArray(data)) {
              const match = data.find((item) => item.up_status_list_id === statusId)
              if (match) {
                ignoredIds.push(unit.id)
                newIgnoreMap.set(unit.id, match.id)
              }
            }
          } catch {
            // Se falhar a consulta de uma UP específica, continua as outras
          }
        })
      )

      setInitialProcessingUnitIds(ignoredIds)
      setIgnoreMap(newIgnoreMap)
    } finally {
      setFetchedKey(unitsKey)
    }
  }, [operationId, contractId, unitsKey, statusId])

  useEffect(() => {
    fetchIgnores()
  }, [fetchIgnores])

  // Só considera carregado quando os ignores buscados correspondem às U.P.s atuais
  const loading = fetchedKey !== unitsKey

  return { initialProcessingUnitIds, ignoreMap, loading, refetch: fetchIgnores }
}
