import { useState, useMemo } from 'react'
import { MonitoringCell } from '../../domain/interfaces/monitoring-cell.interface'

const STATUS_PRIORITY = {
  error: 3,
  warning: 2,
  ok: 1
}

export function useMonitoringFilters(cellsArray: MonitoringCell[]) {
  const [statusFilter, setStatusFilter] = useState<MonitoringCell['status'] | 'all'>('all')
  const [connectionFilter, setConnectionFilter] = useState<MonitoringCell['connectionStatus'] | 'all'>('all')
  const [sortMode, setSortMode] = useState<'none' | 'highest' | 'lowest'>('none')

  const processedCells = useMemo(() => {
    let result = [...cellsArray]

    if (statusFilter !== 'all') {
      result = result.filter((cell) => cell.status === statusFilter)
    }

    if (connectionFilter !== 'all') {
      result = result.filter((cell) => cell.connectionStatus === connectionFilter)
    }

    if (sortMode === 'highest') {
      result.sort((a, b) => STATUS_PRIORITY[b.status] - STATUS_PRIORITY[a.status])
    } else if (sortMode === 'lowest') {
      result.sort((a, b) => STATUS_PRIORITY[a.status] - STATUS_PRIORITY[b.status])
    }

    return result
  }, [cellsArray, statusFilter, connectionFilter, sortMode])

  return {
    statusFilter,
    setStatusFilter,
    connectionFilter,
    setConnectionFilter,
    sortMode,
    setSortMode,
    processedCells,
    totalCount: cellsArray.length,
    filteredCount: processedCells.length
  }
}
