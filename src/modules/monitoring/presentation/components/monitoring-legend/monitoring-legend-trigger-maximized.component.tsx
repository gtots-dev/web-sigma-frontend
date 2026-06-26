'use client'

import { Info } from 'lucide-react'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/modules/shared/presentation/components/shadcn/popover'
import type { SyntheticEvent, ReactNode } from 'react'

interface MonitoringLegendTriggerMaximizedProps {
  content: ReactNode
  stopPropagation: (e: SyntheticEvent) => void
}

export function MonitoringLegendTriggerMaximized({
  content,
  stopPropagation
}: MonitoringLegendTriggerMaximizedProps) {
  return (
    <div
      onPointerDown={stopPropagation}
      onMouseDown={stopPropagation}
      onWheel={stopPropagation}
      onTouchStart={stopPropagation}
    >
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9"
            title="Ver legendas"
          >
            <Info size={16} className="text-muted-foreground" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          side="top"
          align="start"
          className="w-52 p-0 bg-card border border-zinc-200 dark:border-zinc-800 z-[110]"
        >
          {content}
        </PopoverContent>
      </Popover>
    </div>
  )
}
