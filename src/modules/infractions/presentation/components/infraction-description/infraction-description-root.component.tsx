import type { ReactNode } from 'react'

interface InfractionDescriptionRootProps {
  children: ReactNode
}

export function InfractionDescriptionRoot({ children }: InfractionDescriptionRootProps) {
  return (
    <div className="flex-1 w-full flex flex-col bg-card border rounded-xl overflow-hidden min-h-0">
      {children}
    </div>
  )
}
