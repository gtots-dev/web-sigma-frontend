'use client'

import type { ReactNode } from 'react'

interface InfractionsGridFooterProps {
  children?: ReactNode
}

export function InfractionsGridFooterComponent({
  children
}: InfractionsGridFooterProps) {
  return (
    <div className="w-full flex items-center justify-center mt-auto">
      {children}
    </div>
  )
}
