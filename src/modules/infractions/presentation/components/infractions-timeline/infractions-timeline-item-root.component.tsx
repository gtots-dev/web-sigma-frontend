import type { ReactNode } from 'react'

interface InfractionsTimelineItemRootProps {
  isActive: boolean
  onSelect?: () => void
  children: ReactNode
}

export function InfractionsTimelineItemRoot({
  isActive,
  onSelect,
  children
}: InfractionsTimelineItemRootProps) {
  return (
    <button
      onClick={onSelect}
      className={`
        shrink-0 relative rounded-md border overflow-hidden
        transition-all duration-150 h-full w-24 aspect-video cursor-pointer select-none
        ${
          isActive
            ? 'border-primary-500 ring-2 ring-primary-500/50 opacity-100'
            : 'border-border/40 hover:border-border/80 opacity-60 hover:opacity-100'
        }
      `}
    >
      {children}
    </button>
  )
}
