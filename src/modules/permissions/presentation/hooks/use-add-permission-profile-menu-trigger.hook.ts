import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { useDialog } from '../components/add-permission-profile-menu/add-permission-profile-menu-provider.component'

export function useAddPermissionProfileMenuTrigger() {
  const { open: openDialog } = useDialog()

  const loadPermissionProfileAddOpenDialog = () => {
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

  return { loadPermissionProfileAddOpenDialog }
}
