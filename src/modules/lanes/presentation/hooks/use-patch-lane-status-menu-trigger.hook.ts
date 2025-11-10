import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { useDialog } from '../components/patch-lane-menu/patch-lane-status-menu-provider.component'

export function usePatchLaneStatusMenuTrigger() {
  const { open: openDialog } = useDialog()

  const loadPatchLaneStatusOpenDialog = () => {
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

  return { loadPatchLaneStatusOpenDialog }
}
