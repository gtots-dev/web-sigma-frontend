import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { usePostGroupMenuContext } from '../contexts/post-group-menu.context'

export function usePostGroupMenuTrigger() {
  const { open: openDialog } = usePostGroupMenuContext()

  const loadPostGroupOpenDialog = () => {
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

  return { loadPostGroupOpenDialog }
}
