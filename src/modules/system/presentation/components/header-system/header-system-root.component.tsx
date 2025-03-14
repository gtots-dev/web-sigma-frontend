import type { ReactNode } from 'react'

interface HeaderSystemRootComponentProps {
  children: ReactNode
}

export default function HeaderSystemRootComponent({
  children
}: HeaderSystemRootComponentProps) {
  return (
    <header className="fixed w-full flex h-16 border-b shrink-0 items-center gap-2 px-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      {children}
    </header>
  )
}
