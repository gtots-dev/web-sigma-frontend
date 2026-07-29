'use client'

import type { ReactNode } from 'react'
import { CollapsibleContent } from '@/modules/shared/presentation/components/shadcn/collapsible'

interface InfractionsFiltersBodyProps {
  children: ReactNode
}

export function InfractionsFiltersBodyComponent({
  children
}: InfractionsFiltersBodyProps) {
  return (
    <CollapsibleContent
      forceMount
      className="data-[state=closed]:hidden data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:slide-in-from-top-1 p-4 duration-200"
    >
      {children}
    </CollapsibleContent>
  )
}
