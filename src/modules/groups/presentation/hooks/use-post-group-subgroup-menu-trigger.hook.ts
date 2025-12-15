import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { usePostGroupSubgroupMenuContext } from '../contexts/post-group-subgroup-menu.context'
import { useParams } from 'next/navigation'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { useGroupStore } from '../stores/group.store'

export function usePostGroupSubgroupMenuTrigger() {
  const { open: openDialog } = usePostGroupSubgroupMenuContext()
  const { getGroups } = useGroupStore()
  const { operationId, contractId }: UrlParams = useParams()

  const loadPostGroupSubgroupOpenDialog = () => {
    queueMicrotask(async () => {
      try {
        await getGroups({ operationId, contractId })
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

  return { loadPostGroupSubgroupOpenDialog }
}
