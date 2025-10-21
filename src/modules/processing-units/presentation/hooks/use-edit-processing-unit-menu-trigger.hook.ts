import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { useDialog } from '../components/edit-processing-unit-menu/edit-processing-unit-menu-provider.component'

export function useEditProcessingUnitMenuTrigger() {
  const { open: openDialog } = useDialog()

  const loadUserEditProcessingUnitOpenDialog = () => {
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

  return { loadUserEditProcessingUnitOpenDialog }
}
