'use client'

import { List } from 'lucide-react'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import type { SyntheticEvent } from 'react'

interface MonitoringLegendTriggerMinimizedProps {
  onExpand: () => void
  stopPropagation: (e: SyntheticEvent) => void
}

export function MonitoringLegendTriggerMinimized({
  onExpand,
  stopPropagation
}: MonitoringLegendTriggerMinimizedProps) {
  return (
    <div
      onPointerDown={stopPropagation}
      onMouseDown={stopPropagation}
      onWheel={stopPropagation}
      onTouchStart={stopPropagation}
    >
      <Button
        variant="outline"
        size="icon"
        onClick={onExpand}
        title="Mostrar legendas"
      >
        <List size={14} className="text-muted-foreground" />
      </Button>
    </div>
  )
}
