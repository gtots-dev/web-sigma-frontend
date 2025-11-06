'use client'

import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { useDialog } from '../components/patch-processing-unit-status-menu/patch-processing-unit-status-menu-provider.component'

export function usePatchProcessingUnitStatusMenuTrigger() {
  const { open: openDialog } = useDialog()

  const loadPatchProcessingUnitStatusOpenDialog = () => {
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

  return { loadPatchProcessingUnitStatusOpenDialog }
}
