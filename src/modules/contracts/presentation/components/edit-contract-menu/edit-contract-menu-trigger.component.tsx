'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { useEditContractMenuTrigger } from '../../hooks/use-edit-contract-menu-trigger.hook'

export function EditContractMenuTriggerComponent() {
  const { loadUserEditContractOpenDialog } = useEditContractMenuTrigger()
  return (
    <Button
      className="justify-start w-full h-auto cursor-pointer p-1.5 ps-3 rounded-none text-sm disabled:bg-muted-foreground [&>svg]:size-4 [&>svg]:shrink-0 shadow-none"
      onClick={loadUserEditContractOpenDialog}
    >
      Editar
    </Button>
  )
}
