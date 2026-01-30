import { useCallback } from 'react'
import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { useUserStore } from '../stores/user.store'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import type { UserWithFiles } from '../../domain/types/user-with-files'
import { useParams } from 'next/navigation'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export function useEditUserSubmit() {
  const { patchUser, getUsers } = useUserStore()
  const { operationId }: UrlParams = useParams()

  const onAction = useCallback(
    async (data: UserWithFiles, onSuccess: VoidFunction): Promise<void> => {
      try {
        await patchUser({ operationId }, data)
        await getUsers({ operationId })
        toast({
          title: 'Usuário atualizado com sucesso!',
          variant: 'success'
        })
        onSuccess?.()
      } catch (error) {
        if (error instanceof HttpResponseError) {
          toast({
            title: 'Erro ao atualizar usuário',
            description: error.message,
            variant: 'destructive'
          })
        }
      }
    },
    [patchUser, getUsers, operationId]
  )

  return { onAction }
}
