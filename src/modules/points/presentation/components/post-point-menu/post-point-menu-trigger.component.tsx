'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { MapPinPlus } from 'lucide-react'
import { usePostPointMenuTrigger } from '../../hooks/use-post-point-menu-trigger.hook'

export function PostPointMenuTriggerComponent() {
  const { loadPostPointOpenDialog } = usePostPointMenuTrigger()
  return (
    <Button
      variant="primary"
      className="w-full sm:w-auto"
      onClick={loadPostPointOpenDialog}
    >
      <MapPinPlus />
      <span className="truncate">Adicionar Ponto</span>
    </Button>
  )
}
