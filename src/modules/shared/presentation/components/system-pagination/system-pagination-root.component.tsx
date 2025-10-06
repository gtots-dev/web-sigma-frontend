'use client'

import type { ReactNode } from 'react'

interface SystemPaginationRootComponentProps {
  children: ReactNode
}

export function SystemPaginationRootComponent({
  children
}: SystemPaginationRootComponentProps) {
  return (
    <div className="flex flex-col items-center gap-3 mt-auto ms-auto py-5">
      {children}
    </div>
  )
}
