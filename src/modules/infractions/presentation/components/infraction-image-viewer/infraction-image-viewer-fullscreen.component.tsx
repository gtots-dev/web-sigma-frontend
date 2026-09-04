'use client'

import { useState } from 'react'
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useInfractionFullscreenKeyboard } from '../../hooks/use-infraction-fullscreen-keyboard.hook'

interface InfractionImageViewerFullscreenProps {
  src: string | null
  hasPrevious?: boolean
  hasNext?: boolean
  onPrevious?: () => void
  onNext?: () => void
}

export function InfractionImageViewerFullscreen({
  src,
  hasPrevious = false,
  hasNext = false,
  onPrevious,
  onNext
}: InfractionImageViewerFullscreenProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)

  useInfractionFullscreenKeyboard({
    enabled: isFullscreen,
    onClose: () => setIsFullscreen(false),
    hasPrevious,
    hasNext,
    onPrevious,
    onNext
  })

  if (!src) return null

  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          setIsFullscreen(true)
        }}
        className="absolute top-3 right-3 p-2 rounded-lg bg-background/80 hover:bg-background text-foreground backdrop-blur-md border border-border/50 opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-sm cursor-pointer z-20"
        title="Expandir Imagem"
      >
        <Maximize2 className="w-4 h-4" />
      </button>

      {isFullscreen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-0 animate-in fade-in duration-200 ring-0 outline-none shadow-none"
          onClick={() => setIsFullscreen(false)}
        >
          <button
            type="button"
            onClick={() => setIsFullscreen(false)}
            className="absolute top-6 right-6 p-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          {hasPrevious && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onPrevious?.()
              }}
              className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>
          )}

          {hasNext && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onNext?.()
              }}
              className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white transition-colors cursor-pointer"
            >
              <ChevronRight className="w-7 h-7" />
            </button>
          )}

          <img
            src={src}
            alt="Registro em tela cheia"
            className="h-full object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  )
}
