import { useCallback } from 'react'
import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { useContractStore } from '../stores/contract.store'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import type { ContractEntity } from '../../domain/entities/contract.entity'

export function usePutContractStatusSubmit() {
  const { getContracts } = useContractStore()

  const onAction = useCallback(
    async (data: ContractEntity, onSuccess: VoidFunction): Promise<void> => {
      try {
        toast({
          title: 'Contrato atualizado com sucesso!',
          variant: 'success'
        })
        await getContracts()
        onSuccess?.()
      } catch (error) {
        if (error instanceof HttpResponseError) {
          toast({
            title: 'Erro ao atualizar o status contrato',
            description:
              'Ocorreu um problema ao tentar atualizar o status do contrato. Verifique e tente novamente',
            variant: 'destructive'
          })
        }
      }
    },
    [getContracts]
  )

  return { onAction }
}
