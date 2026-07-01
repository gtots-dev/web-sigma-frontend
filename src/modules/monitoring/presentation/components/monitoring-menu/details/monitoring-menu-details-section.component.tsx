import { ElementType, ReactNode } from 'react'

interface MonitoringMenuDetailsSectionProps {
  title: string
  icon: ElementType
  children: ReactNode
  hasTopBorder?: boolean
}

export function MonitoringMenuDetailsSection({ 
  title, 
  icon: Icon, 
  children,
  hasTopBorder = false 
}: MonitoringMenuDetailsSectionProps) {
  return (
    <div className={`flex flex-col gap-2 ${hasTopBorder ? 'border-t pt-3' : ''}`}>
      <div className="flex items-center gap-1.5 pl-1">
        <Icon size={12} className="text-muted-foreground shrink-0" />
        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          {title}
        </span>
      </div>
      <div className="flex flex-col gap-1.5">
        {children}
      </div>
    </div>
  )
}
