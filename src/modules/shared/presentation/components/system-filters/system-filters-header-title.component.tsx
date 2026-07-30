import type { ReactNode } from 'react'

export interface SystemFiltersHeaderTitleProps {
  children: ReactNode
}

export function SystemFiltersHeaderTitleComponent({
  children
}: SystemFiltersHeaderTitleProps) {
  return (
    <h3 className="text-sm font-semibold text-foreground tracking-tight flex items-center gap-2">
      {children}
    </h3>
  )
}
