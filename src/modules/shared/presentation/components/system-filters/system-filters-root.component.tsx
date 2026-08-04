'use client'

import type { ReactNode } from 'react'
import { Collapsible } from '@/modules/shared/presentation/components/shadcn/collapsible'
import { cn } from '@/modules/shared/presentation/lib/utils'

export interface SystemFiltersRootProps {
  children: ReactNode
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  className?: string
}

export function SystemFiltersRootComponent({
  children,
  defaultOpen = true,
  open,
  onOpenChange,
  className
}: SystemFiltersRootProps) {
  return (
    <Collapsible
      defaultOpen={defaultOpen}
      open={open}
      onOpenChange={onOpenChange}
      className={cn(
        'w-full bg-card border border-border/60 rounded-xl overflow-hidden transition-all duration-300 group',
        className
      )}
    >
      {children}
    </Collapsible>
  )
}
