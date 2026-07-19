import type { ReactNode } from 'react'

interface InfractionsTimelineItemLabelProps {
  children: ReactNode
}

export function InfractionsTimelineItemLabel({ children }: InfractionsTimelineItemLabelProps) {
  return (
    <span className="absolute bottom-0 left-0 right-0 text-[7px] font-mono text-center bg-black/50 text-white leading-none py-0.5 truncate">
      {children}
    </span>
  )
}
