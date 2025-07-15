'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { useEditUserMenuTrigger } from '../../hooks/use-edit-user-menu-trigger.hook'

export function EditUserMenuTriggerComponent() {
  const { loadUserEditOpenDialog } = useEditUserMenuTrigger()
  return (
    <Button
      onClick={loadUserEditOpenDialog}
      className="justify-start w-full h-auto cursor-pointer p-1.5 ps-3 rounded-none text-sm disabled:bg-muted-foreground [&>svg]:size-4 [&>svg]:shrink-0 shadow-none"
    >
      Editar
    </Button>
  )
}
