import type { ReactNode } from 'react'

interface ActionSectionRootComponentProps {
  children: ReactNode
}

export function ActionSectionRootComponent({
  children
}: ActionSectionRootComponentProps) {
  return (
    <nav className="flex gap-x-5 justify-end flex-row-reverse sm:flex-row">
      {children}
    </nav>
  )
}
