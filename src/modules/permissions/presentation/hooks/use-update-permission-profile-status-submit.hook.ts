import { useCallback } from 'react'
import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { usePermissionProfileStore } from '../stores/permission-profile.store'
import type { PermissionProfileEnableAndDisableInterface } from '../../domain/interfaces/permission-profile-enable-and-disable.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { useParams } from 'next/navigation'

export function usePatchPermissionProfileStatusSubmit() {
  const { operationId }: UrlParams = useParams()
  const { getPermissionProfiles, updatePermissionProfileStatus } =
    usePermissionProfileStore()
  const onAction = useCallback(
    async (
      permissionProfileStatus: PermissionProfileEnableAndDisableInterface,
      onSuccess: VoidFunction
    ): Promise<void> => {
      try {
        await updatePermissionProfileStatus(
          {
            operationId,
            permissionProfileId: String(permissionProfileStatus.id)
          },
          permissionProfileStatus
        )
        await getPermissionProfiles({ operationId })
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
    [getPermissionProfiles, updatePermissionProfileStatus, operationId]
  )

  return { onAction }
}
