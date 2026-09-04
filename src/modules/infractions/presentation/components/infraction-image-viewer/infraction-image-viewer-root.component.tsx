'use client'

import { type ReactNode } from 'react'

interface InfractionImageViewerRootProps {
  children: ReactNode
  onClick?: () => void
  className?: string
}

export function InfractionImageViewerRoot({
  children,
  onClick,
  className = ''
}: InfractionImageViewerRootProps) {
  return (
    <div
      onClick={onClick}
      className={`flex-1 min-h-0 flex items-center justify-center p-4 overflow-hidden relative group rounded-t-xl border-b border-border/40 select-none ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}
