'use client'

import { RotateCcw } from 'lucide-react'
import { useMonitoringContext } from '../monitoring/monitoring-context.component'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'

export function MonitoringControlsResetView() {
  const { resetView } = useMonitoringContext()
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={resetView}
      title="Resetar Visualização"
    >
      <RotateCcw size={16} />
    </Button>
  )
}
