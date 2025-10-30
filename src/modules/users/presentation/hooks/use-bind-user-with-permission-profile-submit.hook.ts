'use client'

import { useCallback } from 'react'
import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import type { PermissionsProfileIdsWithUserIdInterface } from '../../domain/interfaces/permissions-profile-ids-with-user-id.interface'
import { usePermissionProfileWithUserStore } from '../stores/user-permission-profile.store'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { useParams } from 'next/navigation'

export function useBindUserWithPermissionProfileSubmit() {
  const { putUserPermissionProfileAllInOne } =
    usePermissionProfileWithUserStore()
  const { operationId }: UrlParams = useParams()

  const onAction = useCallback(
    async (
      {
        profiles,
        perm_profile_id: selectedPermissionProfile,
        user_id: userId
      }: PermissionsProfileIdsWithUserIdInterface,
      onSuccess?: VoidFunction
    ): Promise<void> => {
      try {
        const listSelectedProfiles = selectedPermissionProfile.map(
          (perm_profile_id) => {
            const existing = profiles.find(
              (p) => p.perm_profile_id === perm_profile_id
            )
            return {
              perm_profile_id,
              contract_ids: existing?.contract_ids?.length
                ? existing.contract_ids
                : []
            }
          }
        )

        await putUserPermissionProfileAllInOne(
          { operationId, userId },
          {
            profiles: listSelectedProfiles
          }
        )

        toast({
          title: 'Perfis de permissão vinculados com sucesso!',
          description: `Os perfis selecionados foram atribuídos ao usuário.`,
          variant: 'success'
        })
        onSuccess?.()
      } catch (error) {
        if (error instanceof HttpResponseError) {
          toast({
            title: 'Erro ao vincular perfis de permissão',
            description:
              'Não foi possível vincular os perfis ao usuário. Tente novamente ou entre em contato com o suporte.',
            variant: 'destructive'
          })
        }
      }
    },
    [putUserPermissionProfileAllInOne]
  )
  return { onAction }
}
