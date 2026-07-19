import type { ReactNode } from 'react'

interface InfractionsTimelineRootProps {
  children: ReactNode
}

export function InfractionsTimelineRoot({ children }: InfractionsTimelineRootProps) {
  return (
    <div
      className="flex gap-2 overflow-x-auto p-2 h-full
        [&::-webkit-scrollbar]:h-1
        [&::-webkit-scrollbar-track]:bg-transparent
        [&::-webkit-scrollbar-thumb]:bg-border/60
        [&::-webkit-scrollbar-thumb]:rounded-full"
    >
      {children}
    </div>
  )
}
