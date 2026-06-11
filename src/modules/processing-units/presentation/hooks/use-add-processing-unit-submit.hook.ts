import { useCallback } from 'react'
import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import type { ProcessingUnitEntity } from '../../domain/entities/processing-unit.entity'
import { useProcessingUnitStore } from '../stores/processing-units.store'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { useParams } from 'next/navigation'

export function useAddProcessingUnitSubmit() {
  const { operationId, contractId }: UrlParams = useParams()
  const { getProcessingUnits, addProcessingUnit } = useProcessingUnitStore()

  const onAction = useCallback(
    async (
      data: ProcessingUnitEntity,
      onSuccess: VoidFunction
    ): Promise<void> => {
      try {
        await addProcessingUnit({ operationId, contractId }, data)
        toast({
          title: 'Unidade de processamento adicionado com sucesso!',
          variant: 'success'
        })
        await getProcessingUnits({ operationId, contractId })
        onSuccess?.()
      } catch (error) {
        if (error instanceof HttpResponseError) {
          toast({
            title: 'Erro ao cadastrar a unidade de Processamento',
            description: error.message,
            variant: 'destructive'
          })
        }
      }
    },
    [addProcessingUnit, getProcessingUnits, operationId, contractId]
  )

  return { onAction }
}
