'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { useDialog } from './edit-user-menu-provider.component'

export function EditUserMenuTriggerComponent() {
  const { open: openDialog } = useDialog()
  return (
    <Button
      onClick={() => queueMicrotask(() => openDialog())}
      className="justify-start w-full h-auto cursor-pointer p-1.5 ps-3 rounded-none text-sm disabled:bg-muted-foreground [&>svg]:size-4 [&>svg]:shrink-0 shadow-none"
    >
      Editar
    </Button>
  )
}
