import { useCallback } from 'react'
import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import type { LaneEntity } from '../../domain/entities/lane.entity'
import { useLaneStore } from '../stores/lanes.store'

export function useAddLaneSubmit() {
  const { getLanes, addLane } = useLaneStore()

  const onAction = useCallback(
    async (
      data: LaneEntity,
      onSuccess: VoidFunction
    ): Promise<void> => {
      try {
        await addLane(data)
        toast({
          title: 'Contrato adicionado com sucesso!',
          variant: 'success'
        })
        await getLanes()
        onSuccess?.()
      } catch (error) {
        if (error instanceof HttpResponseError) {
          toast({
            title: 'Erro ao cadastrar a Faixa',
            description:
              'Ocorreu um problema ao tentar cadastrar a Faixa. Verifique e tente novamente',
            variant: 'destructive'
          })
        }
      }
    },
    [addLane, getLanes]
  )

  return { onAction }
}
