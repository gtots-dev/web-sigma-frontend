import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { useViewMorePointMenuContext } from '../contexts/view-more-point-menu.context'
import { useLaneStore } from '@/modules/lanes/presentation/stores/lanes.store'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { useParams } from 'next/navigation'

export function useViewMorePointMenuTrigger() {
  const { open: openDialog } = useViewMorePointMenuContext()
  const { getContractLanes } = useLaneStore()
  const { operationId, contractId }: UrlParams = useParams()

  const loadViewMorePointOpenDialog = () => {
    queueMicrotask(async () => {
      try {
        await getContractLanes({ operationId, contractId })
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

  return { loadViewMorePointOpenDialog }
}
