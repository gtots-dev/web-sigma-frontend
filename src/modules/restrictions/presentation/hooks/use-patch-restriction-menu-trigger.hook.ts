import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { usePatchRestrictionMenuContext } from '../contexts/patch-restriction-menu.context'

export function usePatchRestrictionMenuTrigger() {
  const { open: openDialog } = usePatchRestrictionMenuContext()

  const loadPatchRestrictionOpenDialog = () => {
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

  return { loadPatchRestrictionOpenDialog }
}
