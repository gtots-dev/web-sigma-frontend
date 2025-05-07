import type { ReactNode } from 'react'

interface HeaderOptionsRootComponentProps {
  children: ReactNode
}

export function HeaderOptionsRootComponent({
  children
}: HeaderOptionsRootComponentProps) {
  return (
    <header className="flex flex-col justify-items-center justify-center be gap-5 w-full xl:flex-row xl:items-center xl:justify-between sm:mt-6">
      {children}
    </header>
  )
}
