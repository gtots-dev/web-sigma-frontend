import type { ReactNode } from 'react'

interface InfractionsFiltersHeaderIconProps {
  children?: ReactNode
}

export function InfractionsFiltersHeaderIconComponent({
  children
}: InfractionsFiltersHeaderIconProps) {
  if (!children) return null

  return (
    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary border border-primary/20 shrink-0">
      {children}
    </div>
  )
}
