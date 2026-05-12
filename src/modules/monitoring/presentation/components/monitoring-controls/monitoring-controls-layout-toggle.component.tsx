'use client'

import { useMonitoringContext } from '../monitoring/monitoring-context.component'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'

export function MonitoringControlsLayoutToggle() {
  const { layout, setLayout } = useMonitoringContext()
  return (
    <div className="flex flex-col md:flex-row items-center gap-1 border rounded bg-muted/40 p-1">
      <Button
        variant="ghost"
        onClick={() => setLayout('linear')}
        className={`h-7 px-3 text-xs gap-1.5 ${
          layout === 'linear'
            ? 'bg-primary-500 text-white hover:bg-primary-500/90'
            : 'bg-transparent text-muted-foreground hover:bg-accent hover:text-foreground'
        }`}
      >
        Linear
      </Button>
      <Button
        variant="ghost"
        onClick={() => setLayout('radial')}
        className={`h-7 px-3 text-xs gap-1.5 ${
          layout === 'radial'
            ? 'bg-primary-500 text-white hover:bg-primary-500/90'
            : 'bg-transparent text-muted-foreground hover:bg-accent hover:text-foreground'
        }`}
      >
        Radial
      </Button>
    </div>
  )
}
