'use client'

import type { SyntheticEvent } from 'react'
import { useMonitoringContext } from '../components/monitoring/monitoring-context.component'

export function useMonitoringStats() {
  const { totalCount, filteredCount, isMaximized } = useMonitoringContext()

  const stopPropagation = (e: SyntheticEvent) => e.stopPropagation()

  return { totalCount, filteredCount, isMaximized, stopPropagation }
}
