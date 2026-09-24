'use client'

import { useEffect, useRef } from 'react'
import { tileLayer } from 'leaflet'
import type { Map, TileLayer } from 'leaflet'

interface UseMonitoringMapTilesProps {
  mapInstance: Map | null
  isReady: boolean
  isDark: boolean
  mapOpacity: number
}

export function useMonitoringMapTiles({
  mapInstance,
  isReady,
  isDark,
  mapOpacity
}: UseMonitoringMapTilesProps) {
  const tileLayerRef = useRef<TileLayer | null>(null)

  // Adiciona e sincroniza a camada de tiles do OpenStreetMap Monocromático
  useEffect(() => {
    if (!mapInstance || !isReady) return

    if (tileLayerRef.current) {
      mapInstance.removeLayer(tileLayerRef.current)
    }

    const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    const attribution =
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    const className = isDark ? 'osm-dark-tile' : 'osm-light-tile'

    tileLayerRef.current = tileLayer(tileUrl, {
      attribution,
      maxZoom: 19,
      opacity: mapOpacity,
      className
    }).addTo(mapInstance)
  }, [mapInstance, isReady, isDark, mapOpacity])

  // Sincronização em tempo real da opacidade dos tiles sem recriar a camada
  useEffect(() => {
    if (tileLayerRef.current) {
      tileLayerRef.current.setOpacity(mapOpacity)
    }
  }, [mapOpacity])

  return tileLayerRef.current
}
