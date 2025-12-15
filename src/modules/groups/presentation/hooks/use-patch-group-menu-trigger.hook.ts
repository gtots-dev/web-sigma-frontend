import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { usePatchGroupMenuContext } from '../contexts/patch-group-menu.context'

export function usePatchGroupMenuTrigger() {
  const { open: openDialog } = usePatchGroupMenuContext()

  const loadPatchGroupOpenDialog = () => {
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

  return { loadPatchGroupOpenDialog }
}
