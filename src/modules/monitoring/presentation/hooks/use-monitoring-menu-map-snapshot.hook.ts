'use client'

import { useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'
import { map as createMap, tileLayer, divIcon, marker } from 'leaflet'
import type { Map as LeafletMapInstance } from 'leaflet'
import type { MonitoringCell } from '../../domain/interfaces/monitoring-cell.interface'

interface UseMonitoringMenuMapSnapshotProps {
  cell?: MonitoringCell
}

export function useMonitoringMenuMapSnapshot({
  cell
}: UseMonitoringMenuMapSnapshotProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<LeafletMapInstance | null>(null)
  const { theme, resolvedTheme } = useTheme()
  const isDark = theme === 'dark' || resolvedTheme === 'dark'

  const parsedLat = cell?.latitude ? parseFloat(String(cell.latitude)) : NaN
  const parsedLng = cell?.longitude ? parseFloat(String(cell.longitude)) : NaN

  const latitude = !isNaN(parsedLat) ? parsedLat : -23.58252
  const longitude = !isNaN(parsedLng) ? parsedLng : -46.609309
  const isOffline = cell?.connectionStatus === 'offline'

  let statusColor = '#6b7280'
  if (!isOffline && cell) {
    if (cell.status === 'ok') statusColor = '#22c55e'
    else if (cell.status === 'warning') statusColor = '#eab308'
    else if (cell.status === 'error') statusColor = '#ef4444'
  }

  const rawName = cell?.name || 'Ponto'
  const cellId = cell?.id

  const initialValuesRef = useRef({ latitude, longitude, rawName, statusColor })

  useEffect(() => {
    initialValuesRef.current = { latitude, longitude, rawName, statusColor }
  }, [cellId, latitude, longitude, rawName, statusColor])

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current || !cellId) return

    const { latitude: initLat, longitude: initLng } = initialValuesRef.current

    const mapInstance = createMap(mapRef.current, {
      center: [initLat, initLng],
      zoom: 17,
      zoomControl: false,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      boxZoom: false,
      keyboard: false,
      touchZoom: false,
      attributionControl: false
    })

    mapInstanceRef.current = mapInstance

    // Tile Layer OpenStreetMap Monocromático
    const tileLayerInstance = tileLayer(
      'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        className: isDark ? 'osm-dark-tile' : 'osm-light-tile'
      }
    )
    tileLayerInstance.addTo(mapInstance)

    const systemBlue = isDark ? '#38bdf8' : '#0284c7'

    // Marcador de Ícone de Pin de Mapa Maior em Azul do Sistema
    const customIcon = divIcon({
      className: 'custom-monitoring-map-pin',
      html: `
        <div class="monitoring-pin-wrapper">
          <!-- Sombra Projetada no Chão -->
          <div class="monitoring-pin-shadow"></div>

          <!-- Ícone de Pin Geográfico Maior em Azul do Sistema -->
          <svg class="monitoring-pin-svg" width="38" height="46" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z" fill="${systemBlue}" stroke="${isDark ? '#18181b' : '#ffffff'}" stroke-width="1.8" stroke-linejoin="round"/>
            <circle cx="12" cy="9" r="3.5" fill="${isDark ? '#18181b' : '#ffffff'}"/>
          </svg>
        </div>
      `,
      iconAnchor: [21, 46]
    })

    marker([initLat, initLng], {
      icon: customIcon,
      interactive: false
    }).addTo(mapInstance)

    // ResizeObserver para garantir preenchimento contínuo de 100% de largura
    const observer = new ResizeObserver(() => {
      mapInstance.invalidateSize()
    })
    observer.observe(mapRef.current)

    return () => {
      observer.disconnect()
      mapInstance.remove()
      mapInstanceRef.current = null
    }
  }, [cellId, isDark])

  return {
    mapRef,
    latitude,
    longitude,
    hasCell: !!cell
  }
}

