import { useCallback } from 'react'
import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { useContractStore } from '../stores/contract.store'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import type { ContractEntity } from '../../domain/entities/contract.entity'
import { useParams } from 'next/navigation'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export function useEditContractSubmit() {
  const { updateContract, getContracts } = useContractStore()
  const { operationId }: UrlParams = useParams()

  const onAction = useCallback(
    async (data: ContractEntity, onSuccess: VoidFunction): Promise<void> => {
      try {
        await updateContract(data)
        toast({
          title: 'Contrato atualizado com sucesso!',
          variant: 'success'
        })
        await getContracts({ operationId })
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
    [updateContract, getContracts]
  )

  return { onAction }
}
