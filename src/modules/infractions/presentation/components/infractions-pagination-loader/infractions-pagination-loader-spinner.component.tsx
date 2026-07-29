'use client'

import type { ReactNode } from 'react'
import { LoaderCircle } from 'lucide-react'

interface InfractionsPaginationLoaderSpinnerProps {
  loading?: boolean
  position?: 'top' | 'bottom'
  children?: ReactNode
}

export function InfractionsPaginationLoaderSpinnerComponent({
  loading = true,
  position = 'top',
  children
}: InfractionsPaginationLoaderSpinnerProps) {
  if (!loading) return null

  const defaultLabel =
    position === 'top'
      ? 'Buscando infrações mais recentes...'
      : 'Buscando infrações anteriores...'

  return (
    <div
      className="col-span-full flex items-center justify-center py-6 animate-in fade-in duration-200"
      style={{ overflowAnchor: 'none' }}
    >
      <div className="flex items-center gap-3 bg-card/90 backdrop-blur-md border border-primary/30 shadow-xl px-5 py-2.5 rounded-full text-xs font-semibold text-foreground ring-1 ring-primary/20">
        <LoaderCircle className="w-4 h-4 text-primary animate-spin [animation-duration:1s]" />
        <span className="tracking-wide">{children ?? defaultLabel}</span>
      </div>
    </div>
  )
}
