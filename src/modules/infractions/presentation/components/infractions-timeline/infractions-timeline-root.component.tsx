import type { ReactNode } from 'react'

interface InfractionsTimelineRootProps {
  children: ReactNode
}

export function InfractionsTimelineRoot({ children }: InfractionsTimelineRootProps) {
  return (
    <div
      className="grid grid-cols-2 gap-2 overflow-y-auto p-0.5 max-h-[170px] pr-1.5
        [&::-webkit-scrollbar]:w-1
        [&::-webkit-scrollbar-track]:bg-transparent
        [&::-webkit-scrollbar-thumb]:bg-border/60
        [&::-webkit-scrollbar-thumb]:rounded-full"
    >
      {children}
    </div>
  )
}
