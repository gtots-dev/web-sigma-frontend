import { useCallback } from 'react'
import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { useUserStore } from '../stores/user.store'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import type { UserEnableAndDisableInterface } from '../../domain/interfaces/user-enable-and-disable.interface'
import { useParams } from 'next/navigation'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export function usePatchUserStatusSubmit() {
  const { getUsers, updateUserStatus } = useUserStore()
  const { operationId }: UrlParams = useParams()
  const onAction = useCallback(
    async (
      userStatus: UserEnableAndDisableInterface,
      onSuccess: VoidFunction
    ): Promise<void> => {
      try {
        await updateUserStatus({ operationId }, userStatus)
        await getUsers({ operationId })
        toast({
          title: 'Status do usuário alterado com sucesso!',
          variant: 'success'
        })
        onSuccess?.()
      } catch (error) {
        if (error instanceof HttpResponseError) {
          toast({
            title: 'Erro ao alterar o status do usuário',
            description:
              'Ocorreu um problema ao tentar alterar o status. Verifique e tente novamente',
            variant: 'destructive'
          })
        }
      }
    },
    [getUsers, updateUserStatus, operationId]
  )

  return { onAction }
}
