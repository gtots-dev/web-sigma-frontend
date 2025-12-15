import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { usePostGroupLaneMenuContext } from '../contexts/post-group-lane-menu.context'
import { useLaneStore } from '@/modules/lanes/presentation/stores/lanes.store'
import { useParams } from 'next/navigation'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export function usePostGroupLaneMenuTrigger() {
  const { open: openDialog } = usePostGroupLaneMenuContext()
  const { getContractLanes } = useLaneStore()
  const { operationId, contractId }: UrlParams = useParams()

  const loadPostGroupLaneOpenDialog = () => {
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

  return { loadPostGroupLaneOpenDialog }
}
