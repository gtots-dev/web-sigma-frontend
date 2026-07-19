import type { ReactNode } from 'react'

interface InfractionDescriptionRootProps {
  children: ReactNode
}

export function InfractionDescriptionRoot({ children }: InfractionDescriptionRootProps) {
  return (
    <div className="shrink-0 w-[300px] flex flex-col bg-card border rounded-xl overflow-hidden min-h-0">
      {children}
    </div>
  )
}
