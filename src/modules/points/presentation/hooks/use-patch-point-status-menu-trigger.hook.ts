import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { usePatchPointStatusMenuContext } from '../contexts/patch-point-status-menu.context'

export function usePatchPointStatusMenuTrigger() {
  const { open: openDialog } = usePatchPointStatusMenuContext()

  const loadPatchPointStatusOpenDialog = () => {
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

  return { loadPatchPointStatusOpenDialog }
}
