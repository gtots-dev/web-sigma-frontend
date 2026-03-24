'use client'

import type { ReactNode } from 'react'

type ChartGradientLineToolbarProps = {
  children?: ReactNode
}

export function ChartGradientLineToolbar({
  children
}: ChartGradientLineToolbarProps) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col-reverse md:flex-row gap-2 w-full">{children}</div>
    </div>
  )
}
