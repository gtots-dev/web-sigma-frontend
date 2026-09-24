'use client'

import { useEffect, RefObject } from 'react'
import { marker, divIcon, DomEvent } from 'leaflet'
import type { Map as LeafletMapInstance, LayerGroup as LeafletLayerGroup } from 'leaflet'
import type { MonitoringMapCell } from '../../domain/interfaces/monitoring-cell.interface'

interface UseMonitoringMapMarkersProps {
  mapInstance: LeafletMapInstance | null
  markersGroupLayer: LeafletLayerGroup | null
  isReady: boolean
  mapCells: MonitoringMapCell[]
  active: string | null
  hoveredCellId: string | null
  isDark: boolean
  setActiveRef: RefObject<(id: string | null) => void>
  setMapActivePixelCoordsRef: RefObject<
    | ((coords: { x: number; y: number; itemHeight: number } | null) => void)
    | null
  >
  setHoveredCellIdRef: RefObject<(id: string | null) => void>
  setMapHoveredPixelCoordsRef: RefObject<
    | ((coords: { x: number; y: number; itemHeight: number } | null) => void)
    | null
  >
  updateActivePixelCoords: () => void
  updateHoveredPixelCoords: () => void
}

export function useMonitoringMapMarkers({
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
}: UseMonitoringMapMarkersProps) {
  useEffect(() => {
    if (!mapInstance || !markersGroupLayer || !isReady || !mapCells)
      return

    markersGroupLayer.clearLayers()

    mapCells.forEach((mapCell) => {
      const { cell, latitude, longitude } = mapCell
      if (latitude === undefined || longitude === undefined || isNaN(latitude) || isNaN(longitude)) return

      const isSelected = active === cell.id

      const isOffline = cell.connectionStatus === 'offline'
      let statusColor = '#6b7280'
      if (!isOffline) {
        switch (cell.status) {
          case 'ok':
            statusColor = '#22c55e'
            break
          case 'warning':
            statusColor = '#eab308'
            break
          case 'error':
            statusColor = '#ef4444'
            break
          default:
            statusColor = '#22c55e'
        }
      }

      const rawName = cell.name || 'Ponto'

      const customIcon = divIcon({
        className: 'custom-monitoring-map-marker',
        html: `
          <div class="monitoring-marker-wrapper ${isSelected ? 'is-selected' : ''}" style="background-color: ${isDark ? '#18181b' : '#ffffff'}; color: ${isDark ? '#f4f4f5' : '#09090b'}; border-color: ${statusColor};">
            <!-- Dot de Status Posicionada no Centro Superior -->
            <span class="monitoring-marker-dot" style="background-color: ${statusColor}; border-color: ${isDark ? '#18181b' : '#ffffff'};"></span>

            <!-- Texto Formatado via CSS com limite de 8ch -->
            <span class="monitoring-marker-text">${rawName}</span>
            ${
              isSelected
                ? `<span class="monitoring-marker-pulse" style="border-color: ${statusColor};"></span>`
                : ''
            }
          </div>
        `,
        iconAnchor: [35, isSelected ? 16 : 13]
      })

      const leafletMarker = marker([latitude, longitude], {
        icon: customIcon
      }).addTo(markersGroupLayer)

      // Clique abre o menu dropdown do ponto
      leafletMarker.on('click', (e: unknown) => {
        DomEvent.stopPropagation(e as Event)
        if (setActiveRef.current) setActiveRef.current(cell.id)

        if (mapInstance) {
          const point = mapInstance.latLngToContainerPoint([
            latitude,
            longitude
          ])
          if (setMapActivePixelCoordsRef.current) {
            setMapActivePixelCoordsRef.current({
              x: point.x,
              y: point.y - 10,
              itemHeight: 36
            })
          }
        }
      })

      // Mouseover ativa o Tooltip informativo sobre o ponto
      leafletMarker.on('mouseover', () => {
        if (setHoveredCellIdRef.current) setHoveredCellIdRef.current(cell.id)

        if (mapInstance) {
          const point = mapInstance.latLngToContainerPoint([
            latitude,
            longitude
          ])
          if (setMapHoveredPixelCoordsRef.current) {
            setMapHoveredPixelCoordsRef.current({
              x: point.x,
              y: point.y - 10,
              itemHeight: 36
            })
          }
        }
      })

      // Mouseout esconde o Tooltip
      leafletMarker.on('mouseout', () => {
        if (setHoveredCellIdRef.current) setHoveredCellIdRef.current(null)
        if (setMapHoveredPixelCoordsRef.current)
          setMapHoveredPixelCoordsRef.current(null)
      })
    })

    if (active) {
      updateActivePixelCoords()
    }
    if (hoveredCellId) {
      updateHoveredPixelCoords()
    }
  }, [
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
  ])
}

