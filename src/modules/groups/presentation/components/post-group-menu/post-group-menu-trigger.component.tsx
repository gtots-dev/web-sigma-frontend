'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { MapPlus } from 'lucide-react'
import { usePostGroupMenuTrigger } from '../../hooks/use-post-group-menu-trigger.hook'

export function PostGroupMenuTriggerComponent() {
  const { loadPostGroupOpenDialog } = usePostGroupMenuTrigger()
  return (
    <Button
      variant="primary"
      className="w-full sm:w-auto"
      onClick={loadPostGroupOpenDialog}
    >
      <MapPlus />
      <span className="truncate">Adicionar Grupo</span>
    </Button>
  )
}
