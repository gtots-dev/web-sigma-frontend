import type { ReactNode } from 'react'

interface InfractionsTimelineItemRootProps {
  isActive: boolean
  onSelect: () => void
  children: ReactNode
}

export function InfractionsTimelineItemRoot({
  isActive,
  onSelect,
  children,
}: InfractionsTimelineItemRootProps) {
  return (
    <button
      onClick={onSelect}
      className={`
        shrink-0 relative rounded-md border overflow-hidden
        transition-all duration-150 h-full
        ${
          isActive
            ? 'border-primary ring-1 ring-primary'
            : 'border-border/40 hover:border-border/80 opacity-60 hover:opacity-90'
        }
      `}
    >
      {children}
    </button>
  )
}
