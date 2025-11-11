'use client'

import { useCallback } from 'react'
import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import type { LaneEntity } from '../../domain/entities/lane.entity'
import { useLaneStore } from '../stores/lanes.store'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { useParams } from 'next/navigation'

export function useEditLaneSubmit() {
  const { operationId, contractId, processingUnitId }: UrlParams = useParams()
  const { getLanes, patchLane } = useLaneStore()

  const onAction = useCallback(
    async (lane: LaneEntity, onSuccess: VoidFunction): Promise<void> => {
      try {
        await patchLane({ operationId, contractId, processingUnitId }, lane)
        toast({
          title: 'Faixa atualizado com sucesso!',
          variant: 'success'
        })
        await getLanes({ operationId, contractId, processingUnitId })
        onSuccess?.()
      } catch (error) {
        if (error instanceof HttpResponseError) {
          toast({
            title: 'Erro ao atualizar o faixa',
            description:
              'Ocorreu um problema ao tentar atualizar o faixa. Verifique e tente novamente',
            variant: 'destructive'
          })
        }
      }
    },
    [getLanes, patchLane, operationId, contractId, processingUnitId]
  )

  return { onAction }
}
