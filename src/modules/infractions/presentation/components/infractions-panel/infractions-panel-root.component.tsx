import type { ReactNode } from 'react'

interface InfractionsPanelRootProps {
  children: ReactNode
}

export function InfractionsPanelRoot({ children }: InfractionsPanelRootProps) {
  return (
    <div className="flex flex-1 flex-row min-h-0 min-w-0 w-full gap-3">
      {children}
    </div>
  )
}
