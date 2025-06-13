'use client'

import { useSidebar } from '@/modules/shared/presentation/components/shadcn/sidebar'
import { cn } from '@/modules/shared/presentation/lib/utils'
import type { ReactNode } from 'react'

interface HeaderSystemRootComponentProps {
  children: ReactNode
}

export default function HeaderSystemRootComponent({
  children
}: HeaderSystemRootComponentProps) {
  const { state } = useSidebar()

  return (
    <header
      className={cn(
        'z-50 fixed right-0 flex-1 w-full flex justify-between h-16 border-b shrink-0 items-center gap-2 px-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-white dark:bg-zinc-950',
        {
          'md:w-[calc(100%-var(--sidebar-width))]': state === 'expanded'
        }
      )}
    >
      {children}
    </header>
  )
}
