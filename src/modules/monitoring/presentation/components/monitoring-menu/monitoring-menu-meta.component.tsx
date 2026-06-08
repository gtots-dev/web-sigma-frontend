'use client'

import { Hash } from 'lucide-react'
import { MonitoringCell } from '../../../domain/interfaces/monitoring-cell.interface'

interface MonitoringMenuMetaProps {
  id: string
  status: MonitoringCell['status']
}

export function MonitoringMenuMeta({ id, status }: MonitoringMenuMetaProps) {
  return (
    <div className="flex flex-col gap-2.5 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Hash size={11} className="text-muted-foreground" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            ID Sistema
          </span>
        </div>
        <span className="text-[10px] font-mono font-semibold text-foreground bg-muted px-2 py-0.5 rounded">
          {id}
        </span>
      </div>
    </div>
  )
}
