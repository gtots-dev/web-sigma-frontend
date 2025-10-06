import { useCallback } from 'react'
import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { usePermissionProfileStore } from '../stores/permission-profile.store'
import type { PermissionProfileEnableAndDisableInterface } from '../../domain/interfaces/permission-profile-enable-and-disable.interface'

export function usePutPermissionProfileStatusSubmit() {
  const { getPermissionProfiles, updatePermissionProfileStatus } =
    usePermissionProfileStore()
  const onAction = useCallback(
    async (
      permissionProfileStatus: PermissionProfileEnableAndDisableInterface,
      onSuccess: VoidFunction
    ): Promise<void> => {
      try {
        await updatePermissionProfileStatus(permissionProfileStatus)
        await getPermissionProfiles()
        toast({
          title: 'Status da permissão foi alterada com sucesso!',
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
    [getPermissionProfiles, updatePermissionProfileStatus]
  )

  return { onAction }
}
