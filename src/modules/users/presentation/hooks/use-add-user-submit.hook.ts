import { useCallback, useMemo } from 'react'
import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { useUserStore } from '../stores/user.store'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import type { UserWithFiles } from '../../domain/types/user-with-files'
import { extractOperationId } from '@/modules/system/presentation/utils/export-operation-id.util'
import { usePathname } from 'next/navigation'

export function useAddUserSubmit() {
  const { addUser, getUsers } = useUserStore()
  const pathname = usePathname()
  const operationId = useMemo(() => extractOperationId(pathname), [pathname])

  const onAction = useCallback(
    async (data: UserWithFiles, onSuccess: VoidFunction): Promise<void> => {
      try {
        await addUser(data, operationId)
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
