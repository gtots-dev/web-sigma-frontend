import { useCallback } from 'react'
import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { usePermissionProfileStore } from '../stores/permission-profile.store'
import type { PermissionProfileEnableAndDisableInterface } from '../../domain/interfaces/permission-profile-enable-and-disable.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { useParams } from 'next/navigation'
import { useTwoFactorChallenge } from '@/modules/two-factor/presentation/contexts/two-factor-challenge.context'

export function usePatchPermissionProfileStatusSubmit() {
  const { operationId }: UrlParams = useParams()
  const { getPermissionProfiles, updatePermissionProfileStatus } =
    usePermissionProfileStore()
  const { challenge } = useTwoFactorChallenge()
  const onAction = useCallback(
    async (
      permissionProfileStatus: PermissionProfileEnableAndDisableInterface,
      onSuccess: VoidFunction
    ): Promise<void> => {
      const twoFactorCode = await challenge()
      if (!twoFactorCode) return

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
            description: error.message,
            variant: 'destructive'
          })
        }
      }
    },
    [getPermissionProfiles, updatePermissionProfileStatus, operationId, challenge]
  )

  return { onAction }
}
