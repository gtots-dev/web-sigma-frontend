import { useCallback } from 'react'
import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { usePermissionProfileWithUserStore } from '../stores/user-permission-profile.store'
import {
  getProfilesToAddUtil,
  getProfilesToDeleteUtil
} from '../utils/permissions-profiles-diff.util'
import type { PermissionsProfileIdsWithUserIdInterface } from '../../domain/interfaces/permissions-profile-ids-with-user-id.interface'

export function useBindUserWithPermissionProfileSubmit() {
  const {
    bindUserWithPermissionProfile,
    deleteBindUserWithPermissionProfile,
    userWithPermissionProfiles
  } = usePermissionProfileWithUserStore()

  const onAction = useCallback(
    async (
      {
        user_id: userId,
        perm_profile_id: selectedPermissionsProfiles
      }: PermissionsProfileIdsWithUserIdInterface,
      onSuccess: VoidFunction
    ): Promise<void> => {
      try {
        const toDelete = getProfilesToDeleteUtil(
          userWithPermissionProfiles,
          selectedPermissionsProfiles
        )
        const toAdd = getProfilesToAddUtil(
          userWithPermissionProfiles,
          selectedPermissionsProfiles
        )
        await Promise.all(
          toDelete.map((bindingId) =>
            deleteBindUserWithPermissionProfile(bindingId, userId)
          )
        )
        if (toAdd.length > 0) await bindUserWithPermissionProfile(toAdd, userId)
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
    [
      bindUserWithPermissionProfile,
      deleteBindUserWithPermissionProfile,
      userWithPermissionProfiles
    ]
  )

  return { onAction }
}
