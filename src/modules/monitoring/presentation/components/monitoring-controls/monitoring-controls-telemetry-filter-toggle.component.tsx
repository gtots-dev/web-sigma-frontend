'use client'

import { ListFilter } from 'lucide-react'
import { useMonitoringContext } from '../monitoring/monitoring-context.component'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'

export function MonitoringControlsTelemetryFilterToggle() {
  const { isSidebarOpen, setIsSidebarOpen } = useMonitoringContext()

  return (
    <Button
      variant={isSidebarOpen ? 'primary' : 'outline'}
      size="icon"
      onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      title="Filtros de Telemetria"
    >
      <ListFilter size={16} />
    </Button>
  )
}
