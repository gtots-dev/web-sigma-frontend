'use client'

import { MapPinned } from 'lucide-react'

interface MonitoringMenuHeaderProps {
  name: string
}

export function MonitoringMenuHeader({ name }: MonitoringMenuHeaderProps) {
  return (
    <div className="flex items-center gap-3 px-4 pt-4 pb-3">
      <div className="flex items-center justify-center h-9 w-9 border bg-muted/40 shrink-0 rounded-lg">
        <MapPinned size={16} className="text-muted-foreground" />
      </div>
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
          Ponto
        </span>
        <span className="text-sm font-bold text-foreground truncate">
          {name}
        </span>
      </div>
    </div>
  )
}
