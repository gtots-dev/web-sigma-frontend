import { useState, useMemo, useCallback } from 'react'
import { MonitoringCell } from '../../domain/interfaces/monitoring-cell.interface'
import { useMonitoringDashboardStore } from '../stores/use-monitoring-dashboard.store'

const STATUS_PRIORITY = {
  error: 3,
  warning: 2,
  ok: 1
}

function getCellPriority(cell: MonitoringCell): number {
  if (cell.connectionStatus === 'offline') return 4 // Offline é o mais crítico
  return STATUS_PRIORITY[cell.status || 'ok'] || 0
}

export interface TelemetryFilterItem {
  name: string
  count: number // Number of unique cells containing this telemetry event
  type: 'up' | 'lane'
}

export function useMonitoringFilters(cellsArray: MonitoringCell[]) {
  const [statusFilter, setStatusFilter] = useState<MonitoringCell['status'] | 'all'>('all')
  const [connectionFilter, setConnectionFilter] = useState<MonitoringCell['connectionStatus'] | 'all'>('all')
  const [upErrorFilters, setUpErrorFilters] = useState<(string | number)[]>([])
  const [laneErrorFilters, setLaneErrorFilters] = useState<(string | number)[]>([])
  const [sortMode, setSortMode] = useState<'none' | 'highest' | 'lowest'>('none')
  
  // States for Telemetry Filters
  const [selectedTelemetryFilters, setSelectedTelemetryFilters] = useState<Set<string>>(() => new Set())
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const upData = useMonitoringDashboardStore((state) => state.upData)
  const laneData = useMonitoringDashboardStore((state) => state.laneData)

  // Calculate unique telemetry items and count how many cells have them active (warnings and errors only)
  const telemetryItems = useMemo<TelemetryFilterItem[]>(() => {
    const itemsMap = new Map<string, TelemetryFilterItem>()

    cellsArray.forEach((cell) => {
      const cellKeys = new Set<string>()

      cell.upIds.forEach((upId) => {
        const up = upData.get(upId)
        if (up) {
          const elements = up.request?.items?.flatMap(item => item.elements) || []
          elements.forEach(el => {
            if (el && typeof el.level === 'number' && el.level >= 1) {
              const key = `up-${el.name}`
              cellKeys.add(key)
            }
          })
        }
      })

      cell.laneIds.forEach((laneId) => {
        const lane = laneData.get(laneId)
        if (lane) {
          const elements = lane.request?.items?.flatMap(item => item.elements) || []
          elements.forEach(el => {
            if (el && typeof el.level === 'number' && el.level >= 1) {
              const key = `lane-${el.name}`
              cellKeys.add(key)
            }
          })
        }
      })

      // Increment counts
      cellKeys.forEach((key) => {
        const parts = key.split('-')
        const type = parts[0] as 'up' | 'lane'
        const name = parts.slice(1).join('-')

        const existing = itemsMap.get(key)
        if (existing) {
          existing.count += 1
        } else {
          itemsMap.set(key, { name, count: 1, type })
        }
      })
    })

    // Sort alphabetically by name
    return Array.from(itemsMap.values()).sort((a, b) => a.name.localeCompare(b.name))
  }, [cellsArray, upData, laneData])

  const toggleTelemetryFilter = useCallback((name: string, type: 'up' | 'lane') => {
    setSelectedTelemetryFilters((prev) => {
      const next = new Set(prev)
      const key = `${type}-${name}`
      if (next.has(key)) {
        next.delete(key)
      } else {
        next.add(key)
      }
      return next
    })
  }, [])

  const clearTelemetryFilters = useCallback(() => {
    setSelectedTelemetryFilters(new Set())
  }, [])

  const processedCells = useMemo(() => {
    let result = [...cellsArray]

    // 1. Status Filter (e.g. online, offline, ok, warning, error)
    if (statusFilter !== 'all') {
      result = result.filter(
        (cell) => cell.status === statusFilter && cell.connectionStatus === 'online'
      )
    }

    if (connectionFilter !== 'all') {
      result = result.filter((cell) => cell.connectionStatus === connectionFilter)
    }

    // 2. UP error filter (status list)
    if (upErrorFilters.length > 0) {
      result = result.filter((cell) => {
        return cell.upIds?.some((upId) => {
          const data = upData.get(upId)
          const items = data?.request?.items || []
          return items.some((group) =>
            group.elements?.some((el) => {
              const isActiveError = el.level >= 1
              if (!isActiveError) return false
              return upErrorFilters.some((filterVal) => {
                const filterStr = String(filterVal)
                return String(el.code) === filterStr || el.name.toLowerCase().includes(filterStr.toLowerCase())
              })
            })
          )
        })
      })
    }

    // 3. Lane error filter (status list)
    if (laneErrorFilters.length > 0) {
      result = result.filter((cell) => {
        return cell.laneIds?.some((laneId) => {
          const data = laneData.get(laneId)
          const items = data?.request?.items || []
          return items.some((group) =>
            group.elements?.some((el) => {
              const isActiveError = el.level >= 1
              if (!isActiveError) return false
              return laneErrorFilters.some((filterVal) => {
                const filterStr = String(filterVal)
                return String(el.code) === filterStr || el.name.toLowerCase().includes(filterStr.toLowerCase())
              })
            })
          )
        })
      })
    }

    // 4. New Telemetry element-specific filters
    if (selectedTelemetryFilters.size > 0) {
      result = result.filter((cell) => {
        let hasMatchingTelemetry = false

        cell.upIds.forEach((upId) => {
          const up = upData.get(upId)
          if (up) {
            const elements = up.request?.items?.flatMap(item => item.elements) || []
            elements.forEach((el) => {
              if (el && typeof el.level === 'number' && el.level >= 1) {
                const key = `up-${el.name}`
                if (selectedTelemetryFilters.has(key)) {
                  hasMatchingTelemetry = true
                }
              }
            })
          }
        })

        if (hasMatchingTelemetry) return true

        cell.laneIds.forEach((laneId) => {
          const lane = laneData.get(laneId)
          if (lane) {
            const elements = lane.request?.items?.flatMap(item => item.elements) || []
            elements.forEach((el) => {
              if (el && typeof el.level === 'number' && el.level >= 1) {
                const key = `lane-${el.name}`
                if (selectedTelemetryFilters.has(key)) {
                  hasMatchingTelemetry = true
                }
              }
            })
          }
        })

        return hasMatchingTelemetry
      })
    }

    // 5. Sorting
    if (sortMode === 'highest') {
      result.sort((a, b) => getCellPriority(b) - getCellPriority(a))
    } else if (sortMode === 'lowest') {
      result.sort((a, b) => getCellPriority(a) - getCellPriority(b))
    }

    return result
  }, [cellsArray, statusFilter, connectionFilter, upErrorFilters, laneErrorFilters, sortMode, selectedTelemetryFilters, upData, laneData])

  return {
    statusFilter,
    setStatusFilter,
    connectionFilter,
    setConnectionFilter,
    upErrorFilters,
    setUpErrorFilters,
    laneErrorFilters,
    setLaneErrorFilters,
    sortMode,
    setSortMode,
    
    // Telemetry filters state
    selectedTelemetryFilters,
    setSelectedTelemetryFilters,
    toggleTelemetryFilter,
    clearTelemetryFilters,
    telemetryItems,
    isSidebarOpen,
    setIsSidebarOpen,

    processedCells,
    totalCount: cellsArray.length,
    filteredCount: processedCells.length
  }
}
