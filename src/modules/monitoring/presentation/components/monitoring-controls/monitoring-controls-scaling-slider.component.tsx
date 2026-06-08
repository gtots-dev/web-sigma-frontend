'use client'

import { ZoomIn } from 'lucide-react'
import { useMonitoringContext } from '../monitoring/monitoring-context.component'

const BASE_RADIUS = 37.5

export function MonitoringControlsScalingSlider() {
  const { mode, radius, setRadius, zoom, setZoom } = useMonitoringContext()

  const isHex = mode === 'hex'
  const value = isHex ? radius / BASE_RADIUS : zoom / 1.5
  const setValue = (v: number) => {
    if (isHex) setRadius(v * BASE_RADIUS)
    else setZoom(v * 1.5)
  }

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between items-center">
        <span className="text-[9px] text-muted-foreground font-semibold uppercase tracking-widest flex items-center gap-1">
          <ZoomIn size={10} />
          Zoom
        </span>
        <span className="text-[10px] font-mono font-semibold text-foreground">
          {value.toFixed(1)}x
        </span>
      </div>
      <input
        type="range"
        min={0.8}
        max={isHex ? 2.5 : 2.0}
        step={0.1}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-28 h-1 bg-muted rounded-full appearance-none cursor-pointer accent-primary-500 hover:accent-primary-600 transition-all
          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-500 [&::-webkit-slider-thumb]:shadow-md
          [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary-500 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:shadow-md"
      />
    </div>
  )
}
