'use client'

import { RotateCcw, Target } from 'lucide-react'
import { useMonitoringContext } from '../monitoring/monitoring-context.component'
import { useSafeMonitoringMapContext } from '../monitoring-map/monitoring-map-context.component'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/modules/shared/presentation/components/shadcn/tooltip'

export function MonitoringControlsResetView() {
  const { offset, resetView, mode } = useMonitoringContext()
  const mapContext = useSafeMonitoringMapContext()

  const isMapMode = mode === 'map'
  const isPannedAway = isMapMode
    ? (mapContext?.isMapPanned ?? false)
    : Math.abs(offset.x) > 2 || Math.abs(offset.y) > 2

  const handleResetView = () => {
    if (isMapMode) {
      mapContext?.resetMapCenter()
    } else {
      resetView()
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={isPannedAway ? 'primary' : 'outline'}
          size="icon"
          onClick={handleResetView}
          className={`relative h-10 w-10 sm:h-9 sm:w-9 rounded-xl sm:rounded-lg transition-all duration-200 active:scale-95 ${
            isPannedAway
              ? 'bg-primary-600 text-white shadow-sm hover:bg-primary-600/90'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {isPannedAway ? (
            <Target className="w-5 h-5 sm:w-4 sm:h-4 shrink-0" />
          ) : (
            <RotateCcw className="w-5 h-5 sm:w-4 sm:h-4 shrink-0" />
          )}
          {isPannedAway && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3 sm:h-2.5 sm:w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 sm:h-2.5 sm:w-2.5 bg-sky-500"></span>
            </span>
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="top" className="text-xs font-medium">
        {isPannedAway
          ? 'Restaurar Ponto Central Origem (Alt + 0)'
          : 'Ponto Central Já Centralizado (Alt + 0)'}
      </TooltipContent>
    </Tooltip>
  )
}
