import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { useInfractionsMenuContext } from '../contexts/infractions-menu.context'
import type { Infraction } from '../../domain/interfaces/infractions-websocket.interface'

export function useInfractionsMenuTrigger() {
  const { open: openDialog } = useInfractionsMenuContext()

  const loadPatchPointOpenDialog = (infraction: Infraction) => {
    queueMicrotask(async () => {
      try {
        openDialog(infraction)
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

