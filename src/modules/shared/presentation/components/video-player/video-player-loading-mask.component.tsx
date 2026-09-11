import React from 'react'
import { LoaderCircle } from 'lucide-react'

interface VideoPlayerLoadingMaskProps {
  currentExtractingFrame: number
  totalFrames: number
  extractionProgress: number
}

export function VideoPlayerLoadingMaskComponent({
  currentExtractingFrame,
  totalFrames,
  extractionProgress
}: VideoPlayerLoadingMaskProps) {
  const stopPropagation = (e: React.SyntheticEvent) => {
    e.stopPropagation()
  }

  const currentDisplayNum = Math.min(currentExtractingFrame + 1, totalFrames || 1)

  return (
    <div
      onPointerDown={stopPropagation}
      onMouseDown={stopPropagation}
      onPointerMove={stopPropagation}
      onMouseMove={stopPropagation}
      onWheel={stopPropagation}
      onTouchStart={stopPropagation}
      onTouchMove={stopPropagation}
      className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-background/60 backdrop-blur-md z-50 transition-all duration-300 pointer-events-auto"
    >
      {/* Container de Anel de Radar Pulsante Premium */}
      <div className="relative flex items-center justify-center w-20 h-20">
        <div className="absolute inset-0 rounded-full border border-primary/10 animate-ping [animation-duration:1.5s]" />
        <div className="absolute w-14 h-14 rounded-full border border-primary/20 animate-pulse duration-1000" />

        <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-background border border-muted">
          <LoaderCircle className="h-5 w-5 text-primary animate-spin [animation-duration:1s]" />
        </div>
      </div>

      <div className="flex flex-col items-center gap-1 text-center px-4 w-full">
        <span className="text-[10px] uppercase font-bold tracking-widest text-primary/80">
          Decodificando Capturas
        </span>
        <p className="text-sm font-semibold text-muted-foreground animate-pulse duration-1000">
          Imagem #{currentDisplayNum} de {totalFrames}
        </p>

        <div className="w-full max-w-[300px] mt-2 space-y-1">
          <div className="w-full bg-muted/80 h-1.5 rounded-full overflow-hidden border border-border/50">
            <div
              className="h-full rounded-full transition-all duration-150"
              style={{
                width: `${extractionProgress}%`,
                background: 'var(--primary-600)'
              }}
            />
          </div>
          <span className="text-[10px] font-mono text-muted-foreground">
            {extractionProgress}% concluído
          </span>
        </div>
      </div>
    </div>
  )
}
