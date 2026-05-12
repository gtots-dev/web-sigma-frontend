'use client'

interface MonitoringLegendItemProps {
  color: string
  label: string
}

export function MonitoringLegendItem({ color, label }: MonitoringLegendItemProps) {
  return (
    <div className="flex items-center gap-2">
      <div className={`h-2 w-2 rounded-full ${color} shadow-[0_0_4px_rgba(0,0,0,0.1)]`} />
      <span className="text-[10px] font-semibold text-foreground/80">
        {label}
      </span>
    </div>
  )
}

interface MonitoringLegendSectionProps {
  icon: React.ReactNode
  title: string
  children: React.ReactNode
}

export function MonitoringLegendSection({ icon, title, children }: MonitoringLegendSectionProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1.5 opacity-70">
        {icon}
        <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground whitespace-nowrap">
          {title}
        </span>
      </div>
      <div className="flex flex-col gap-1.5">
        {children}
      </div>
    </div>
  )
}
