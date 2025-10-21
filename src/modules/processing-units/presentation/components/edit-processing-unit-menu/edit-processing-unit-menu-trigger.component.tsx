'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { useEditProcessingUnitMenuTrigger } from '../../hooks/use-edit-processing-unit-menu-trigger.hook'

export function EditProcessingUnitsMenuTriggerComponent() {
  const { loadUserEditProcessingUnitOpenDialog } =
    useEditProcessingUnitMenuTrigger()
  return (
    <Button
      className="justify-start w-full h-auto cursor-pointer p-1.5 ps-3 rounded-none text-sm disabled:bg-muted-foreground [&>svg]:size-4 [&>svg]:shrink-0 shadow-none"
      onClick={loadUserEditProcessingUnitOpenDialog}
    >
      Editar
    </Button>
  )
}
