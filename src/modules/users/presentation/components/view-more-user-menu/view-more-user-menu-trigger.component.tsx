'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { useViewMoreUserMenuTrigger } from '../../hooks/use-view-more-user-menu-trigger.hook'

export function ViewMoreUserMenuTriggerComponent() {
  const { loadUserFilesAndOpenDialog } = useViewMoreUserMenuTrigger()
  return (
    <Button
      className="justify-start w-full h-auto cursor-pointer p-1.5 ps-3 rounded-none text-sm disabled:bg-muted-foreground [&>svg]:size-4 [&>svg]:shrink-0 shadow-none"
      onClick={loadUserFilesAndOpenDialog}
    >
      Ver Mais
    </Button>
  )
}
