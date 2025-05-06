import { useCallback } from 'react'
import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import type { UserEntity } from '@/modules/users/domain/entities/user.entity'
import { useUserStore } from '../stores/user.store'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'

export function useEditUserSubmit() {
  const { updateUser, getUsers } = useUserStore()

  const onAction = useCallback(
    async (data: UserEntity) => {
      try {
        await updateUser(data)
        await getUsers()
        toast({
          title: 'Usuário atualizado com sucesso!',
          variant: 'success'
        })
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
    [updateUser, getUsers]
  )

  return { onAction }
}
