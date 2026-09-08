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
      type="button"
      onClick={onSelect}
      className={`
        relative w-full aspect-video h-auto rounded-md border overflow-hidden
        transition-all duration-150 cursor-pointer select-none
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
