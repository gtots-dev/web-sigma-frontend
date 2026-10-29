'use client'

import { useCallback } from 'react'
import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { useParams } from 'next/navigation'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { ContractFilesInterface } from '../../domain/interfaces/contract-files.interface'
import { useContractFileStore } from '../stores/contract-file.store'
import { useActiveContractWorkspace } from '@/modules/system/presentation/hooks/use-active-contract-workspace.hook'

export function usePostContractFilesSubmit(contractId?: number | string) {
  const { postContractFiles, loadContractLogo } = useContractFileStore()
  const { operationId, contractId: paramContractId }: UrlParams = useParams()
  const { activeContractId } = useActiveContractWorkspace()

  const resolvedContractId = contractId ?? paramContractId

  const onAction = useCallback(
    async (
      files: ContractFilesInterface,
      onSuccess: VoidFunction
    ): Promise<void> => {
      if (!resolvedContractId) return

      try {
        await postContractFiles(
          { operationId, contractId: String(resolvedContractId) },
          files
        )
        toast({
          title: 'Logotipo adicionado com sucesso!',
          variant: 'success'
        })

        if (String(activeContractId) === String(resolvedContractId)) {
          await loadContractLogo({
            operationId,
            contractId: String(resolvedContractId)
          })
        }

        onSuccess?.()
      } catch (error) {
        if (error instanceof HttpResponseError) {
          toast({
            title: 'Erro ao anexar o logotipo',
            description: error.message,
            variant: 'destructive'
          })
        }
      }
    },
    [
      operationId,
      resolvedContractId,
      postContractFiles,
      activeContractId,
      loadContractLogo
    ]
  )

  return { onAction }
}
