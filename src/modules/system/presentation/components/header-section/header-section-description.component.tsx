import type { ReactNode } from "react"

interface HeaderSectionDescriptionComponentProps {
  children: ReactNode
}

export function HeaderSectionDescriptionComponent({
  children
}: HeaderSectionDescriptionComponentProps) {
  return <p className="text-muted-foreground font-light text-sm">{children}</p>
}
