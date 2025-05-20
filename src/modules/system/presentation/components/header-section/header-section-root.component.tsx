import type { ReactNode } from 'react'

interface HeaderSectionRootComponentProps {
  children: ReactNode
}

export function HeaderSectionRootComponent({
  children
}: HeaderSectionRootComponentProps) {
  return (
    <header className="flex flex-col w-full justify-center gap-2">
      {children}
    </header>
  )
}
