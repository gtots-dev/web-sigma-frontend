import type { ReactNode } from 'react'

interface CardOptionDescriptionComponentProps {
  children: ReactNode
}

export function CardOptionDescriptionComponent({
  children
}: CardOptionDescriptionComponentProps) {
  return <p className="text-muted-foreground text-sm opacity-70">{children}</p>
}
