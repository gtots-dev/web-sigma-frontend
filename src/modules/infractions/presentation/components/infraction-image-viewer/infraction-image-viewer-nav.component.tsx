'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'

interface InfractionImageViewerNavProps {
  hasPrevious?: boolean
  hasNext?: boolean
  onPrevious?: () => void
  onNext?: () => void
}

export function InfractionImageViewerNav({
  hasPrevious = false,
  hasNext = false,
  onPrevious,
  onNext
}: InfractionImageViewerNavProps) {
  return (
    <>
      {hasPrevious && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onPrevious?.()
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-background/80 hover:bg-background text-foreground backdrop-blur-md border border-border/50 opacity-80 hover:opacity-100 group-hover:opacity-100 transition-all duration-200 cursor-pointer z-20"
          title="Anterior (Seta Esquerda)"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}

      {hasNext && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onNext?.()
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-background/80 hover:bg-background text-foreground backdrop-blur-md border border-border/50 opacity-80 hover:opacity-100 group-hover:opacity-100 transition-all duration-200 cursor-pointer z-20"
          title="Próximo (Seta Direita)"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </>
  )
}
