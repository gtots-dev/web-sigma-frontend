import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { useDialog } from '../components/bind-user-with-permission-profiles-menu/bind-user-with-permission-profiles-menu-provider.component'
import { usePermissionProfileWithUserStore } from '../stores/user-permission-profile.store'
import { useTableUser } from '../contexts/table-user.context'
import { usePermissionProfileStore } from '@/modules/permissions/presentation/stores/permission-profile.store'

export function useBindUserWithPermissionProfilesMenuTrigger() {
  const { open: openDialog } = useDialog()
  const { id: userId } = useTableUser()
  const { getUserWithPermissionProfiles } = usePermissionProfileWithUserStore()
  const { getPermissionProfiles } = usePermissionProfileStore()

  const loadUserWithPermissionProfileBindOpenDialog = () => {
    queueMicrotask(async () => {
      try {
        await Promise.all([
          getUserWithPermissionProfiles(userId),
          getPermissionProfiles()
        ])
        openDialog()
      } catch {
        toast({
          variant: 'destructive',
          title: 'Erro ao carregar o formulário',
          description:
            'Não foi possível abrir o formulário no momento. Tente novamente ou entre em contato com o suporte caso o problema persista.'
        })
      }
    })
  }

  return { loadUserWithPermissionProfileBindOpenDialog }
}
