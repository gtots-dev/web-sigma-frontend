'use client'

import type { ReactNode } from 'react'
import { LoadingSpinComponent } from '../loading-spin/loading-spin.component'

export interface ModalShellLoadingProps {
  when?: boolean
  children?: ReactNode
}

export function ModalShellLoading({
  when = true,
  children
}: ModalShellLoadingProps) {
  if (!when) return null

  if (children) return <>{children}</>

  return (
    <div className="flex items-center justify-center p-12 h-full">
      <LoadingSpinComponent />
    </div>
  )
}
