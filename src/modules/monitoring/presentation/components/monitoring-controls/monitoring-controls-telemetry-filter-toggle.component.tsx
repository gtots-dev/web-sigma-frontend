'use client'

import { ListFilter } from 'lucide-react'
import { useMonitoringContext } from '../monitoring/monitoring-context.component'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/modules/shared/presentation/components/shadcn/tooltip'

export function MonitoringControlsTelemetryFilterToggle() {
  const { isSidebarOpen, setIsSidebarOpen } = useMonitoringContext()

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={isSidebarOpen ? 'primary' : 'outline'}
          size="icon"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={`h-10 w-10 sm:h-9 sm:w-9 rounded-xl sm:rounded-lg transition-all duration-200 active:scale-95 ${
            isSidebarOpen
              ? 'bg-primary-600 text-white shadow-sm hover:bg-primary-600/90'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <ListFilter className="w-5 h-5 sm:w-4 sm:h-4 shrink-0" />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="top" className="text-xs font-medium">
        {isSidebarOpen ? 'Fechar Filtros de Telemetria (Alt + F)' : 'Abrir Filtros de Telemetria (Alt + F)'}
      </TooltipContent>
    </Tooltip>
  )
}
