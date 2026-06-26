'use client'

import { ChevronDown, type LucideIcon } from 'lucide-react'
import { getLevelColor } from '../../utils/monitoring-menu-details.utils'
import type { StatusGroup } from '../../../domain/interfaces/monitoring-dashboard-websocket.interface'
import { MonitoringTooltipAlertItem } from './monitoring-tooltip-alert-item.component'
import { getAlertElements } from '../../hooks/use-monitoring-tooltip.hook'

interface MonitoringTooltipEntityBlockProps {
  icon: LucideIcon
  name: string
  level: number
  hasData?: boolean
  offline: boolean
  items: StatusGroup[]
  isOpen?: boolean
  onToggle?: () => void
  selectedLevels?: number[]
}

const MAX_ALERTS = 4

export function MonitoringTooltipEntityBlock({
  name,
  level,
  hasData,
  offline,
  items,
  isOpen = true,
  onToggle,
  selectedLevels
}: MonitoringTooltipEntityBlockProps) {
  const alerts = getAlertElements(items).filter(
    (err) => !selectedLevels || selectedLevels.includes(err.level)
  )

  return (
    <div className="flex flex-col justify-center border border-zinc-200 dark:border-zinc-800 rounded-md bg-muted/5 dark:bg-zinc-950/10 overflow-hidden">
      <div 
        onClick={onToggle}
        className={`flex items-center gap-2 px-2.5 py-2 bg-background/60 dark:bg-zinc-900/50 ${onToggle ? 'cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800/60 select-none' : ''}`}
      >
        <span className="text-xs font-bold text-foreground truncate flex-1" title={name}>
          {name}
        </span>
        <span className={`h-2 w-2 rounded-full shrink-0 ${getLevelColor(level, hasData, offline)}`} />
        
        {onToggle && (
          <ChevronDown 
            size={12} 
            className={`text-muted-foreground transition-transform duration-200 shrink-0 ${
              isOpen ? '' : '-rotate-90'
            }`}
          />
        )}
      </div>

      {isOpen && (
        <div className="flex flex-col gap-y-1.5 border-t border-zinc-200 dark:border-zinc-800 p-2.5">
          {alerts.length === 0 ? (
            <span className="text-[10px] text-muted-foreground italic">Sem informações</span>
          ) : (
            <>
              {alerts.slice(0, MAX_ALERTS).map((err, i) => (
                <MonitoringTooltipAlertItem key={i} {...err} />
              ))}
              {alerts.length > MAX_ALERTS && (
                <p className="text-[9px] text-muted-foreground italic pt-1">
                  + {alerts.length - MAX_ALERTS} ocorrência{alerts.length - MAX_ALERTS > 1 ? 's' : ''}
                </p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}
