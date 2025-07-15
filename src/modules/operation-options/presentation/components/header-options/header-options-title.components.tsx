import type { ReactNode } from 'react'

interface HeaderOptionsTitleComponentProps {
  children: ReactNode
}

export function HeaderOptionsTitleComponent({
  children
}: HeaderOptionsTitleComponentProps) {
  return <h2 className="text-4xl mb-4 font-medium">{children}</h2>
}
