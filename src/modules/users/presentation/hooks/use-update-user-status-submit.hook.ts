import { useCallback } from 'react'
import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { useUserStore } from '../stores/user.store'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import type { UserEnableAndDisableInterface } from '../../domain/interfaces/user-enable-and-disable.interface'

export function usePutUserStatusSubmit() {
  const { getUsers, updateUserStatus } = useUserStore()
  const onAction = useCallback(
    async (
      userStatus: UserEnableAndDisableInterface,
      onSuccess: VoidFunction
    ): Promise<void> => {
      try {
        await updateUserStatus(userStatus)
        await getUsers()
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
    [getUsers, updateUserStatus]
  )

  return { onAction }
}
