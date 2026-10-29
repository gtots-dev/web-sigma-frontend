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
        'z-50 fixed right-0 flex-1 w-full flex justify-between h-16 border-b border-border/80 shrink-0 items-center gap-3 px-3 sm:px-5 py-2 transition-[width,height] ease-linear bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md',
        {
          'md:w-[calc(100%-var(--sidebar-width))]': state === 'expanded'
        }
      )}
    >
      {children}
    </header>
  )
}
