'use client'

import { useState } from 'react'
import { Activity, Wifi, ChevronUp, List, Info } from 'lucide-react'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { MonitoringLegendItem, MonitoringLegendSection } from './monitoring-legend-item.component'
import { useMonitoringContext } from '../monitoring/monitoring-context.component'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/modules/shared/presentation/components/shadcn/popover'

export function MonitoringLegend() {
  const { isMaximized } = useMonitoringContext()
  const [isMinimized, setIsMinimized] = useState(true)

  const content = (
    <div className="flex flex-col gap-3 p-3 select-none">
      <div className="flex items-center justify-between gap-6 mb-0.5">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/40">
          Legendas
        </span>
        {!isMaximized && (
          <button
            onClick={() => setIsMinimized(true)}
            className="text-muted-foreground hover:text-foreground transition-colors p-0.5 rounded hover:bg-muted/50"
            title="Minimizar"
          >
            <ChevronUp size={14} />
          </button>
        )}
      </div>

      <div className="flex flex-col gap-2.5">
        <MonitoringLegendSection 
          title="Saúde do Sistema" 
          icon={<Activity size={10} className="text-muted-foreground" />}
        >
          <MonitoringLegendItem color="bg-[rgb(var(--monitoring-ok))]" label="Normal" />
          <MonitoringLegendItem color="bg-[rgb(var(--monitoring-warning))]" label="Atenção" />
          <MonitoringLegendItem color="bg-[rgb(var(--monitoring-error))]" label="Crítico" />
        </MonitoringLegendSection>

        <div className="h-px bg-border/40" />

        <MonitoringLegendSection 
          title="Conectividade" 
          icon={<Wifi size={10} className="text-muted-foreground" />}
        >
          <MonitoringLegendItem color="bg-primary-500" label="Online" />
          <MonitoringLegendItem color="bg-[rgb(var(--monitoring-offline))]" label="Offline" />
        </MonitoringLegendSection>
      </div>
    </div>
  )

  if (isMaximized) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 bg-card/60 backdrop-blur-md border-border/40 shadow-sm"
            title="Ver legendas"
          >
            <Info size={16} className="text-muted-foreground" />
          </Button>
        </PopoverTrigger>
        <PopoverContent side="top" align="start" className="w-52 p-0 bg-card/90 backdrop-blur-xl border-border/40 z-[200]">
          {content}
        </PopoverContent>
      </Popover>
    )
  }

  if (isMinimized) {
    return (
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsMinimized(false)}
        className="absolute top-14 right-4 z-20 h-8 w-8 bg-card/60 backdrop-blur-md border-border/40 shadow-sm hover:bg-card/80 transition-all"
        title="Mostrar legendas"
      >
        <List size={14} className="text-muted-foreground" />
      </Button>
    )
  }

  return (
    <div className="absolute top-14 right-4 z-20 flex flex-col gap-3 p-3 bg-card/60 backdrop-blur-md border border-border/40 rounded-lg shadow-sm select-none animate-in fade-in zoom-in-95 duration-200">
      {content}
    </div>
  )
}
