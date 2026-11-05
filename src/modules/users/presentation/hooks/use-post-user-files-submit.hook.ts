'use client'

import { useCallback } from 'react'
import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { useParams } from 'next/navigation'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { UserFilesInterface } from '../../domain/interfaces/user-files.interface'
import { useUserFilesStore } from '../stores/user-files.store'

export function usePostUserFilesSubmit(userId: number) {
  const { postUserFiles } = useUserFilesStore()
  const { operationId }: UrlParams = useParams()

  const onAction = useCallback(
    async (
      files: UserFilesInterface,
      onSuccess: VoidFunction
    ): Promise<void> => {
      try {
        await postUserFiles({ operationId, userId: String(userId) }, files)
        toast({
          title: 'Anexo adicionado com sucesso!',
          variant: 'success'
        })
        onSuccess?.()
      } catch (error) {
        if (error instanceof HttpResponseError) {
          toast({
            title: 'Erro ao anexar o documento(s)',
            description: error.message,
            variant: 'destructive'
          })
        }
      }
    },
    [operationId, userId, postUserFiles]
  )

  return { onAction }
}
