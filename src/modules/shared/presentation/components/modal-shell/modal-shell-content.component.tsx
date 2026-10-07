'use client'

import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface ModalShellContentProps {
  children?: ReactNode
  className?: string
}

export function ModalShellContent({ children, className }: ModalShellContentProps) {
  return (
    <div className={cn('flex-1 overflow-y-auto min-h-0 w-full', className)}>
      {children}
    </div>
  )
}
