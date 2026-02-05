'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { usePatchUserMenuTrigger } from '../../hooks/use-patch-user-menu-trigger.hook'

export function EditUserMenuTriggerComponent() {
  const { loadUserPatchOpenDialog } = usePatchUserMenuTrigger()
  return (
    <Button
      onClick={loadUserPatchOpenDialog}
      className="justify-start w-full h-auto cursor-pointer p-1.5 ps-3 rounded-none text-sm disabled:bg-muted-foreground [&>svg]:size-4 [&>svg]:shrink-0 shadow-none"
    >
      Editar
    </Button>
  )
}
