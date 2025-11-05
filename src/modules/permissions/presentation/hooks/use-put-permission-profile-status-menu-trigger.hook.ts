import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { useDialog } from '../components/patch-permission-profile-status-menu/patch-permission-profile-status-menu-provider.component'

export function usePatchPermissionProfileStatusMenuTrigger() {
  const { open: openDialog } = useDialog()

  const loadUserStatusOpenDialog = () => {
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

  return { loadUserStatusOpenDialog }
}
