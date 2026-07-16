'use client'

import { Wifi, WifiOff } from 'lucide-react'
import { MonitoringCell } from '../../../domain/interfaces/monitoring-cell.interface'

interface MonitoringMenuConnectionProps {
  connectionStatus: MonitoringCell['connectionStatus']
}

export function MonitoringMenuConnection({ connectionStatus }: MonitoringMenuConnectionProps) {
  const isOffline = connectionStatus === 'offline'

  return (
    <div className="flex flex-col gap-3 px-4 py-3 bg-muted/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Wifi size={12} className="text-muted-foreground" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Conectividade
          </span>
        </div>
        {isOffline ? (
          <div className="flex items-center gap-1.5 px-2 py-1 bg-[rgb(var(--monitoring-offline)/0.1)]">
            <WifiOff size={12} className="text-[rgb(var(--monitoring-offline))]" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-[rgb(var(--monitoring-offline))]">
              Offline
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 px-2 py-1 bg-primary-500/10">
            <Wifi size={12} className="text-primary-500" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary-500">
              Online
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
