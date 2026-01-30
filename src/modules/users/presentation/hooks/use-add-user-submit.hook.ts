'use client'

import { useCallback } from 'react'
import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { useUserStore } from '../stores/user.store'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import type { UserWithFiles } from '../../domain/types/user-with-files'
import { useParams } from 'next/navigation'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export function useAddUserSubmit() {
  const { addUser, getUsers } = useUserStore()
  const { operationId }: UrlParams = useParams()

  const onAction = useCallback(
    async (data: UserWithFiles, onSuccess: VoidFunction): Promise<void> => {
      try {
        await addUser({ operationId }, data)
        await getUsers({ operationId })
        toast({
          title: 'Usuário adicionado com sucesso!',
          variant: 'success'
        })
        onSuccess?.()
      } catch (error) {
        if (error instanceof HttpResponseError) {
          toast({
            title: 'Erro ao cadastrar o usuário',
            description: error.message,
            variant: 'destructive'
          })
        }
      }
    },
    [addUser, getUsers, operationId]
  )

  return { onAction }
}
