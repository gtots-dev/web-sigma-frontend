'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { usePostGroupPointMenuTrigger } from '../../hooks/use-post-group-point-menu-trigger.hook'

export function PostGroupPointMenuTriggerComponent() {
  const { loadPostGroupPointOpenDialog } = usePostGroupPointMenuTrigger()
  return (
    <Button
      className="justify-start w-full h-auto cursor-grouper p-1.5 ps-3 rounded-none text-sm disabled:bg-muted-foreground [&>svg]:size-4 [&>svg]:shrink-0 shadow-none"
      onClick={loadPostGroupPointOpenDialog}
    >
      Vincular Pontos
    </Button>
  )
}
