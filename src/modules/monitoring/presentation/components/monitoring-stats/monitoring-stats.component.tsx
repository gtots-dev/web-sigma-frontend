'use client'

import { BarChart3 } from 'lucide-react'
import { useMonitoringContext } from '../monitoring/monitoring-context.component'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/modules/shared/presentation/components/shadcn/popover'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'

export function MonitoringStats() {
  const { totalCount, filteredCount, isMaximized } = useMonitoringContext()

  const statsContent = (
    <div className="flex items-center gap-3 p-1.5 select-none">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-primary-500/10 border border-primary-500/20 rounded-md">
          <span className="text-[10px] font-bold text-primary-500 tabular-nums">
            {filteredCount}
          </span>
          <span className="text-[9px] font-bold text-primary-500/80 uppercase tracking-tight">
            Exibidos
          </span>
        </div>

        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-muted/50 border border-border/50 rounded-md">
          <span className="text-[10px] font-bold text-muted-foreground tabular-nums">
            {totalCount}
          </span>
          <span className="text-[9px] font-bold text-muted-foreground/80 uppercase tracking-tight">
            Total
          </span>
        </div>
      </div>
    </div>
  )

  if (isMaximized) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 bg-card/60 backdrop-blur-md border-border/40 shadow-sm"
            title="Ver estatísticas"
          >
            <BarChart3 size={16} className="text-muted-foreground" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          side="top"
          align="end"
          className="w-fit p-0 bg-card/90 backdrop-blur-xl border-border/40 z-[200]"
        >
          {statsContent}
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <div className="absolute top-4 right-4 z-20 flex items-center bg-card/60 backdrop-blur-md border border-border/40 rounded-lg shadow-sm pointer-events-none animate-in fade-in slide-in-from-right-4 duration-300">
      {statsContent}
    </div>
  )
}
