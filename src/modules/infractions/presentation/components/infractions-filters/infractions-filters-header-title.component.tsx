import type { ReactNode } from 'react'

interface InfractionsFiltersHeaderTitleProps {
  children: ReactNode
}

export function InfractionsFiltersHeaderTitleComponent({
  children
}: InfractionsFiltersHeaderTitleProps) {
  return (
    <h3 className="text-sm font-semibold text-foreground tracking-tight flex items-center gap-2">
      {children}
    </h3>
  )
}
