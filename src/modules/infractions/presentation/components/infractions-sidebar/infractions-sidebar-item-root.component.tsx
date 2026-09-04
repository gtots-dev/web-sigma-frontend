'use client'

import { useEffect, useRef, type ReactNode } from 'react'

interface InfractionsSidebarItemRootProps {
  isSelected: boolean
  isViewed?: boolean
  onSelect: () => void
  children: ReactNode
}

export function InfractionsSidebarItemRoot({
  isSelected,
  isViewed = true,
  onSelect,
  children
}: InfractionsSidebarItemRootProps) {
  const ref = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (isSelected) {
      const timer = setTimeout(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }, 50)
      return () => clearTimeout(timer)
    }
  }, [isSelected])

  return (
    <button
      ref={ref}
      onClick={onSelect}
      className={`
        group w-full flex flex-row items-center gap-2.5 p-2 rounded-lg border text-left
        shrink-0 relative overflow-hidden transition-colors duration-150
        ${
          isSelected
            ? 'border-primary-500 bg-primary-500/10'
            : !isViewed
            ? 'border-primary-500/40 bg-primary-500/5 hover:bg-primary-500/10'
            : 'border-border/50 bg-card hover:bg-primary-500/10 hover:border-primary-500/40'
        }
      `}
    >
      {isSelected ? (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-500 rounded-r-full" />
      ) : !isViewed ? (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-500/70 rounded-r-full" />
      ) : null}
      {children}
    </button>
  )
}
