'use client'

import { useEffect, useRef } from 'react'
import { circle, rectangle, polygon, latLng, point } from 'leaflet'
import type { Map, LayerGroup, LatLngBounds, Circle, Rectangle, Polygon } from 'leaflet'
import type { MonitoringMapCell } from '../../domain/interfaces/monitoring-cell.interface'

type ShapeLayer = Circle | Rectangle | Polygon

interface UseMonitoringMapGroupProps {
  mapInstance: Map | null
  groupRadiusLayer: LayerGroup | null
  isReady: boolean
  mapCells: MonitoringMapCell[]
  isDark: boolean
  groupShape: 'circle' | 'line'
  groupMarginMeters?: number
  outerOpacity: number
  setIsMapPanned?: (panned: boolean) => void
  setResetMapCenterHandler?: (fn: (() => void) | null) => void
}

export function useMonitoringMapGroup({
  mapInstance,
  groupRadiusLayer,
  isReady,
  mapCells,
  isDark,
  groupShape,
  groupMarginMeters = 10,
  outerOpacity,
  setIsMapPanned,
  setResetMapCenterHandler
}: UseMonitoringMapGroupProps) {
  const hasFittedBoundsRef = useRef(false)
  const groupBoundsRef = useRef<LatLngBounds | null>(null)
  const setIsMapPannedRef = useRef(setIsMapPanned)
  const setResetMapCenterHandlerRef = useRef(setResetMapCenterHandler)

  useEffect(() => {
    setIsMapPannedRef.current = setIsMapPanned
    setResetMapCenterHandlerRef.current = setResetMapCenterHandler
  })

  useEffect(() => {
    if (
      !mapInstance ||
      !groupRadiusLayer ||
      !isReady ||
      !mapCells ||
      !mapCells.length
    )
      return

    const validMapCells = mapCells.filter((m) => {
      const lat = m.latitude
      const lng = m.longitude
      return (
        lat !== undefined &&
        lat !== null &&
        !isNaN(lat) &&
        lng !== undefined &&
        lng !== null &&
        !isNaN(lng)
      )
    })

    if (!validMapCells.length) return

    groupRadiusLayer.clearLayers()

    const MARGIN_METERS = groupMarginMeters
    const outerWorldRing: [number, number][] = [
      [89, -179],
      [89, 179],
      [-89, 179],
      [-89, -179]
    ]

    let innerRing: [number, number][] = []
    let groupShapeLayer: ShapeLayer | null = null

    if (groupShape === 'circle') {
      let sumLat = 0
      let sumLng = 0
      validMapCells.forEach((m) => {
        sumLat += m.latitude
        sumLng += m.longitude
      })
      const centerLat = sumLat / validMapCells.length
      const centerLng = sumLng / validMapCells.length
      const centerPoint = latLng(centerLat, centerLng)

      let maxDistanceMeters = 0
      validMapCells.forEach((m) => {
        const lat = m.latitude
        const lng = m.longitude
        const distance = centerPoint.distanceTo({
          lat,
          lng
        })
        if (distance > maxDistanceMeters) {
          maxDistanceMeters = distance
        }
      })

      const totalRadiusMeters = maxDistanceMeters + MARGIN_METERS

      // Borda do círculo de agrupamento
      groupShapeLayer = circle([centerLat, centerLng], {
        radius: totalRadiusMeters,
        color: isDark ? '#38bdf8' : '#0284c7',
        weight: 2,
        dashArray: '6, 6',
        fillColor: isDark ? '#0284c7' : '#38bdf8',
        fillOpacity: 0.05,
        interactive: false
      }).addTo(groupRadiusLayer)

      const steps = 64
      const radiusDegLat = totalRadiusMeters / 111000
      const radiusDegLng =
        totalRadiusMeters / (111000 * Math.cos((centerLat * Math.PI) / 180))

      for (let i = 0; i < steps; i++) {
        const angle = (i * 2 * Math.PI) / steps
        const lat = centerLat + radiusDegLat * Math.sin(angle)
        const lng = centerLng + radiusDegLng * Math.cos(angle)
        innerRing.push([lat, lng])
      }
    } else {
      // Modo Linha / Quadro
      let minLat = Infinity,
        maxLat = -Infinity,
        minLng = Infinity,
        maxLng = -Infinity

      validMapCells.forEach((m) => {
        const lat = m.latitude
        const lng = m.longitude
        if (lat < minLat) minLat = lat
        if (lat > maxLat) maxLat = lat
        if (lng < minLng) minLng = lng
        if (lng > maxLng) maxLng = lng
      })

      const marginDegLat = MARGIN_METERS / 111000
      const centerLat = (minLat + maxLat) / 2
      const marginDegLng =
        MARGIN_METERS / (111000 * Math.cos((centerLat * Math.PI) / 180))

      const bounds: [[number, number], [number, number]] = [
        [minLat - marginDegLat, minLng - marginDegLng],
        [maxLat + marginDegLat, maxLng + marginDegLng]
      ]

      groupShapeLayer = rectangle(bounds, {
        color: isDark ? '#38bdf8' : '#0284c7',
        weight: 2,
        dashArray: '6, 6',
        fillColor: isDark ? '#0284c7' : '#38bdf8',
        fillOpacity: 0.05,
        interactive: false
      }).addTo(groupRadiusLayer)

      innerRing = [
        [minLat - marginDegLat, minLng - marginDegLng],
        [maxLat + marginDegLat, minLng - marginDegLng],
        [maxLat + marginDegLat, maxLng + marginDegLng],
        [minLat - marginDegLat, maxLng + marginDegLng]
      ]
    }

    // Camada de Transparência Externa
    if (outerOpacity > 0 && innerRing.length > 0) {
      const themeBackgroundColor = isDark ? '#09090b' : '#fafafa'
      polygon([outerWorldRing, innerRing], {
        color: 'transparent',
        fillColor: themeBackgroundColor,
        fillOpacity: outerOpacity,
        interactive: false
      }).addTo(groupRadiusLayer)
    }

    // Registra a função de enquadramento do raio e realiza o fit no carregamento inicial
    if (groupShapeLayer && mapInstance) {
      const bounds = groupShapeLayer.getBounds()
      groupBoundsRef.current = bounds

      const resetToRadiusBounds = () => {
        if (mapInstance && groupBoundsRef.current) {
          mapInstance.fitBounds(groupBoundsRef.current, {
            padding: [30, 30],
            animate: true
          })
        }
      }

      if (setResetMapCenterHandlerRef.current) {
        setResetMapCenterHandlerRef.current(resetToRadiusBounds)
      }

      if (!hasFittedBoundsRef.current) {
        hasFittedBoundsRef.current = true
        resetToRadiusBounds()
      }
    }
  }, [
    mapInstance,
    groupRadiusLayer,
    isReady,
    mapCells,
    isDark,
    groupShape,
    groupMarginMeters,
    outerOpacity
  ])

  // Listener para detectar quando o mapa é movido/zoomado para fora do enquadramento do raio
  useEffect(() => {
    if (!mapInstance) return

    const handleCheckPan = () => {
      if (!groupBoundsRef.current || !mapInstance || !setIsMapPannedRef.current)
        return
      const bounds = groupBoundsRef.current
      const currentCenter = mapInstance.getCenter()
      const boundsCenter = bounds.getCenter()
      const distMeters = mapInstance.distance(currentCenter, boundsCenter)

      const targetZoom = mapInstance.getBoundsZoom(bounds, false, point(30, 30))
      const currentZoom = mapInstance.getZoom()

      const panned =
        distMeters > 50 || Math.abs(currentZoom - targetZoom) >= 0.5
      setIsMapPannedRef.current(panned)
    }

    mapInstance.on('move', handleCheckPan)
    mapInstance.on('zoom', handleCheckPan)

    return () => {
      mapInstance.off('move', handleCheckPan)
      mapInstance.off('zoom', handleCheckPan)
    }
  }, [mapInstance])
}
