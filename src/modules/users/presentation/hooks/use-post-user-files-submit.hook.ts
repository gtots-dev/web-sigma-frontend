'use client'

import { useCallback } from 'react'
import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { useParams } from 'next/navigation'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { useTableUser } from '../contexts/table-user.context'
import type { UserFilesInterface } from '../../domain/interfaces/user-files.interface'
import { useUserFilesStore } from '../stores/user-files.store'
import { useTwoFactorChallenge } from '@/modules/two-factor/presentation/contexts/two-factor-challenge.context'

export function usePostUserFilesSubmit() {
  const { postUserFiles } = useUserFilesStore()
  const { operationId }: UrlParams = useParams()
  const { id: userId } = useTableUser()
  const { challenge } = useTwoFactorChallenge()

  const onAction = useCallback(
    async (
      files: UserFilesInterface,
      onSuccess: VoidFunction
    ): Promise<void> => {
      const twoFactorCode = await challenge()
      if (!twoFactorCode) return

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
    [operationId, userId, challenge, postUserFiles]
  )

  return { onAction }
}
