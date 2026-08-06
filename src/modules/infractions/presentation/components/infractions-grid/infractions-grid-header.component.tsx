'use client'

import type { ReactNode } from 'react'

interface InfractionsGridHeaderProps {
  children?: ReactNode
}

export function InfractionsGridHeaderComponent({
  children
}: InfractionsGridHeaderProps) {
  return (
    <div className="absolute top-0 inset-x-0 pb-6 pt-1 px-1 flex items-center justify-between pointer-events-none z-10">
      {children}
    </div>
  )
}
