'use client'

import { Rows, Network, Circle, Square } from 'lucide-react'
import { useMonitoringContext } from '../monitoring/monitoring-context.component'
import { useSafeMonitoringMapContext } from '../monitoring-map/monitoring-map-context.component'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/modules/shared/presentation/components/shadcn/tooltip'

export function MonitoringControlsLayoutToggle() {
  const { mode, layout, setLayout } = useMonitoringContext()
  const mapContext = useSafeMonitoringMapContext()

  // Se o modo for 'grid', este sub-controle fica oculto
  if (mode === 'grid') return null

  // MODO MAPA: Alterna forma do contorno (Círculo vs Quadrado / Linha)
  if (mode === 'map') {
    const groupShape = mapContext?.groupShape ?? 'circle'
    const setGroupShape = mapContext?.setGroupShape ?? (() => {})

    return (
      <div className="flex items-center gap-1 border border-border/80 rounded-xl sm:rounded-lg bg-muted/50 p-1 shadow-2xs w-full sm:w-auto justify-stretch sm:justify-start">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setGroupShape('circle')}
              className={`flex-1 sm:flex-initial h-10 min-h-[40px] sm:h-8 sm:min-h-[32px] px-4 sm:px-3 text-xs font-medium gap-2 sm:gap-1.5 rounded-lg sm:rounded-md min-w-[85px] sm:min-w-[82px] justify-center transition-all duration-200 active:scale-95 ${
                groupShape === 'circle'
                  ? 'bg-primary-600 text-white hover:bg-primary-600/90 hover:text-white font-semibold shadow-xs'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground'
              }`}
            >
              <Circle className="w-5 h-5 sm:w-3.5 sm:h-3.5 shrink-0" />
              <span className="inline">Círculo</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top" className="text-xs font-medium">
            Agrupamento em Círculo
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setGroupShape('line')}
              className={`flex-1 sm:flex-initial h-10 min-h-[40px] sm:h-8 sm:min-h-[32px] px-4 sm:px-3 text-xs font-medium gap-2 sm:gap-1.5 rounded-lg sm:rounded-md min-w-[85px] sm:min-w-[82px] justify-center transition-all duration-200 active:scale-95 ${
                groupShape === 'line'
                  ? 'bg-primary-600 text-white hover:bg-primary-600/90 hover:text-white font-semibold shadow-xs'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground'
              }`}
            >
              <Square className="w-5 h-5 sm:w-3.5 sm:h-3.5 shrink-0" />
              <span className="inline">Quadrado</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top" className="text-xs font-medium">
            Agrupamento em Quadrado / Linha
          </TooltipContent>
        </Tooltip>
      </div>
    )
  }

  // MODO HEX: Alterna leiaute (Linear vs Colmeia)
  return (
    <div className="flex items-center gap-1 border border-border/80 rounded-xl sm:rounded-lg bg-muted/50 p-1 shadow-2xs w-full sm:w-auto justify-stretch sm:justify-start">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setLayout('linear')}
            className={`flex-1 sm:flex-initial h-10 min-h-[40px] sm:h-8 sm:min-h-[32px] px-4 sm:px-3 text-xs font-medium gap-2 sm:gap-1.5 rounded-lg sm:rounded-md min-w-[85px] sm:min-w-[82px] justify-center transition-all duration-200 active:scale-95 ${
              layout === 'linear'
                ? 'bg-primary-600 text-white hover:bg-primary-600/90 hover:text-white font-semibold shadow-xs'
                : 'text-muted-foreground hover:bg-accent hover:text-foreground'
            }`}
          >
            <Rows className="w-5 h-5 sm:w-3.5 sm:h-3.5 shrink-0" />
            <span className="inline">Linear</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top" className="text-xs font-medium">
          Disposição em Linhas Paralelas (Alt + L)
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setLayout('radial')}
            className={`flex-1 sm:flex-initial h-10 min-h-[40px] sm:h-8 sm:min-h-[32px] px-4 sm:px-3 text-xs font-medium gap-2 sm:gap-1.5 rounded-lg sm:rounded-md min-w-[85px] sm:min-w-[82px] justify-center transition-all duration-200 active:scale-95 ${
              layout === 'radial'
                ? 'bg-primary-600 text-white hover:bg-primary-600/90 hover:text-white font-semibold shadow-xs'
                : 'text-muted-foreground hover:bg-accent hover:text-foreground'
            }`}
          >
            <Network className="w-5 h-5 sm:w-3.5 sm:h-3.5 shrink-0" />
            <span className="inline">Colmeia</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top" className="text-xs font-medium">
          Disposição em Colmeia / Radial (Alt + L)
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
