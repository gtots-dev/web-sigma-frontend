import { useCallback } from 'react'
import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { useContractStore } from '../stores/contract.store'
import type { ContractEntity } from '../../domain/entities/contract.entity'
import { useParams } from 'next/navigation'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { useTwoFactorChallenge } from '@/modules/two-factor/presentation/contexts/two-factor-challenge.context'

export function useAddContractSubmit() {
  const { addContract, getContracts } = useContractStore()
  const { operationId }: UrlParams = useParams()
  const { challenge } = useTwoFactorChallenge()

  const onAction = useCallback(
    async (data: ContractEntity, onSuccess: VoidFunction): Promise<void> => {
      const twoFactorCode = await challenge()
      if (!twoFactorCode) return

      try {
        await addContract({ operationId }, data)
        toast({
          title: 'Contrato adicionado com sucesso!',
          variant: 'success'
        })
        await getContracts({ operationId })
        onSuccess?.()
      } catch (error) {
        if (error instanceof HttpResponseError) {
          toast({
            title: 'Erro ao cadastrar o contrato',
            description: error.message,
            variant: 'destructive'
          })
        }
      }
    },
    [addContract, getContracts, operationId, challenge]
  )

  return { onAction }
}
