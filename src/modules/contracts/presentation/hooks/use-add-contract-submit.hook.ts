import { useCallback } from 'react'
import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { useContractStore } from '../stores/contract.store'
import type { ContractEntity } from '../../domain/entities/contract.entity'
import { useParams } from 'next/navigation'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { useContractFileStore } from '../stores/contract-file.store'
import type { ContractWithFiles } from '../../domain/types/contract-with-files'

export function useAddContractSubmit() {
  const { postContractFiles } = useContractFileStore()
  const { addContract, getContracts } = useContractStore()
  const { operationId }: UrlParams = useParams()

  const onAction = useCallback(
    async (data: ContractWithFiles, onSuccess: VoidFunction): Promise<void> => {
      const contract = {
        name: data.name ?? '',
        alias: data.alias ?? '',
        cfg: data.cfg
      }
      const files = {
        files: data.files ?? []
      }
      try {
        const response = await addContract(
          { operationId },
          contract as ContractEntity
        )
        if (files.files.length > 0 && response?.data?.id) {
          await postContractFiles(
            { operationId, contractId: String(response.data.id) },
            files
          )
        }
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
    [addContract, getContracts, operationId, postContractFiles]
  )

  return { onAction }
}
