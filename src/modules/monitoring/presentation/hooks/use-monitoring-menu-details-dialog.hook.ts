'use client'

import { useMonitoringContext } from '../components/monitoring/monitoring-context.component'

interface UseMonitoringMenuDetailsDialogProps {
  onClose: () => void
}

export function useMonitoringMenuDetailsDialog({
  onClose
}: UseMonitoringMenuDetailsDialogProps) {
  const { activeCell } = useMonitoringContext()

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose()
    }
  }

  return {
    activeCell,
    handleOpenChange
  }
}
