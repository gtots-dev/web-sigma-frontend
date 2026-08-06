'use client'

import type { ReactNode } from 'react'

interface InfractionsGridFooterProps {
  children?: ReactNode
}

export function InfractionsGridFooterComponent({
  children
}: InfractionsGridFooterProps) {
  return (
    <div className="absolute bottom-0 inset-x-0 pt-6 pb-1 px-1 flex items-end justify-between z-10">
      {children}
    </div>
  )
}
