'use client'

import { Hash, AlertTriangle } from 'lucide-react'
import { MonitoringCell } from '../../../domain/interfaces/monitoring-cell.interface'

interface MonitoringMenuMetaProps {
  id: string
  errorCount?: number
  status: MonitoringCell['status']
}

export function MonitoringMenuMeta({ id, errorCount, status }: MonitoringMenuMetaProps) {
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

      {errorCount !== undefined && errorCount > 0 && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <AlertTriangle size={11} className="text-muted-foreground" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Log de Erros
            </span>
          </div>
          <span className="text-[10px] font-bold text-[rgb(var(--monitoring-error))] bg-[rgb(var(--monitoring-error)/0.1)] px-2 py-0.5 rounded">
            {errorCount} {errorCount === 1 ? 'Erro' : 'Erros'}
          </span>
        </div>
      )}
    </div>
  )
}
