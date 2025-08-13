import type { ReactNode } from 'react'
import { Command } from '../shadcn/command'

interface GroupItemSelectorRootProps {
  children: ReactNode
}

export function GroupItemSelectorRoot({
  children
}: GroupItemSelectorRootProps) {
  return (
    <Command className="rounded-lg border shadow-md !h-auto">
      {children}
    </Command>
  )
}
