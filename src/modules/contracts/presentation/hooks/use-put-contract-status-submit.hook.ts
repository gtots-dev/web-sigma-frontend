import { useCallback } from 'react'
import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { useContractStore } from '../stores/contract.store'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import type { ContractEntity } from '../../domain/entities/contract.entity'
import { useParams } from 'next/navigation'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export function usePutContractStatusSubmit() {
  const { getContracts, updateStatus } = useContractStore()
  const { operationId }: UrlParams = useParams()

  const onAction = useCallback(
    async (data: ContractEntity, onSuccess: VoidFunction): Promise<void> => {
      try {
        await updateStatus({ operationId }, data)
        toast({
          title: 'Contrato atualizado com sucesso!',
          variant: 'success'
        })
        await getContracts({ operationId })
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
    [updateStatus, getContracts]
  )

  return { onAction }
}
