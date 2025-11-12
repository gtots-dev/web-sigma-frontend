'use client'

import { useCallback } from 'react'
import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { useProcessingUnitStore } from '../stores/processing-units.store'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { useParams } from 'next/navigation'
import type { ProcessingUnitEnableAndDisableInterface } from '../../domain/interfaces/processing-unit-enable-and-disable.interface'

export function usePatchProcessingUnitStatusSubmit() {
  const { getProcessingUnits, patchProcessingUnitStatus } =
    useProcessingUnitStore()
  const { operationId, contractId }: UrlParams = useParams()

  const onAction = useCallback(
    async (
      processingUnitEnableAndDisabled: ProcessingUnitEnableAndDisableInterface,
      onSuccess: VoidFunction
    ): Promise<void> => {
      try {
        await patchProcessingUnitStatus(
          {
            operationId,
            contractId,
            processingUnitId: String(processingUnitEnableAndDisabled.id)
          },
          processingUnitEnableAndDisabled
        )
        toast({
          title: 'Unidade de processamento atualizado com sucesso!',
          variant: 'success'
        })
        await getProcessingUnits({ operationId, contractId })
        onSuccess?.()
      } catch (error) {
        if (error instanceof HttpResponseError) {
          toast({
            title: 'Erro ao atualizar o status unidade de processamento',
            description:
              'Ocorreu um problema ao tentar atualizar o status do unidade de processamento. Verifique e tente novamente',
            variant: 'destructive'
          })
        }
      }
    },
    [getProcessingUnits, patchProcessingUnitStatus, operationId, contractId]
  )

  return { onAction }
}
