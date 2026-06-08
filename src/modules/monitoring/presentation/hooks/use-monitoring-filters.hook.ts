import { useState, useMemo } from 'react'
import { MonitoringCell } from '../../domain/interfaces/monitoring-cell.interface'

const STATUS_PRIORITY = {
  error: 3,
  warning: 2,
  ok: 1
}

function getCellPriority(cell: MonitoringCell): number {
  if (cell.connectionStatus === 'offline') return 4 // Offline é o mais crítico
  return STATUS_PRIORITY[cell.status || 'ok'] || 0
}

export function useMonitoringFilters(cellsArray: MonitoringCell[]) {
  const [statusFilter, setStatusFilter] = useState<MonitoringCell['status'] | 'all'>('all')
  const [connectionFilter, setConnectionFilter] = useState<MonitoringCell['connectionStatus'] | 'all'>('all')
  const [sortMode, setSortMode] = useState<'none' | 'highest' | 'lowest'>('none')

  const processedCells = useMemo(() => {
    let result = [...cellsArray]

    if (statusFilter !== 'all') {
      result = result.filter(
        (cell) => cell.status === statusFilter && cell.connectionStatus === 'online'
      )
    }

    if (connectionFilter !== 'all') {
      result = result.filter((cell) => cell.connectionStatus === connectionFilter)
    }

    if (sortMode === 'highest') {
      result.sort((a, b) => getCellPriority(b) - getCellPriority(a))
    } else if (sortMode === 'lowest') {
      result.sort((a, b) => getCellPriority(a) - getCellPriority(b))
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
