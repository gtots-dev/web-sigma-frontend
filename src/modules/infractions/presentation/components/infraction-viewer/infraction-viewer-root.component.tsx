import type { ReactNode } from 'react'

interface InfractionViewerRootProps {
  children: ReactNode
}

export function InfractionViewerRoot({ children }: InfractionViewerRootProps) {
  return (
    <div className="flex flex-col flex-1 min-w-0 min-h-0 bg-muted/10 border rounded-xl overflow-hidden">
      {children}
    </div>
  )
}
