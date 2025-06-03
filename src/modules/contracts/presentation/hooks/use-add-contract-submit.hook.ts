import { useCallback } from 'react'
import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { useContractStore } from '../stores/contract.store'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import type { ContractEntity } from '../../domain/entities/contract.entity'

export function useAddContractSubmit() {
  const { addContract, getContracts } = useContractStore()

  const onAction = useCallback(
    async (data: ContractEntity, onSuccess: VoidFunction): Promise<void> => {
      try {
        await addContract(data)
        toast({
          title: 'Contrato adicionado com sucesso!',
          variant: 'success'
        })
        onSuccess?.()
      } catch (error) {
        if (error instanceof HttpResponseError) {
          toast({
            title: 'Erro ao cadastrar o contrato',
            description:
              'Ocorreu um problema ao tentar cadastrar o contrato. Verifique e tente novamente',
            variant: 'destructive'
          })
        }
      }
    },
    [addContract, getContracts]
  )

  return { onAction }
}
