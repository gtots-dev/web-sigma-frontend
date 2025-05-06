import { useCallback } from 'react'
import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import type { UserEntity } from '@/modules/users/domain/entities/user.entity'
import { useUserStore } from '../stores/user.store'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'

export function useAddUserSubmit() {
  const { addUser, getUsers } = useUserStore()

  const onAction = useCallback(
    async (data: UserEntity, onSuccess: VoidFunction): Promise<void> => {
      try {
        await addUser(data)
        await getUsers()
        toast({
          title: 'Usuário adicionado com sucesso!',
          variant: 'success'
        })
        onSuccess?.()
      } catch (error) {
        if (error instanceof HttpResponseError) {
          toast({
            title: 'Erro ao cadastrar o usuário',
            description:
              'Ocorreu um problema ao tentar cadastrar o usuário. Verifique e tente novamente',
            variant: 'destructive'
          })
        }
      }
    },
    [addUser, getUsers]
  )

  return { onAction }
}
