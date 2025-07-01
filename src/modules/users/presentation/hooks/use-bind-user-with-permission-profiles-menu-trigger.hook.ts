import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { useDialog } from '../components/bind-user-with-permission-profiles-menu/bind-user-with-permission-profiles-menu-provider.component'

export function useBindUserWithPermissionProfilesMenuTrigger() {
  const { open: openDialog } = useDialog()

  const loadUserWithPermissionProfileBindOpenDialog = () => {
    queueMicrotask(async () => {
      try {
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
