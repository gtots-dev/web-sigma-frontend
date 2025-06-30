import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { useDialog } from '../components/edit-permission-profile-menu/edit-permission-profile-menu-provider.component'
import { usePermissionProfileStore } from '../stores/permission-profile.store'
import { useTablePermissionProfile } from '../contexts/table-permission-profiles.context'

export function useEditPermissionProfileMenuTrigger() {
  const { open: openDialog } = useDialog()
  const { id: permissionProfileId } = useTablePermissionProfile()
  const { getFeatures } = usePermissionProfileStore()

  const loadPermissionProfileEditOpenDialog = () => {
    queueMicrotask(async () => {
      try {
        await getFeatures(permissionProfileId)
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

  return { loadPermissionProfileEditOpenDialog }
}
