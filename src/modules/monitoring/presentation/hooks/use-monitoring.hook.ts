import { useMemo, useCallback, useEffect } from 'react'
import { MonitoringCell } from '../../domain/interfaces/monitoring-cell.interface'
import { useMonitoringCells } from './use-monitoring-cells.hook'
import { useMonitoringFilters } from './use-monitoring-filters.hook'
import { useMonitoringViewport } from './use-monitoring-viewport.hook'
import { useMonitoringLayout } from './use-monitoring-layout.hook'

export function useMonitoring(initialCells: MonitoringCell[]) {


  // 1. Gestão de Dados (Dicionário, Upsert, Batch, etc)
  const {
    cellsDict,
    cellsArray,
    lastUpdated,
    upsertCells,
    removeCells,
    updateCellsBatch,
    activeRef
  } = useMonitoringCells(initialCells)

  // 2. Viewport e Interações (Zoom, Offset, Drag, Refs)
  const {
    containerRef,
    zoom, setZoom,
    radius, setRadius,
    offset,
    isDragging,
    active,
    handleSetActive,
    isMaximized, setIsMaximized,
    isControlsMinimized, setIsControlsMinimized,
    handlers,
    resetView
  } = useMonitoringViewport()

  // Sincronizar activeRef para os hooks de mutação
  useEffect(() => {
    activeRef.current = active
  }, [active, activeRef])

  // 3. Filtragem e Ordenação
  const {
    statusFilter, setStatusFilter,
    connectionFilter, setConnectionFilter,
    sortMode, setSortMode,
    processedCells,
    totalCount,
    filteredCount
  } = useMonitoringFilters(cellsArray)

  // 4. Layout e Espacialização (Cálculo de Coordenadas)
  const {
    mode, setMode,
    layout, setLayout,
    hexes, cells,
    totalHeight,
    CELL_WIDTH, CELL_HEIGHT
  } = useMonitoringLayout(processedCells, containerRef, radius, zoom)

  // 5. Utilitários (Cores, Pontos e Coordenadas Ativas)
  const getDotColor = useCallback((status: MonitoringCell[] | any) => {
    switch (status) {
      case 'ok': return 'rgb(var(--monitoring-ok))'
      case 'error': return 'rgb(var(--monitoring-error))'
      case 'warning': return 'rgb(var(--monitoring-warning))'
      default: return 'rgb(var(--monitoring-offline))'
    }
  }, [])

  const points = useCallback((cx: number, cy: number, r: number) => {
    return Array.from({ length: 6 }, (_, i) => {
      const angle = (Math.PI / 180) * (60 * i - 30)
      return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`
    }).join(' ')
  }, [])

  const activeCoords = useMemo(() => {
    if (!active) return null
    if (mode === 'hex') {
      const hex = hexes.find((h) => h.cell.id === active)
      if (!hex) return null
      return {
        x: hex.cx + offset.x,
        y: hex.cy - radius + offset.y,
        itemHeight: radius * 2
      }
    } else {
      const cell = cells.find((c) => c.cell.id === active)
      if (!cell) return null
      return {
        x: (cell.x + CELL_WIDTH / 2) * zoom + offset.x,
        y: cell.y * zoom + offset.y,
        itemHeight: CELL_HEIGHT * zoom
      }
    }
  }, [active, mode, hexes, cells, zoom, offset, radius])

  const activeCell = useMemo(() => {
    return active ? cellsDict[active] : null
  }, [cellsDict, active])

  return {
    // Dados e Mutadores
    cellsDict,
    upsertCells,
    removeCells,
    updateCellsBatch,
    lastUpdated,
    
    // Refs e Container
    containerRef,
    
    // Viewport
    zoom, setZoom,
    radius, setRadius,
    offset,
    isDragging,
    isMaximized, setIsMaximized,
    isControlsMinimized, setIsControlsMinimized,
    resetView,
    
    // Filtros e Ordenação
    statusFilter, setStatusFilter,
    connectionFilter, setConnectionFilter,
    sortMode, setSortMode,
    totalCount,
    filteredCount,
    
    // Layout
    mode, setMode,
    layout, setLayout,
    hexes,
    cells,
    totalHeight,
    
    // Seleção e Coordenadas
    active,
    setActive: handleSetActive,
    activeCell,
    activeCoords,
    

    // Handlers e Utils
    ...handlers,
    points,
    getDotColor,
    CELL_WIDTH,
    CELL_HEIGHT
  }
}
