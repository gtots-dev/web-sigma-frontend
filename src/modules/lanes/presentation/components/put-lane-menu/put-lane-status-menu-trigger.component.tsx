'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { usePutLaneStatusMenuTrigger } from '../../hooks/use-put-lane-status-menu-trigger.hook'

export function PutLaneStatusMenuTriggerComponent() {
  const { loadPutLaneStatusOpenDialog } =
    usePutLaneStatusMenuTrigger()
  return (
    <Button
      className="justify-start w-full h-auto cursor-pointer p-1.5 ps-3 rounded-none text-sm disabled:bg-muted-foreground [&>svg]:size-4 [&>svg]:shrink-0 shadow-none"
      onClick={loadPutLaneStatusOpenDialog}
    >
      Habilitar/Desabilitar
    </Button>
  )
}
