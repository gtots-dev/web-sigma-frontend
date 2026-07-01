import type { ReactNode } from 'react'

interface MonitoringHeaderFiltersComponentProps {
  children: ReactNode
}

export function MonitoringHeaderFiltersComponent({
  children
}: MonitoringHeaderFiltersComponentProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:flex md:flex-row md:flex-wrap items-center gap-2 sm:gap-4 lg:justify-end w-full 2xl:w-auto">
      {children}
    </div>
  )
}
