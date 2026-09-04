import React from 'react'

interface FrameSequenceHeaderProps {
  capturedCount: number
  totalFrames: number
  fps?: number
}

export function FrameSequenceHeaderComponent({
  capturedCount,
  totalFrames,
  fps,
}: FrameSequenceHeaderProps) {
  const safeCount = Number.isNaN(capturedCount) ? 0 : capturedCount
  const safeTotal = Number.isNaN(totalFrames) ? 0 : totalFrames

  return (
    <div className="flex items-center justify-between gap-4 select-none">
      <div>
        <h3 className="text-xs font-semibold text-foreground flex items-center gap-2">
          Imagens decodificadas —{' '}
          <span style={{ color: 'var(--primary-600)' }}>{safeCount}</span> de {safeTotal}
          {fps ? (
            <span className="text-[10px] px-1.5 py-0.5 rounded font-mono bg-muted text-muted-foreground border font-normal">
              {fps} FPS
            </span>
          ) : null}
        </h3>
        <p className="text-[11px] text-muted-foreground mt-0.5">
          Arraste a barra ou clique em um thumbnail para inspecionar a imagem.
        </p>
      </div>
    </div>
  )
}
