import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { usePostVehicleTypeMenuContext } from '../contexts/post-vehicle-menu.context'

export function usePostVehicleTypeMenuTrigger() {
  const { open: openDialog } = usePostVehicleTypeMenuContext()

  const loadPostVehicleOpenDialog = () => {
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

  return { loadPostVehicleOpenDialog }
}
