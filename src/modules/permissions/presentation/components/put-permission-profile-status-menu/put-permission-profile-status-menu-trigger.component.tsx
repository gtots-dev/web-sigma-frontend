'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { usePutPermissionProfileStatusMenuTrigger } from '../../hooks/use-put-permission-profile-status-menu-trigger.hook'

export function PutPermissionProfileStatusMenuTriggerComponent() {
  const { loadUserStatusOpenDialog } =
    usePutPermissionProfileStatusMenuTrigger()
  return (
    <Button
      className="justify-start w-full h-auto cursor-pointer p-1.5 ps-3 rounded-none text-sm disabled:bg-muted-foreground [&>svg]:size-4 [&>svg]:shrink-0 shadow-none"
      onClick={loadUserStatusOpenDialog}
    >
      Habilitar/Desabilitar
    </Button>
  )
}
