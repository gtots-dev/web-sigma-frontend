'use client'

import type { ReactNode } from 'react'

interface ModalShellFooterProps {
  children?: ReactNode
  className?: string
}

export function ModalShellFooter({ children, className }: ModalShellFooterProps) {
  if (!children) return null
  return (
    <div className={className ?? "flex flex-col-reverse sm:flex-row sm:justify-end gap-2 p-6 border-t"}>
      {children}
    </div>
  )
}
