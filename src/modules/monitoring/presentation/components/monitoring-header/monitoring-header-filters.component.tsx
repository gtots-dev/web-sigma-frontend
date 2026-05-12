import type { ReactNode } from 'react'

interface MonitoringHeaderFiltersComponentProps {
  children: ReactNode
}

export function MonitoringHeaderFiltersComponent({
  children
}: MonitoringHeaderFiltersComponentProps) {
  return (
    <div className="flex items-center gap-2 flex-col md:flex-row sm:gap-4 lg:justify-end w-full 2xl:w-auto">
      {children}
    </div>
  )
}
