import type { ReactNode } from 'react'

interface HeaderOptionsRootComponentProps {
  children: ReactNode
}

export function HeaderOptionsRootComponent({
  children
}: HeaderOptionsRootComponentProps) {
  return (
    <header className="flex flex-col gap-4 sm:gap-5 w-full xl:flex-row xl:items-center xl:justify-between sm:mt-6">
      {children}
    </header>
  )
}
