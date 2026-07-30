'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { useInfractionsMenuTrigger } from '../../hooks/use-infractions-menu-trigger.hook'
import { useInfractionGrid } from '../infractions-grid'

export function InfractionsMenuTriggerComponent() {
  const { loadPatchPointOpenDialog } = useInfractionsMenuTrigger()
  const infraction = useInfractionGrid()

  return (
    <Button
      className="justify-start w-full h-auto cursor-pointer p-1.5 ps-3 rounded-none text-sm disabled:bg-muted-foreground [&>svg]:size-4 [&>svg]:shrink-0 shadow-none"
      onClick={() => loadPatchPointOpenDialog(infraction)}
    >
      Editar
    </Button>
  )
}
