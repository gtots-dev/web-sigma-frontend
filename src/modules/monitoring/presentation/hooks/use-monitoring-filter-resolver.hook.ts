import { useCallback, useMemo } from 'react'
import { useMonitoringContext } from '../components/monitoring/monitoring-context.component'

const MONITORING_FILTER_LABELS: Record<string, string> = {
  sortMode: 'Ordenação',
  connectionFilter: 'Conexão',
  statusFilter: 'Condição',
  upErrorFilters: 'Status da UP'
}

const SORT_LABELS: Record<string, string> = {
  highest: 'Maior Criticidade',
  lowest: 'Maior Estabilidade'
}

const CONNECTION_LABELS: Record<string, string> = {
  online: 'Apenas Online',
  offline: 'Apenas Offline'
}

const STATUS_LABELS: Record<string, string> = {
  ok: 'Normal',
  warning: 'Atenção',
  error: 'Crítico'
}

export function useMonitoringFilterResolver() {
  const { sortMode, connectionFilter, statusFilter, upErrorFilters } =
    useMonitoringContext()

  const activeFilters = useMemo(() => {
    const filters: Record<string, unknown> = {}
    if (sortMode && sortMode !== 'none') filters.sortMode = sortMode
    if (connectionFilter && connectionFilter !== 'all')
      filters.connectionFilter = connectionFilter
    if (statusFilter && statusFilter !== 'all')
      filters.statusFilter = statusFilter
    if (upErrorFilters && upErrorFilters.length > 0)
      filters.upErrorFilters = upErrorFilters
    return filters
  }, [sortMode, connectionFilter, statusFilter, upErrorFilters])

  const handleValueResolver = useCallback(
    (key: string, val: unknown) => {
      if (key === 'sortMode' && typeof val === 'string') {
        return SORT_LABELS[val] ?? val
      }
      if (key === 'connectionFilter' && typeof val === 'string') {
        return CONNECTION_LABELS[val] ?? val
      }
      if (key === 'statusFilter' && typeof val === 'string') {
        return STATUS_LABELS[val] ?? val
      }
      return null
    },
    []
  )

  return {
    activeFilters,
    filterLabels: MONITORING_FILTER_LABELS,
    handleValueResolver
  }
}
