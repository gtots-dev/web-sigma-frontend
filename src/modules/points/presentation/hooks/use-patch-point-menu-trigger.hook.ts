import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { usePatchPointMenuContext } from '../contexts/patch-point-menu.context'

export function usePatchPointMenuTrigger() {
  const { open: openDialog } = usePatchPointMenuContext()

  const loadPatchPointOpenDialog = () => {
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

  return { loadPatchPointOpenDialog }
}
