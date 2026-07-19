'use client'

import { useEffect, useRef, type ReactNode } from 'react'

interface InfractionsSidebarItemRootProps {
  isSelected: boolean
  onSelect: () => void
  children: ReactNode
}

export function InfractionsSidebarItemRoot({
  isSelected,
  onSelect,
  children,
}: InfractionsSidebarItemRootProps) {
  const ref = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (isSelected) {
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [isSelected])

  return (
    <button
      ref={ref}
      onClick={onSelect}
      className={`
        group w-full flex flex-col gap-1.5 p-2 rounded-lg border text-left
        transition-all duration-150 shrink-0
        ${
          isSelected
            ? 'border-primary/60 bg-primary/5 ring-1 ring-primary/20'
            : 'border-border/40 bg-transparent hover:bg-muted/30 hover:border-border/70'
        }
      `}
    >
      {children}
    </button>
  )
}

