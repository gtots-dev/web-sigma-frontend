import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { useTableUser } from '../contexts/table-user.context'
import { useUserFilesStore } from '../stores/user-files.store'
import { useDialog } from '../components/view-more-user-menu/view-more-user-menu-provider.component'
import { useParams } from 'next/navigation'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export function useViewMoreUserMenuTrigger() {
  const { open: openDialog } = useDialog()
  const { id: userId } = useTableUser()
  const { operationId }: UrlParams = useParams()
  const { getUserFiles } = useUserFilesStore()

  const loadUserFilesAndOpenDialog = () => {
    queueMicrotask(async () => {
      try {
        await getUserFiles({ operationId, userId: String(userId) })
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

  return { loadUserFilesAndOpenDialog }
}
