import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { usePatchViolationMenuContext } from '../contexts/patch-violation-menu.context'

export function usePatchViolationMenuTrigger() {
  const { open: openDialog } = usePatchViolationMenuContext()

  const loadPatchViolationOpenDialog = () => {
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

  return { loadPatchViolationOpenDialog }
}
