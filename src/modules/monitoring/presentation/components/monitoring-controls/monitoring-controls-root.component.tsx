'use client'

import { Settings2 } from 'lucide-react'
import { useMonitoringContext } from '../monitoring/monitoring-context.component'
import { ReactNode } from 'react'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'

interface MonitoringControlsRootProps {
  children?: ReactNode
}

export function MonitoringControlsRoot({
  children
}: MonitoringControlsRootProps) {
  const { isControlsMinimized, setIsControlsMinimized } = useMonitoringContext()

  if (isControlsMinimized) {
    return (
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsControlsMinimized(false)}
        className="fixed bottom-6 right-6 z-[40] shadow-lg"
        title="Expandir controles"
      >
        <Settings2 size={16} />
      </Button>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-[40] flex flex-col md:flex-row items-center gap-4 bg-card border p-3 md:h-16 shadow-lg">
      {children}
    </div>
  )
}
