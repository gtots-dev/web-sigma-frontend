import { useCallback } from 'react'
import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { usePermissionProfileWithUserStore } from '../stores/user-permission-profile.store'
import type { PermissionProfileWithUserInterface } from '@/modules/permissions/domain/interfaces/permission-profile-with-user.interface'
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
        perm_profile_id: permissionProfileIds
      }: PermissionsProfileIdsWithUserIdInterface,
      onSuccess: VoidFunction
    ): Promise<void> => {
      try {
        const currentProfileIds = userWithPermissionProfiles.map(
          ({ id }: PermissionProfileWithUserInterface) => id
        )
        const toDelete = currentProfileIds.filter(
          (id) => !permissionProfileIds.includes(id)
        )
        const toAdd = permissionProfileIds.filter(
          (id) => !currentProfileIds.includes(id)
        )
        await Promise.all([
          ...toDelete.map((id) =>
            deleteBindUserWithPermissionProfile(id, userId)
          ),
          toAdd.length > 0
            ? bindUserWithPermissionProfile(toAdd, userId)
            : Promise.resolve()
        ])

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
