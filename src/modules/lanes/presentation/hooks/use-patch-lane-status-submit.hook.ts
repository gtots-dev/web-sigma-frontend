'use client'

import { useCallback } from 'react'
import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { useLaneStore } from '../stores/lanes.store'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { useParams } from 'next/navigation'
import type { LaneEnableAndDisableInterface } from '../../domain/interfaces/lane-enable-and-disable.interface'

export function usePatchLaneStatusSubmit() {
  const { operationId, contractId, processingUnitId }: UrlParams = useParams()
  const { getLanes, patchLaneStatus } = useLaneStore()

  const onAction = useCallback(
    async (
      laneEnableAndDisable: LaneEnableAndDisableInterface,
      onSuccess: VoidFunction
    ): Promise<void> => {
      try {
        await patchLaneStatus(
          { operationId, contractId, processingUnitId },
          laneEnableAndDisable
        )
        toast({
          title: 'Contrato atualizado com sucesso!',
          variant: 'success'
        })
        await getLanes({ operationId, contractId, processingUnitId })
        onSuccess?.()
      } catch (error) {
        if (error instanceof HttpResponseError) {
          toast({
            title: 'Erro ao atualizar o status contrato',
            description: error.message,
            variant: 'destructive'
          })
        }
      }
    },
    [getLanes, patchLaneStatus, operationId, contractId, processingUnitId]
  )

  return { onAction }
}
