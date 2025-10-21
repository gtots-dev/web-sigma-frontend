import { useCallback } from 'react'
import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import type { LaneEntity } from '../../domain/entities/lane.entity'
import { useLaneStore } from '../stores/lanes.store'

export function useEditLaneSubmit() {
  const { getLanes } = useLaneStore()

  const onAction = useCallback(
    async (
      data: LaneEntity,
      onSuccess: VoidFunction
    ): Promise<void> => {
      try {
        toast({
          title: 'Contrato atualizado com sucesso!',
          variant: 'success'
        })
        await getLanes()
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
    [getLanes]
  )

  return { onAction }
}
