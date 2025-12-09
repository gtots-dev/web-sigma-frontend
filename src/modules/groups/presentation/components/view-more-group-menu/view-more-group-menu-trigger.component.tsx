'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { useViewMoreGroupMenuTrigger } from '../../hooks/use-view-more-group-menu-trigger.hook'

export function ViewMoreGroupMenuTriggerComponent() {
  const { loadViewMoreGroupOpenDialog } = useViewMoreGroupMenuTrigger()
  return (
    <Button
      className="justify-start w-full h-auto cursor-grouper p-1.5 ps-3 rounded-none text-sm disabled:bg-muted-foreground [&>svg]:size-4 [&>svg]:shrink-0 shadow-none"
      onClick={loadViewMoreGroupOpenDialog}
    >
      Ver Mais
    </Button>
  )
}
