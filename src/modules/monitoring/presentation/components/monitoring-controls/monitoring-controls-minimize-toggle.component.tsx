'use client'

import { ChevronRight } from 'lucide-react'
import { useMonitoringContext } from '../monitoring/monitoring-context.component'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'

export function MonitoringControlsMinimizeToggle() {
  const { setIsControlsMinimized } = useMonitoringContext()
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setIsControlsMinimized(true)}
      title="Minimizar Controles"
    >
      <ChevronRight size={16} />
    </Button>
  )
}
