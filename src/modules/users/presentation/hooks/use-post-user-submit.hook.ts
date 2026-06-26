'use client'

import { useCallback } from 'react'
import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { useUserStore } from '../stores/user.store'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { useParams } from 'next/navigation'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { UserWithFiles } from '../../domain/types/user-with-files'
import { useUserFilesStore } from '../stores/user-files.store'

export function useAddUserSubmit() {
  const { postUserFiles } = useUserFilesStore()
  const { addUser, getUsers } = useUserStore()
  const { operationId }: UrlParams = useParams()

  const onAction = useCallback(
    async (data: UserWithFiles, onSuccess: VoidFunction): Promise<void> => {
      const user = {
        name: data.name,
        email: data.email,
        login_name: data.login_name,
        company: data.company,
        position: data.position,
        days_passwd_reg_deadline: data.days_passwd_reg_deadline,
        description: data.description
      }
      const files = {
        files: data.files
      }
      try {
        const { data: responseUser } = await addUser({ operationId }, user)
        if (files.files?.length > 0)
          await postUserFiles(
            { operationId, userId: String(responseUser.id) },
            files
          )
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
