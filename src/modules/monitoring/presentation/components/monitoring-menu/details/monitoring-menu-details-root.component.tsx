import { ReactNode } from 'react'

interface MonitoringMenuDetailsRootProps {
  children: ReactNode
}

export function MonitoringMenuDetailsRoot({ children }: MonitoringMenuDetailsRootProps) {
  return (
    <div className="flex flex-col gap-4 px-4 py-3 max-h-[380px] overflow-y-auto overscroll-contain">
      {children}
    </div>
  )
}
