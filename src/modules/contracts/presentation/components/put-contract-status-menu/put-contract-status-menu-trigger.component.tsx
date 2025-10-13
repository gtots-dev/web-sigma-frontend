'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { usePutContractStatusMenuTrigger } from '../../hooks/use-put-contract-status-menu-trigger.hook'

export function PutContractStatusMenuTriggerComponent() {
  const { loadPutContractStatusOpenDialog } = usePutContractStatusMenuTrigger()
  return (
    <Button
      className="justify-start w-full h-auto cursor-pointer p-1.5 ps-3 rounded-none text-sm disabled:bg-muted-foreground [&>svg]:size-4 [&>svg]:shrink-0 shadow-none"
      onClick={loadPutContractStatusOpenDialog}
    >
      Habilitar/Desabilitar
    </Button>
  )
}
