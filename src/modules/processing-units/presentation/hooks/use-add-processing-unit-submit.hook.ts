import { useCallback } from 'react'
import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import type { ProcessingUnitEntity } from '../../domain/entities/processing-unit.entity'
import { useProcessingUnitStore } from '../stores/processing-units.store'

export function useAddProcessingUnitSubmit() {
  const { getProcessingUnits, addProcessingUnit } = useProcessingUnitStore()

  const onAction = useCallback(
    async (
      data: ProcessingUnitEntity,
      onSuccess: VoidFunction
    ): Promise<void> => {
      try {
        await addProcessingUnit(data)
        toast({
          title: 'Contrato adicionado com sucesso!',
          variant: 'success'
        })
        await getProcessingUnits()
        onSuccess?.()
      } catch (error) {
        if (error instanceof HttpResponseError) {
          toast({
            title: 'Erro ao cadastrar a unidade de Processamento',
            description:
              'Ocorreu um problema ao tentar cadastrar a unidade de Processamento. Verifique e tente novamente',
            variant: 'destructive'
          })
        }
      }
    },
    [addProcessingUnit, getProcessingUnits]
  )

  return { onAction }
}
