'use client'

import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react'
import { useMonitoringContext } from '../monitoring/monitoring-context.component'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/modules/shared/presentation/components/shadcn/tooltip'

const BASE_RADIUS = 37.5

export function MonitoringControlsScalingSlider() {
  const { mode, radius, setRadius, zoom, setZoom } = useMonitoringContext()

  // Oculta o controle de zoom quando em modo mapa, pois o mapa possui navegação de zoom própria
  if (mode === 'map') return null

  const isHex = mode === 'hex'
  const value = isHex ? radius / BASE_RADIUS : zoom / 1.5
  const minVal = 0.8
  const maxVal = isHex ? 2.5 : 2.0

  const setValue = (v: number) => {
    const clamped = Math.min(Math.max(v, minVal), maxVal)
    if (isHex) setRadius(clamped * BASE_RADIUS)
    else setZoom(clamped * 1.5)
  }

  const handleZoomOut = () => {
    setValue(value - 0.15)
  }

  const handleZoomIn = () => {
    setValue(value + 0.15)
  }

  const handleResetZoom = () => {
    setValue(1.0)
  }

  const percentage = Math.round(value * 100)

  return (
    <div className="flex items-center gap-1.5 sm:gap-1.5 bg-muted/50 border border-border/80 rounded-xl sm:rounded-lg p-1.5 sm:p-1 shadow-2xs w-full sm:w-auto justify-between sm:justify-start">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleZoomOut}
            disabled={value <= minVal}
            className="h-9 w-9 sm:h-7 sm:w-7 rounded-lg sm:rounded-md text-muted-foreground hover:text-foreground disabled:opacity-40 active:scale-95"
          >
            <ZoomOut className="w-5 h-5 sm:w-3.5 sm:h-3.5 shrink-0" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top" className="text-xs font-medium">
          Diminuir Zoom (-)
        </TooltipContent>
      </Tooltip>

      {/* Badge numérico de Porcentagem (clicável para resetar zoom) */}
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={handleResetZoom}
            className="px-2.5 py-1 sm:px-2 sm:py-0.5 text-xs font-mono font-bold text-foreground hover:bg-accent rounded-md sm:rounded transition-colors flex items-center gap-1.5 sm:gap-1 cursor-pointer active:scale-95"
          >
            <span>{percentage}%</span>
            {value !== 1.0 && (
              <RotateCcw
                className="w-3.5 h-3.5 sm:w-2.5 sm:h-2.5 text-primary-500 animate-spin-once shrink-0"
              />
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent side="top" className="text-xs font-medium">
          Resetar Zoom para 100%
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleZoomIn}
            disabled={value >= maxVal}
            className="h-9 w-9 sm:h-7 sm:w-7 rounded-lg sm:rounded-md text-muted-foreground hover:text-foreground disabled:opacity-40 active:scale-95"
          >
            <ZoomIn className="w-5 h-5 sm:w-3.5 sm:h-3.5 shrink-0" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top" className="text-xs font-medium">
          Aumentar Zoom (+)
        </TooltipContent>
      </Tooltip>

      {/* Slider deslizante compacto */}
      <div className="flex items-center pl-1.5 pr-2 sm:pl-1 sm:pr-1.5 border-l border-border/60 flex-1 sm:flex-none">
        <input
          type="range"
          min={minVal}
          max={maxVal}
          step={0.05}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="w-full sm:w-16 h-2 sm:h-1 bg-muted-foreground/30 rounded-full appearance-none cursor-pointer accent-primary-500 hover:accent-primary-600 transition-all"
        />
      </div>
    </div>
  )
}
