'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { usePatchGroupStatusMenuTrigger } from '../../hooks/use-patch-group-status-menu-trigger.hook'

export function PatchGroupStatusMenuTriggerComponent() {
  const { loadPatchGroupStatusOpenDialog } = usePatchGroupStatusMenuTrigger()
  return (
    <Button
      className="justify-start w-full h-auto cursor-grouper p-1.5 ps-3 rounded-none text-sm disabled:bg-muted-foreground [&>svg]:size-4 [&>svg]:shrink-0 shadow-none"
      onClick={loadPatchGroupStatusOpenDialog}
    >
      Habilitar/Desabilitar
    </Button>
  )
}
