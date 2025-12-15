import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { usePatchGroupStatusMenuContext } from '../contexts/patch-group-status-menu.context'

export function usePatchGroupStatusMenuTrigger() {
  const { open: openDialog } = usePatchGroupStatusMenuContext()

  const loadPatchGroupStatusOpenDialog = () => {
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

  return { loadPatchGroupStatusOpenDialog }
}
