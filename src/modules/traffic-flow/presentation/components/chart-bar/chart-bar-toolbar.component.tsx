'use client'

import type { ReactNode } from 'react'

type ChartBarToolbarProps = {
  children?: ReactNode
}

export function ChartBarToolbar({
  children
}: ChartBarToolbarProps) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2 w-full">{children}</div>
    </div>
  )
}
