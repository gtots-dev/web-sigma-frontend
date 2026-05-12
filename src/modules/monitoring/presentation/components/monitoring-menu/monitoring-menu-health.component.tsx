'use client'

import { Activity, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react'
import { MonitoringStatus } from '../../../domain/interfaces/monitoring-cell.interface'
import { MonitoringMenuStatusBar } from './monitoring-menu-status-bar.component'


interface MonitoringMenuHealthProps {
  status: MonitoringStatus
}

const statusConfig = {
  ok: {
    label: 'Normal',
    Icon: CheckCircle2,
    color: 'text-[rgb(var(--monitoring-ok))]',
    bg: 'bg-[rgb(var(--monitoring-ok)/0.1)]'
  },
  warning: {
    label: 'Atenção',
    Icon: AlertTriangle,
    color: 'text-[rgb(var(--monitoring-warning))]',
    bg: 'bg-[rgb(var(--monitoring-warning)/0.1)]'
  },
  error: {
    label: 'Crítico',
    Icon: XCircle,
    color: 'text-[rgb(var(--monitoring-error))]',
    bg: 'bg-[rgb(var(--monitoring-error)/0.1)]'
  }
}

export function MonitoringMenuHealth({ status }: MonitoringMenuHealthProps) {
  const { label, Icon, color, bg } = statusConfig[status]

  return (
    <div className="flex flex-col gap-3 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Activity size={12} className="text-muted-foreground" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Saúde do Sistema
          </span>
        </div>
        <div className={`flex items-center gap-1.5 px-2 py-1 ${bg}`}>
          <Icon size={12} className={color} />
          <span className={`text-[10px] font-bold uppercase tracking-wider ${color}`}>
            {label}
          </span>
        </div>
      </div>

      <MonitoringMenuStatusBar status={status} />
    </div>
  )
}
