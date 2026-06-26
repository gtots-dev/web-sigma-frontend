'use client'

import { Activity, Wifi, X } from 'lucide-react'
import { MonitoringLegendItem } from './monitoring-legend-item.component'
import { MonitoringLegendSection } from './monitoring-legend-section.component'

interface MonitoringLegendContentProps {
  onMinimize?: () => void
}

export function MonitoringLegendContent({ onMinimize }: MonitoringLegendContentProps) {
  return (
    <div className="select-none">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-border/40">
        <span className="text-xs font-semibold text-foreground">Legendas</span>
        {onMinimize && (
          <button
            onClick={onMinimize}
            className="text-muted-foreground hover:text-foreground transition-colors p-0.5 rounded hover:bg-muted/50"
            title="Minimizar"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Body */}
      <div className="p-3 flex flex-col gap-2.5">
        <MonitoringLegendSection
          title="Saúde do Sistema"
          icon={<Activity size={10} className="text-muted-foreground" />}
        >
          <MonitoringLegendItem
            color="bg-[rgb(var(--monitoring-ok))]"
            label="Normal"
          />
          <MonitoringLegendItem
            color="bg-[rgb(var(--monitoring-warning))]"
            label="Atenção"
          />
          <MonitoringLegendItem
            color="bg-[rgb(var(--monitoring-error))]"
            label="Crítico"
          />
        </MonitoringLegendSection>

        <div className="h-px bg-border/40" />

        <MonitoringLegendSection
          title="Conectividade"
          icon={<Wifi size={10} className="text-muted-foreground" />}
        >
          <MonitoringLegendItem color="bg-primary-500" label="Online" />
          <MonitoringLegendItem
            color="bg-[rgb(var(--monitoring-offline))]"
            label="Offline"
          />
        </MonitoringLegendSection>
      </div>
    </div>
  )
}
