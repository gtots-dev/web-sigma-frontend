import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { useDialog } from '../components/add-user-files-menu/add-user-files-menu-provider.component'

export function usePostUserFilesMenuTrigger() {
  const { open: openDialog } = useDialog()

  const loadUserPostFilesOpenDialog = () => {
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

  return { loadUserPostFilesOpenDialog }
}
