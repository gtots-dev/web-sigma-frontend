'use client'

interface MonitoringTooltipAlertItemProps {
  name: string
  value: string
  level: number
}

export function MonitoringTooltipAlertItem({ name, value, level }: MonitoringTooltipAlertItemProps) {
  const dotColor = level >= 2
    ? 'bg-[rgb(var(--monitoring-error))]'
    : 'bg-[rgb(var(--monitoring-warning))]'

  const valueColor = level >= 2
    ? 'bg-red-500/10 text-red-500 border border-red-500/20'
    : 'bg-amber-500/10 text-amber-600 border border-amber-500/20 dark:text-amber-400'

  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center h-[15px] gap-3">
        <span className={`h-[7px] w-[7px] rounded-full shrink-0 ${dotColor}`} />
        <span className="text-[11.5px] font-medium text-foreground leading-[15px] truncate" title={name}>
          {name}
        </span>
      </div>
      <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded shrink-0 mt-0.5 ${valueColor}`}>
        {value}
      </span>
    </div>
  )
}
