import type { ReactNode } from 'react'

export interface SystemFiltersHeaderIconProps {
  children: ReactNode
}

export function SystemFiltersHeaderIconComponent({
  children
}: SystemFiltersHeaderIconProps) {
  return (
    <div className="p-1.5 rounded-lg bg-primary/10 text-primary shrink-0">
      {children}
    </div>
  )
}
