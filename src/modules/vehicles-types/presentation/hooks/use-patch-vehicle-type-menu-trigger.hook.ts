import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { usePatchVehicleTypeMenuContext } from '../contexts/patch-vehicle-type-menu.context'

export function usePatchVehicleTypeMenuTrigger() {
  const { open: openDialog } = usePatchVehicleTypeMenuContext()

  const loadPatchVehicleTypeOpenDialog = () => {
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

  return { loadPatchVehicleTypeOpenDialog }
}
