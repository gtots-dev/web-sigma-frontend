'use client'

import { CircleDot, LayoutGrid } from 'lucide-react'
import { useMonitoringContext } from '../monitoring/monitoring-context.component'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'

export function MonitoringControlsModeToggle() {
  const { mode, setMode } = useMonitoringContext()
  return (
    <div className="flex flex-col md:flex-row items-center gap-1 border rounded bg-muted/40 p-1">
      <Button
        size="sm"
        variant="ghost"
        onClick={() => setMode('hex')}
        className={`h-7 px-3 text-xs gap-1.5 ${
          mode === 'hex'
            ? 'bg-primary-500 text-white hover:bg-primary-500/90 hover:text-white'
            : 'bg-transparent text-muted-foreground hover:bg-accent hover:text-foreground'
        }`}
      >
        <CircleDot size={13} />
        Hex
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => setMode('grid')}
        className={`h-7 px-3 text-xs gap-1.5 ${
          mode === 'grid'
            ? 'bg-primary-500 text-white hover:bg-primary-500/90 hover:text-white'
            : 'bg-transparent text-muted-foreground hover:bg-accent hover:text-foreground'
        }`}
      >
        <LayoutGrid size={13} />
        Grid
      </Button>
    </div>
  )
}
