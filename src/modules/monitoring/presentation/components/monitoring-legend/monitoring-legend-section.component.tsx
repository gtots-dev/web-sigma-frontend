'use client'

import type { ReactNode } from 'react'

interface MonitoringLegendSectionProps {
  icon: ReactNode
  title: string
  children: ReactNode
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
      <div className="flex flex-col gap-1.5">{children}</div>
    </div>
  )
}
