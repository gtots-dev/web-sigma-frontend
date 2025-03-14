import type { ReactNode } from 'react'

interface HeaderSystemRootComponentProps {
  children: ReactNode
}

export function HeaderSystemRootComponent({
  children
}: HeaderSystemRootComponentProps) {
  return (
    <header className="flex flex-col w-full justify-center gap-4 mb-4">
      {children}
    </header>
  )
}
