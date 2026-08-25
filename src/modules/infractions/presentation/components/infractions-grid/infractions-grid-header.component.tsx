'use client'

import type { ReactNode } from 'react'

interface InfractionsGridHeaderProps {
  children?: ReactNode
}

export function InfractionsGridHeaderComponent({
  children
}: InfractionsGridHeaderProps) {
  return (
    <div className="w-full h-[24px] px-2 bg-muted/40 border-b border-border/60 flex items-center justify-between gap-2 z-10 shrink-0">
      {children}
    </div>
  )
}
