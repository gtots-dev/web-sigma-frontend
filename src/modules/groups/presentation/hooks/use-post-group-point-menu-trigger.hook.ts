import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { usePostGroupPointMenuContext } from '../contexts/post-group-point-menu.context'
import { usePointStore } from '@/modules/points/presentation/stores/point.store'
import { useParams } from 'next/navigation'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export function usePostGroupPointMenuTrigger() {
  const { open: openDialog } = usePostGroupPointMenuContext()
  const { getPoints } = usePointStore()
  const { operationId, contractId }: UrlParams = useParams()

  const loadPostGroupPointOpenDialog = () => {
    queueMicrotask(async () => {
      try {
        await getPoints({ operationId, contractId })
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

  return { loadPostGroupPointOpenDialog }
}
