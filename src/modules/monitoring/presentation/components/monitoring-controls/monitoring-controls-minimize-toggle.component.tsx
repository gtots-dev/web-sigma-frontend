'use client'

import { PanelBottomClose } from 'lucide-react'
import { useMonitoringContext } from '../monitoring/monitoring-context.component'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/modules/shared/presentation/components/shadcn/tooltip'

export function MonitoringControlsMinimizeToggle() {
  const { setIsControlsMinimized } = useMonitoringContext()

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsControlsMinimized(true)}
          className="hidden sm:inline-flex h-10 w-10 sm:h-9 sm:w-9 rounded-xl sm:rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors active:scale-95"
        >
          <PanelBottomClose className="w-5 h-5 sm:w-4 sm:h-4 shrink-0" />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="top" className="text-xs font-medium">
        Minimizar Controles
      </TooltipContent>
    </Tooltip>
  )
}
