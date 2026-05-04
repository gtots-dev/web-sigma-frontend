'use client'

import { useCallback } from 'react'
import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import type { PermissionProfileInterface } from '../../domain/interfaces/permission-profiles.interface'
import { usePermissionProfileStore } from '../stores/permission-profile.store'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { useParams } from 'next/navigation'
import { useTwoFactorChallenge } from '@/modules/two-factor/presentation/contexts/two-factor-challenge.context'

export type ExtendedPermissionProfile = PermissionProfileInterface & {
  features: number[]
}

export function useAddPermissionProfileSubmit() {
  const { operationId }: UrlParams = useParams()
  const { addPermissionProfileAndFeatures, getPermissionProfiles } =
    usePermissionProfileStore()
  const { challenge } = useTwoFactorChallenge()
  const onAction = useCallback(
    async (
      permissionProfileForm: ExtendedPermissionProfile,
      onSuccess: VoidFunction
    ): Promise<void> => {
      const twoFactorCode = await challenge()
      if (!twoFactorCode) return

      try {
        await addPermissionProfileAndFeatures(
          { operationId },
          {
            perm_profile_name: permissionProfileForm.name,
            perm_profile_description: permissionProfileForm.description,
            feature_id: permissionProfileForm.features
          }
        )
        await getPermissionProfiles({ operationId })
        toast({
          title: 'Perfil de permissão adicionado com sucesso!',
          variant: 'success'
        })
        onSuccess?.()
      } catch (error) {
        if (error instanceof HttpResponseError) {
          toast({
            title: 'Erro ao cadastrar o Perfil de permissão',
            description: error.message,
            variant: 'destructive'
          })
        }
      }
    },
    [addPermissionProfileAndFeatures, getPermissionProfiles, operationId, challenge]
  )

  return { onAction }
}
