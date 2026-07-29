'use client'

import type { ReactNode } from 'react'
import { Collapsible } from '@/modules/shared/presentation/components/shadcn/collapsible'

interface InfractionsFiltersRootProps {
  children: ReactNode
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function InfractionsFiltersRoot({
  children,
  defaultOpen = true,
  open,
  onOpenChange
}: InfractionsFiltersRootProps) {
  return (
    <Collapsible
      defaultOpen={defaultOpen}
      open={open}
      onOpenChange={onOpenChange}
      className="w-full bg-card/70 backdrop-blur-md border border-border/60 shadow-xs rounded-xl overflow-hidden transition-all duration-300 group"
    >
      {children}
    </Collapsible>
  )
}
