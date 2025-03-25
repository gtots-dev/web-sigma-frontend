import type { ReactNode } from 'react'

interface HeaderOptionsDescriptionComponentProps {
  children: ReactNode
}

export function HeaderOptionsDescriptionComponent({
  children
}: HeaderOptionsDescriptionComponentProps) {
  return <p className="text-muted-foreground font-light">{children}</p>
}
