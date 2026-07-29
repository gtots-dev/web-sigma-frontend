import type { ReactNode } from 'react'

interface InfractionsFiltersHeaderDescriptionProps {
  children: ReactNode
}

export function InfractionsFiltersHeaderDescriptionComponent({
  children
}: InfractionsFiltersHeaderDescriptionProps) {
  return (
    <p className="text-[11px] sm:text-xs text-muted-foreground leading-snug line-clamp-1 sm:line-clamp-none">
      {children}
    </p>
  )
}
