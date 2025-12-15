'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { usePostGroupSubgroupMenuTrigger } from '../../hooks/use-post-group-subgroup-menu-trigger.hook'

export function PostGroupSubgroupMenuTriggerComponent() {
  const { loadPostGroupSubgroupOpenDialog } = usePostGroupSubgroupMenuTrigger()
  return (
    <Button
      className="justify-start w-full h-auto cursor-grouper p-1.5 ps-3 rounded-none text-sm disabled:bg-muted-foreground [&>svg]:size-4 [&>svg]:shrink-0 shadow-none"
      onClick={loadPostGroupSubgroupOpenDialog}
    >
      Vincular Outros Grupos
    </Button>
  )
}
