'use client'

import { useRef } from 'react'
import { useTheme } from 'next-themes'
import { useMonitoringContext } from '../monitoring/monitoring-context.component'
import { useMonitoringMapContext } from './monitoring-map-context.component'
import { useMonitoringMapInstance } from '../../hooks/use-monitoring-map-instance.hook'
import { useMonitoringMapTiles } from '../../hooks/use-monitoring-map-tiles.hook'
import { useMonitoringMapGroup } from '../../hooks/use-monitoring-map-group.hook'
import { useMonitoringMapMarkers } from '../../hooks/use-monitoring-map-markers.hook'

export function MonitoringMapCanvas() {
  const {
    mapCells,
    active,
    setActive,
    setMapActivePixelCoords,
    hoveredCellId,
    setHoveredCellId,
    setMapHoveredPixelCoords,
    isSidebarOpen,
  } = useMonitoringContext()

  const {
    groupShape,
    groupMarginMeters,
    mapOpacity,
    outerOpacity,
    setIsMapPanned,
    setResetMapCenterHandler
  } = useMonitoringMapContext()
  const { theme, resolvedTheme } = useTheme()
  
  const isDark = theme === 'dark' || resolvedTheme === 'dark'
  const mapRef = useRef<HTMLDivElement>(null)

  // 1. Instância do Mapa e Lifecycle
  const {
    mapInstance,
    markersGroupLayer,
    groupRadiusLayer,
    isReady,
    updateActivePixelCoords,
    updateHoveredPixelCoords,
    setActiveRef,
    setMapActivePixelCoordsRef,
    setHoveredCellIdRef,
    setMapHoveredPixelCoordsRef
  } = useMonitoringMapInstance({
    mapRef,
    mapCells,
    active,
    setActive,
    setMapActivePixelCoords,
    hoveredCellId,
    setHoveredCellId,
    setMapHoveredPixelCoords,
    isSidebarOpen
  })

  // 2. Camada de Tiles Monocromática com Opacidade
  useMonitoringMapTiles({
    mapInstance,
    isReady,
    isDark,
    mapOpacity
  })

  // 3. Desenho da Área de Agrupamento Operacional e Transparência Externa
  useMonitoringMapGroup({
    mapInstance,
    groupRadiusLayer,
    isReady,
    mapCells,
    isDark,
    groupShape,
    groupMarginMeters,
    outerOpacity,
    setIsMapPanned,
    setResetMapCenterHandler
  })

  // 4. Renderização dos Marcadores com Suporte a Click e Tooltip Hover
  useMonitoringMapMarkers({
    mapInstance,
    markersGroupLayer,
    isReady,
    mapCells,
    active,
    hoveredCellId,
    isDark,
    setActiveRef,
    setMapActivePixelCoordsRef,
    setHoveredCellIdRef,
    setMapHoveredPixelCoordsRef,
    updateActivePixelCoords,
    updateHoveredPixelCoords
  })

  return <div ref={mapRef} className="w-full h-full min-h-0" />
}

