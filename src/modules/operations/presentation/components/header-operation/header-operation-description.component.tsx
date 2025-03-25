import type { ReactNode } from "react"

interface HeaderSystemDescriptionComponentProps {
  children: ReactNode
}

export function HeaderSystemDescriptionComponent({
  children
}: HeaderSystemDescriptionComponentProps) {
  return <p className="text-muted-foreground font-light text-sm">{children}</p>
}
