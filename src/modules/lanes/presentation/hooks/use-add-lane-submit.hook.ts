'use client'

import { useCallback } from 'react'
import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import type { LaneEntity } from '../../domain/entities/lane.entity'
import { useLaneStore } from '../stores/lanes.store'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { useParams } from 'next/navigation'

export function useAddLaneSubmit() {
  const { operationId, contractId, processingUnitId }: UrlParams = useParams()
  const { getLanes, addLane } = useLaneStore()

  const onAction = useCallback(
    async (lane: LaneEntity, onSuccess: VoidFunction): Promise<void> => {
      try {
        await addLane({ operationId, contractId, processingUnitId }, lane)
        toast({
          title: 'Faixa adicionada com sucesso!',
          variant: 'success'
        })
        await getLanes({ operationId, contractId, processingUnitId })
        onSuccess?.()
      } catch (error) {
        if (error instanceof HttpResponseError) {
          toast({
            title: 'Erro ao cadastrar a faixa',
            description: error.message,
            variant: 'destructive'
          })
        }
      }
    },
    [addLane, getLanes, operationId, contractId, processingUnitId]
  )

  return { onAction }
}
