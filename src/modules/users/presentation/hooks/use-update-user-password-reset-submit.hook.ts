import { useCallback } from 'react'
import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { useUserStore } from '../stores/user.store'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import type { UserPasswordResetInterface } from '../../domain/interfaces/user-password-reset.interface'

export function usePutUserPasswordResetSubmit() {
  const { getUsers } = useUserStore()

  const onAction = useCallback(
    async (
      userPasswordReset: UserPasswordResetInterface,
      onSuccess: VoidFunction
    ): Promise<void> => {
      try {
        await getUsers()
        toast({
          title: 'Usuário atualizado com sucesso!',
          variant: 'success',
          description: JSON.stringify(userPasswordReset)
        })
        onSuccess?.()
      } catch (error) {
        if (error instanceof HttpResponseError) {
          toast({
            title: 'Erro ao atualizar usuário',
            description:
              'Ocorreu um problema ao tentar atualizar o usuário. Verifique e tente novamente',
            variant: 'destructive'
          })
        }
      }
    },
    [getUsers]
  )

  return { onAction }
}
