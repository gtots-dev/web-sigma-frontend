import { useCallback } from 'react'
import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import type { ProcessingUnitEntity } from '../../domain/entities/processing-unit.entity'
import { useProcessingUnitStore } from '../stores/processing-units.store'

export function usePutProcessingUnitStatusSubmit() {
  const { getProcessingUnits } = useProcessingUnitStore()

  const onAction = useCallback(
    async (
      data: ProcessingUnitEntity,
      onSuccess: VoidFunction
    ): Promise<void> => {
      try {
        toast({
          title: 'Unidade de processamento atualizado com sucesso!',
          variant: 'success'
        })
        await getProcessingUnits()
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
    [getProcessingUnits]
  )

  return { onAction }
}
