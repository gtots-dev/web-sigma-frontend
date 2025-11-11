import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { useDialog } from '../components/bind-user-with-permission-profiles-menu/bind-user-with-permission-profiles-menu-provider.component'
import { usePermissionProfileWithUserStore } from '../stores/user-permission-profile.store'
import { useTableUser } from '../contexts/table-user.context'
import { usePermissionProfileStore } from '@/modules/permissions/presentation/stores/permission-profile.store'
import { useContractStore } from '@/modules/contracts/presentation/stores/contract.store'
import { useCallback } from 'react'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { useParams } from 'next/navigation'

interface UseBindUserWithPermissionProfilesMenuTriggerProps {
  isPermittedViewContracts: boolean
  isPermittedViewPermissionsProfile: boolean
}

export function useBindUserWithPermissionProfilesMenuTrigger({
  isPermittedViewContracts,
  isPermittedViewPermissionsProfile
}: UseBindUserWithPermissionProfilesMenuTriggerProps) {
  const { open: openDialog } = useDialog()
  const { id: userId } = useTableUser()
  const { operationId }: UrlParams = useParams()
  const {
    getUserWithPermissionProfiles,
    getUserPermissionProfilesContract,
    clearUserPermissionProfilesContract
  } = usePermissionProfileWithUserStore()
  const { getPermissionProfiles } = usePermissionProfileStore()
  const { getContracts } = useContractStore()

  const loadUserWithPermissionProfileBindOpenDialog = useCallback(async () => {
    try {
      clearUserPermissionProfilesContract()

      const { userWithPermissionProfiles } = await (async () => {
        const [userWithPermissionProfiles, permissionProfiles, contracts] =
          await Promise.all([
            isPermittedViewPermissionsProfile
              ? getUserWithPermissionProfiles({ operationId, userId })
              : null,
            isPermittedViewPermissionsProfile
              ? getPermissionProfiles({ operationId })
              : null,
            isPermittedViewContracts ? getContracts({ operationId }) : null
          ] as const)

        return { userWithPermissionProfiles, permissionProfiles, contracts }
      })()

      if (isPermittedViewPermissionsProfile && userWithPermissionProfiles) {
        await Promise.all(
          userWithPermissionProfiles.map(
            async ({ id: userPermissionProfile, user_id }) => {
              await getUserPermissionProfilesContract(
                user_id,
                userPermissionProfile
              )
            }
          )
        )
      }
      openDialog()
    } catch (error) {
      console.error(error)
      toast({
        variant: 'destructive',
        title: 'Erro ao carregar o formulário',
        description:
          'Não foi possível abrir o formulário no momento. Tente novamente ou entre em contato com o suporte caso o problema persista.'
      })
    }
  }, [
    userId,
    operationId,
    openDialog,
    getUserWithPermissionProfiles,
    getPermissionProfiles,
    getContracts,
    getUserPermissionProfilesContract,
    clearUserPermissionProfilesContract,
    isPermittedViewPermissionsProfile,
    isPermittedViewContracts
  ])

  return { loadUserWithPermissionProfileBindOpenDialog }
}
