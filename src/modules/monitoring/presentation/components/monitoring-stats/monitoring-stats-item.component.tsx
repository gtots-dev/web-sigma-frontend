'use client'

interface MonitoringStatsItemProps {
  value: number
  label: string
  variant: 'primary' | 'muted'
}

export function MonitoringStatsItem({ value, label, variant }: MonitoringStatsItemProps) {
  const styles =
    variant === 'primary'
      ? 'bg-primary-500/10 border-primary-500/20'
      : 'bg-muted/50 border-border/50'

  const valueStyles =
    variant === 'primary'
      ? 'text-primary-500'
      : 'text-muted-foreground'

  const labelStyles =
    variant === 'primary'
      ? 'text-primary-500/80'
      : 'text-muted-foreground/80'

  return (
    <div className={`flex items-center gap-1.5 px-2 py-0.5 border rounded-md ${styles}`}>
      <span className={`text-[10px] font-bold tabular-nums ${valueStyles}`}>
        {value}
      </span>
      <span className={`text-[9px] font-bold uppercase tracking-tight ${labelStyles}`}>
        {label}
      </span>
    </div>
  )
}
