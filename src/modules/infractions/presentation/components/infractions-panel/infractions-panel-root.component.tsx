import type { ReactNode } from 'react'

interface InfractionsPanelRootProps {
  children: ReactNode
  className?: string
}

export function InfractionsPanelRoot({ children, className = '' }: InfractionsPanelRootProps) {
  return (
    <div className={`relative overflow-hidden flex flex-1 flex-row min-h-0 min-w-0 h-full w-full gap-3 ${className}`}>
      {children}
    </div>
  )
}
