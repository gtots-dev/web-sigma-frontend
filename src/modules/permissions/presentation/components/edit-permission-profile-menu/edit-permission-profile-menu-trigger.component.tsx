'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { useDialog } from './edit-permission-profile-menu-provider.component'

export function EditPermissionProfileMenuTriggerComponent() {
  const { open } = useDialog()
  return (
    <Button
      className="justify-start w-full h-auto cursor-pointer p-1.5 ps-3 rounded-none text-sm disabled:bg-muted-foreground [&>svg]:size-4 [&>svg]:shrink-0 shadow-none"
      onClick={open}
    >
      Editar
    </Button>
  )
}
