'use client'

import { useCallback } from 'react'
import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { useContractStore } from '../stores/contract.store'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { useParams } from 'next/navigation'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { useContractFileStore } from '../stores/contract-file.store'
import type { ContractWithFiles } from '../../domain/types/contract-with-files'
import { useActiveContractWorkspace } from '@/modules/system/presentation/hooks/use-active-contract-workspace.hook'

export function usePatchContractSubmit() {
  const { patchContract, getContracts } = useContractStore()
  const { postContractFiles, loadContractLogo } = useContractFileStore()
  const { activeContractId } = useActiveContractWorkspace()
  const { operationId }: UrlParams = useParams()

  const onAction = useCallback(
    async (
      data: Partial<ContractWithFiles>,
      onSuccess: VoidFunction
    ): Promise<void> => {
      const { files, ...contractPayload } = data
      const contractId = String(contractPayload.id)
      const hasContractChanges = Object.keys(contractPayload).some(
        (key) => key !== 'id'
      )

      try {
        if (hasContractChanges) {
          await patchContract({ operationId }, contractPayload)
        }
        if (files?.length) {
          await postContractFiles({ operationId, contractId }, { files })
          if (String(activeContractId) === contractId) {
            await loadContractLogo({ operationId, contractId })
          }
        }
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
            description: error.message,
            variant: 'destructive'
          })
        }
      }
    },
    [
      patchContract,
      getContracts,
      operationId,
      postContractFiles,
      loadContractLogo,
      activeContractId
    ]
  )

  return { onAction }
}
