'use client'

import { CircleDot, LayoutGrid, MapPin } from 'lucide-react'
import { useMonitoringContext } from '../monitoring/monitoring-context.component'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/modules/shared/presentation/components/shadcn/tooltip'

export function MonitoringControlsModeToggle() {
  const { mode, setMode } = useMonitoringContext()

  return (
    <div className="flex items-center gap-1 border border-border/80 rounded-xl sm:rounded-lg bg-muted/50 p-1 shadow-2xs w-full sm:w-auto justify-stretch sm:justify-start">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setMode('hex')}
            className={`flex-1 sm:flex-initial h-10 min-h-[40px] sm:h-8 sm:min-h-[32px] px-4 sm:px-3 text-xs font-medium gap-2 sm:gap-1.5 rounded-lg sm:rounded-md transition-all duration-200 active:scale-95 ${
              mode === 'hex'
                ? 'bg-primary-600 text-white hover:bg-primary-600/90 hover:text-white font-semibold shadow-xs'
                : 'text-muted-foreground hover:bg-accent hover:text-foreground'
            }`}
          >
            <CircleDot className="w-5 h-5 sm:w-3.5 sm:h-3.5 shrink-0" />
            <span className="inline">Hex</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top" className="text-xs font-medium">
          Modo Hexagonal (Alt + M)
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setMode('grid')}
            className={`flex-1 sm:flex-initial h-10 min-h-[40px] sm:h-8 sm:min-h-[32px] px-4 sm:px-3 text-xs font-medium gap-2 sm:gap-1.5 rounded-lg sm:rounded-md transition-all duration-200 active:scale-95 ${
              mode === 'grid'
                ? 'bg-primary-600 text-white hover:bg-primary-600/90 hover:text-white font-semibold shadow-xs'
                : 'text-muted-foreground hover:bg-accent hover:text-foreground'
            }`}
          >
            <LayoutGrid className="w-5 h-5 sm:w-3.5 sm:h-3.5 shrink-0" />
            <span className="inline">Grid</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top" className="text-xs font-medium">
          Modo Grade (Alt + M)
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setMode('map')}
            className={`flex-1 sm:flex-initial h-10 min-h-[40px] sm:h-8 sm:min-h-[32px] px-4 sm:px-3 text-xs font-medium gap-2 sm:gap-1.5 rounded-lg sm:rounded-md transition-all duration-200 active:scale-95 ${
              mode === 'map'
                ? 'bg-primary-600 text-white hover:bg-primary-600/90 hover:text-white font-semibold shadow-xs'
                : 'text-muted-foreground hover:bg-accent hover:text-foreground'
            }`}
          >
            <MapPin className="w-5 h-5 sm:w-3.5 sm:h-3.5 shrink-0" />
            <span className="inline">Mapa</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top" className="text-xs font-medium">
          Modo Mapa Operacional (Alt + M)
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
