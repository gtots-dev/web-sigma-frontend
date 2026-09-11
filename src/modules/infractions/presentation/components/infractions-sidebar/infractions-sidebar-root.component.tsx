import type { ReactNode } from 'react'

interface InfractionsSidebarRootProps {
  children: ReactNode
}

export function InfractionsSidebarRoot({ children }: InfractionsSidebarRootProps) {
  return (
    <div className="shrink-0 w-[300px] flex flex-col min-h-0 bg-card border rounded-xl overflow-hidden">
      {children}
    </div>
  )
}
