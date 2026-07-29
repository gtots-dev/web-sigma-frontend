'use client'

import type { ReactNode } from 'react'
import { ArrowUp, ArrowDown } from 'lucide-react'

interface InfractionsPaginationLoaderHintProps {
  hasMore?: boolean
  position?: 'top' | 'bottom'
  children?: ReactNode
}

export function InfractionsPaginationLoaderHintComponent({
  hasMore = true,
  position = 'top',
  children
}: InfractionsPaginationLoaderHintProps) {
  if (!hasMore) return null

  const isTop = position === 'top'
  const defaultLabel = isTop
    ? 'Role para cima para carregar infrações mais recentes'
    : 'Role para baixo para carregar mais infrações'

  return (
    <div
      className="col-span-full flex flex-col items-center justify-center py-6 text-muted-foreground/70"
      style={{ overflowAnchor: 'none' }}
    >
      <div className="flex items-center gap-2 text-xs font-medium bg-muted/30 hover:bg-muted/50 px-4 py-1.5 rounded-full border border-border/30 transition-all duration-200">
        {isTop ? (
          <ArrowUp className="w-3.5 h-3.5 animate-bounce text-primary" />
        ) : (
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-primary" />
        )}
        <span>{children ?? defaultLabel}</span>
      </div>
    </div>
  )
}
