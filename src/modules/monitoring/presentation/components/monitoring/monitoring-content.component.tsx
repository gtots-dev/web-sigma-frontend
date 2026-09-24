'use client'

import { ReactNode } from 'react'
import { useMonitoringContext } from './monitoring-context.component'

interface MonitoringContentProps {
  children?: ReactNode
}

export function MonitoringContent({ children }: MonitoringContentProps) {
  const { isMaximized } = useMonitoringContext()

  return (
    <div
      className={`flex flex-1 min-h-0 h-full w-full relative bg-zinc-50 dark:bg-zinc-900 transition-all duration-500 ${
        isMaximized ? 'p-0' : 'border rounded-xl shadow-sm overflow-hidden'
      }`}
    >
      {children}
    </div>
  )
}
