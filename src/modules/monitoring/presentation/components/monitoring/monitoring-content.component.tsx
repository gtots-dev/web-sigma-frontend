'use client'

import { ReactNode } from 'react'
import { useMonitoringContext } from './monitoring-context.component'

interface MonitoringContentProps {
  children?: ReactNode
}

export function MonitoringContent({ children }: MonitoringContentProps) {
  const { isMaximized } = useMonitoringContext()

  return (
    <div className="flex flex-1 w-full flex-col">
      <div
        className={`flex flex-1 h-full w-full relative bg-zinc-50 dark:bg-zinc-900 transition-all duration-500 ${
          isMaximized ? 'p-0' : 'border rounded-xl shadow-sm'
        }`}
      >
        {children}
      </div>
    </div>
  )
}
