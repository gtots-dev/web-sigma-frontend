'use client'

import type { ReactNode } from 'react'

type ChartBarToolbarProps = {
  children?: ReactNode
}

export function ChartBarToolbar({ children }: ChartBarToolbarProps) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col-reverse md:flex-row gap-2 w-full">
        {children}
      </div>
    </div>
  )
}
