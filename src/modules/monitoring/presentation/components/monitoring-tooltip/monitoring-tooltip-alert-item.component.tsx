'use client'

interface MonitoringTooltipAlertItemProps {
  name: string
  level: number
}

export function MonitoringTooltipAlertItem({
  name,
  level
}: MonitoringTooltipAlertItemProps) {
  const dotColor =
    level >= 2
      ? 'bg-[rgb(var(--monitoring-error))]'
      : level === 1
      ? 'bg-[rgb(var(--monitoring-warning))]'
      : 'bg-[rgb(var(--monitoring-ok))]'

  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center h-[15px] gap-3 ps-1">
        <span className={`h-[7px] w-[7px] rounded-full shrink-0 ${dotColor}`} />
        <span
          className="text-[11.5px] font-medium text-foreground leading-[15px] truncate"
          title={name}
        >
          {name}
        </span>
      </div>
    </div>
  )
}
