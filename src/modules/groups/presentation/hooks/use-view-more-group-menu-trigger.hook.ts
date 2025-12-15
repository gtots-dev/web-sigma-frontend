import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { useViewMoreGroupMenuContext } from '../contexts/view-more-group-menu.context'
import { useLaneStore } from '@/modules/lanes/presentation/stores/lanes.store'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { useParams } from 'next/navigation'
import { usePointStore } from '@/modules/points/presentation/stores/point.store'

export function useViewMoreGroupMenuTrigger() {
  const { open: openDialog } = useViewMoreGroupMenuContext()
  const { getContractLanes } = useLaneStore()
  const { getPoints } = usePointStore()
  const { operationId, contractId }: UrlParams = useParams()

  const loadViewMoreGroupOpenDialog = () => {
    queueMicrotask(async () => {
      try {
        await Promise.all([
          getContractLanes({ operationId, contractId }),
          getPoints({ operationId, contractId })
        ])
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

  return { loadViewMoreGroupOpenDialog }
}
