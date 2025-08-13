import { useCallback } from 'react'
import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { usePermissionProfileStore } from '../stores/permission-profile.store'

export function usePutPermissionProfileStatusSubmit() {
  const { getPermissionProfiles } = usePermissionProfileStore()
  const onAction = useCallback(
    async (
      permissionProfileStatus: {
        enabled: boolean
        permissionProfileId: number
      },
      onSuccess: VoidFunction
    ): Promise<void> => {
      try {
        await getPermissionProfiles()
        toast({
          title: 'Status da permissão alterada com sucesso!',
          variant: 'success'
        })
        onSuccess?.()
      } catch (error) {
        if (error instanceof HttpResponseError) {
          toast({
            title: 'Erro ao alterar o status da permissão',
            description:
              'Ocorreu um problema ao tentar alterar o status. Verifique e tente novamente',
            variant: 'destructive'
          })
        }
      }
    },
    [getPermissionProfiles]
  )

  return { onAction }
}
