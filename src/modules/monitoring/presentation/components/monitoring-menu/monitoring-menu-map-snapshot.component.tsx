'use client'

import type { MonitoringCell } from '../../../domain/interfaces/monitoring-cell.interface'
import { useMonitoringMenuMapSnapshot } from '../../hooks/use-monitoring-menu-map-snapshot.hook'

interface MonitoringMenuMapSnapshotProps {
  cell?: MonitoringCell
}

export function MonitoringMenuMapSnapshot({
  cell
}: MonitoringMenuMapSnapshotProps) {
  const { mapRef, latitude, longitude, hasCell } = useMonitoringMenuMapSnapshot(
    { cell }
  )

  if (!hasCell) return null

  return (
    <div className="relative w-full h-56 rounded-lg overflow-hidden border border-border/80 shadow-xs bg-zinc-100 dark:bg-zinc-900 select-none">
      <div ref={mapRef} className="w-full h-full min-h-0" />
      <div className="absolute bottom-2 left-2 z-20 bg-black/75 backdrop-blur-xs text-white text-[9px] font-mono px-2 py-0.5 rounded shadow-xs">
        Latitude: {latitude.toFixed(4)} | Longitude: {longitude.toFixed(4)}
      </div>
    </div>
  )
}
