import type { ReactNode } from 'react'

interface HeaderSectionTitleComponentProps {
  children: ReactNode
}

export function HeaderSectionTitleComponent({
  children
}: HeaderSectionTitleComponentProps) {
  return <h2 className="text-4xl font-medium">{children}</h2>
}
