import type { ReactNode } from 'react'

export interface SystemFiltersHeaderDescriptionProps {
  children: ReactNode
}

export function SystemFiltersHeaderDescriptionComponent({
  children
}: SystemFiltersHeaderDescriptionProps) {
  return (
    <p className="text-xs text-muted-foreground hidden sm:block">
      {children}
    </p>
  )
}
