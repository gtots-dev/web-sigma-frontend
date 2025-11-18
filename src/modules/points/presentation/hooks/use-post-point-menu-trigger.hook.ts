import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { usePostPointMenuContext } from '../contexts/post-point-menu.context'

export function usePostPointMenuTrigger() {
  const { open: openDialog } = usePostPointMenuContext()

  const loadPostPointOpenDialog = () => {
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

  return { loadPostPointOpenDialog }
}
