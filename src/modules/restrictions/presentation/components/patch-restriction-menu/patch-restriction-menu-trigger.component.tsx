'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { usePatchRestrictionMenuTrigger } from '../../hooks/use-patch-restriction-menu-trigger.hook'

export function PatchRestrictionMenuTriggerComponent() {
  const { loadPatchRestrictionOpenDialog } = usePatchRestrictionMenuTrigger()
  return (
    <Button
      className="justify-start w-full h-auto cursor-pointer p-1.5 ps-3 rounded-none text-sm disabled:bg-muted-foreground [&>svg]:size-4 [&>svg]:shrink-0 shadow-none"
      onClick={loadPatchRestrictionOpenDialog}
    >
      Editar
    </Button>
  )
}
