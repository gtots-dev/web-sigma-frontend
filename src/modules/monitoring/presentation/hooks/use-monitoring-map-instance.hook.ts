'use client'

import { useEffect, useRef, useState, useCallback, RefObject } from 'react'
import { map, layerGroup } from 'leaflet'
import type { Map, LayerGroup } from 'leaflet'
import type { MonitoringMapCell } from '../../domain/interfaces/monitoring-cell.interface'

interface UseMonitoringMapInstanceProps {
  mapRef: RefObject<HTMLDivElement | null>
  mapCells: MonitoringMapCell[]
  active: string | null
  setActive: (id: string | null) => void
  setMapActivePixelCoords: (
    coords: { x: number; y: number; itemHeight: number } | null
  ) => void
  hoveredCellId: string | null
  setHoveredCellId: (id: string | null) => void
  setMapHoveredPixelCoords: (
    coords: { x: number; y: number; itemHeight: number } | null
  ) => void
  isSidebarOpen: boolean
}

export function useMonitoringMapInstance({
  mapRef,
  mapCells,
  active,
  setActive,
  setMapActivePixelCoords,
  hoveredCellId,
  setHoveredCellId,
  setMapHoveredPixelCoords,
  isSidebarOpen
}: UseMonitoringMapInstanceProps) {
  const leafletMapInstanceRef = useRef<Map | null>(null)
  const groupRadiusLayerRef = useRef<LayerGroup | null>(null)
  const markersGroupRef = useRef<LayerGroup | null>(null)
  const [isReady, setIsReady] = useState(false)

  // Stable refs para callbacks para evitar re-criação ou encerramento desnecessário do mapa
  const setActiveRef = useRef(setActive)
  const setMapActivePixelCoordsRef = useRef(setMapActivePixelCoords)
  const setHoveredCellIdRef = useRef(setHoveredCellId)
  const setMapHoveredPixelCoordsRef = useRef(setMapHoveredPixelCoords)
  const activeRef = useRef(active)
  const hoveredCellIdRef = useRef(hoveredCellId)
  const mapCellsRef = useRef(mapCells)

  useEffect(() => {
    setActiveRef.current = setActive
    setMapActivePixelCoordsRef.current = setMapActivePixelCoords
    setHoveredCellIdRef.current = setHoveredCellId
    setMapHoveredPixelCoordsRef.current = setMapHoveredPixelCoords
    activeRef.current = active
    hoveredCellIdRef.current = hoveredCellId
    mapCellsRef.current = mapCells
  })

  // Atualiza as coordenadas em tela para o menu dropdown ativo
  const updateActivePixelCoords = useCallback(() => {
    const currentActive = activeRef.current
    const currentMapCells = mapCellsRef.current
    const setCoords = setMapActivePixelCoordsRef.current

    if (
      !leafletMapInstanceRef.current ||
      !currentActive ||
      !currentMapCells ||
      !currentMapCells.length
    )
      return

    const activeMapCell = currentMapCells.find(
      (m) => m.cell.id === currentActive
    )
    if (!activeMapCell) return

    const activeLat = activeMapCell.latitude
    const activeLng = activeMapCell.longitude
    if (activeLat === undefined || activeLng === undefined || isNaN(activeLat) || isNaN(activeLng)) return

    const mapInst = leafletMapInstanceRef.current
    const point = mapInst.latLngToContainerPoint([
      activeLat,
      activeLng
    ])

    if (setCoords) {
      setCoords({
        x: point.x,
        y: point.y - 10,
        itemHeight: 36
      })
    }
  }, [])

  // Atualiza as coordenadas em tela para o tooltip do marcador hovered
  const updateHoveredPixelCoords = useCallback(() => {
    const currentHovered = hoveredCellIdRef.current
    const currentMapCells = mapCellsRef.current
    const setCoords = setMapHoveredPixelCoordsRef.current

    if (
      !leafletMapInstanceRef.current ||
      !currentHovered ||
      !currentMapCells ||
      !currentMapCells.length
    )
      return

    const hoveredMapCell = currentMapCells.find(
      (m) => m.cell.id === currentHovered
    )
    if (!hoveredMapCell) return

    const hoveredLat = hoveredMapCell.latitude
    const hoveredLng = hoveredMapCell.longitude
    if (hoveredLat === undefined || hoveredLng === undefined || isNaN(hoveredLat) || isNaN(hoveredLng)) return

    const mapInst = leafletMapInstanceRef.current
    const point = mapInst.latLngToContainerPoint([
      hoveredLat,
      hoveredLng
    ])

    if (setCoords) {
      setCoords({
        x: point.x,
        y: point.y - 10,
        itemHeight: 36
      })
    }
  }, [])

  // Inicialização única da instância Leaflet
  useEffect(() => {
    if (!mapRef.current || leafletMapInstanceRef.current) return

    const spCenter: [number, number] = [-23.5505, -46.6333]

    const mapInst = map(mapRef.current, {
      center: spCenter,
      zoom: 13,
      zoomControl: true,
      maxBounds: null
    })

    leafletMapInstanceRef.current = mapInst

    markersGroupRef.current = layerGroup().addTo(mapInst)
    groupRadiusLayerRef.current = layerGroup().addTo(mapInst)

    const handleMapMove = () => {
      updateActivePixelCoords()
      updateHoveredPixelCoords()
    }

    mapInst.on('move', handleMapMove)
    mapInst.on('zoom', handleMapMove)
    mapInst.on('zoomend', handleMapMove)
    mapInst.on('viewreset', handleMapMove)

    mapInst.on('click', () => {
      if (setActiveRef.current) setActiveRef.current(null)
      if (setMapActivePixelCoordsRef.current)
        setMapActivePixelCoordsRef.current(null)
    })

    setIsReady(true)

    return () => {
      mapInst.off('move', handleMapMove)
      mapInst.off('zoom', handleMapMove)
      mapInst.off('zoomend', handleMapMove)
      mapInst.off('viewreset', handleMapMove)
      mapInst.remove()
      leafletMapInstanceRef.current = null
      setIsReady(false)
    }
  }, [mapRef, updateActivePixelCoords, updateHoveredPixelCoords])

  // Ajuste de tamanho dinâmico ao expandir/colapsar sidebar
  useEffect(() => {
    if (!leafletMapInstanceRef.current || !isReady) return

    const mapInst = leafletMapInstanceRef.current
    mapInst.invalidateSize()

    const timer = setTimeout(() => {
      mapInst.invalidateSize()
      updateActivePixelCoords()
      updateHoveredPixelCoords()
    }, 320)

    return () => clearTimeout(timer)
  }, [
    isSidebarOpen,
    isReady,
    updateActivePixelCoords,
    updateHoveredPixelCoords
  ])

  // ResizeObserver para redimensionamento da janela e containers
  useEffect(() => {
    if (!mapRef.current || !leafletMapInstanceRef.current || !isReady) return

    const mapInst = leafletMapInstanceRef.current
    const observer = new ResizeObserver(() => {
      mapInst.invalidateSize()
      updateActivePixelCoords()
      updateHoveredPixelCoords()
    })

    observer.observe(mapRef.current)

    return () => observer.disconnect()
  }, [mapRef, isReady, updateActivePixelCoords, updateHoveredPixelCoords])

  return {
    mapInstance: leafletMapInstanceRef.current,
    markersGroupLayer: markersGroupRef.current,
    groupRadiusLayer: groupRadiusLayerRef.current,
    isReady,
    updateActivePixelCoords,
    updateHoveredPixelCoords,
    setActiveRef,
    setMapActivePixelCoordsRef,
    setHoveredCellIdRef,
    setMapHoveredPixelCoordsRef
  }
}
