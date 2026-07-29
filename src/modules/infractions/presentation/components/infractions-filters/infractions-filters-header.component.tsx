'use client'

import type { ReactNode } from 'react'
import { CollapsibleTrigger } from '@/modules/shared/presentation/components/shadcn/collapsible'

interface InfractionsFiltersHeaderProps {
  children?: ReactNode
}

export function InfractionsFiltersHeaderComponent({
  children
}: InfractionsFiltersHeaderProps) {
  return (
    <CollapsibleTrigger asChild>
      <div className="flex items-center justify-between gap-2.5 sm:gap-3 px-3.5 py-3 sm:px-5 sm:py-3.5 bg-muted/20 hover:bg-muted/40 cursor-pointer select-none border-b border-border/40 transition-colors w-full">
        {children}
      </div>
    </CollapsibleTrigger>
  )
}
