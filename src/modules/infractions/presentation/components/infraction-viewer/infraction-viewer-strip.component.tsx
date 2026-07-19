import type { ReactNode } from 'react'

interface InfractionViewerStripProps {
  children: ReactNode
}

export function InfractionViewerStrip({ children }: InfractionViewerStripProps) {
  return (
    <div className="shrink-0 border-t border h-[100px]">
      {children}
    </div>
  )
}
