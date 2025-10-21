import { useCallback } from 'react'
import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import type { ProcessingUnitEntity } from '../../domain/entities/processing-unit.entity'
import { useProcessingUnitStore } from '../stores/processing-units.store'

export function useEditProcessingUnitSubmit() {
  const { getProcessingUnits } = useProcessingUnitStore()

  const onAction = useCallback(
    async (
      data: ProcessingUnitEntity,
      onSuccess: VoidFunction
    ): Promise<void> => {
      try {
        toast({
          title: 'Contrato atualizado com sucesso!',
          variant: 'success'
        })
        await getProcessingUnits()
        onSuccess?.()
      } catch (error) {
        if (error instanceof HttpResponseError) {
          toast({
            title: 'Erro ao atualizar o contrato',
            description:
              'Ocorreu um problema ao tentar atualizar o contrato. Verifique e tente novamente',
            variant: 'destructive'
          })
        }
      }
    },
    [getProcessingUnits]
  )

  return { onAction }
}
