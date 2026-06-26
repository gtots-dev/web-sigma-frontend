'use client'

import type { ReactNode } from 'react'
import { BarChart3 } from 'lucide-react'
import { useMonitoringStats } from '../../hooks/use-monitoring-stats.hook'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/modules/shared/presentation/components/shadcn/popover'

interface MonitoringStatsTriggerMaximizedProps {
  children: ReactNode
}

export function MonitoringStatsTriggerMaximized({
  children
}: MonitoringStatsTriggerMaximizedProps) {
  const { stopPropagation } = useMonitoringStats()

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
            className="h-9 w-9 border border-zinc-200 dark:border-zinc-800"
            title="Ver estatísticas"
          >
            <BarChart3 size={16} className="text-muted-foreground" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          side="top"
          align="end"
          className="w-fit p-0 bg-card border border-zinc-200 dark:border-zinc-800 z-[110]"
        >
          {children}
        </PopoverContent>
      </Popover>
    </div>
  )
}
