import React, { useState } from 'react'
import { FlatProgressBar } from '../flat-progress-bar/flat-progress-bar.component'

interface FrameSequenceSelectorProps {
  currentFrame: number
  totalFrames: number
  isFullyReady: boolean
  onSeek: (frameNumber: number) => void
}

/**
 * Timeline slider for the frame-sequence panel.
 * Uses a flat progress bar to scrub between discrete image indices (0 to totalFrames - 1).
 */
export function FrameSequenceSelectorComponent({
  currentFrame,
  totalFrames,
  isFullyReady,
  onSeek,
}: FrameSequenceSelectorProps) {
  const [dragFrame, setDragFrame] = useState<number | null>(null)

  const safeFrame = Number.isNaN(currentFrame) || currentFrame < 0 ? 0 : currentFrame
  const safeTotal = Number.isNaN(totalFrames) || totalFrames < 0 ? 0 : totalFrames
  const maxFrame = safeTotal > 0 ? safeTotal - 1 : 0

  const displayFrame = dragFrame !== null ? dragFrame : safeFrame
  const displayNum = safeTotal > 0 ? Math.min(displayFrame + 1, safeTotal) : 0

  const handleCommit = (val: number) => {
    setDragFrame(null)
    onSeek(Math.round(val))
  }

  return (
    <div className="flex flex-col gap-1.5 bg-muted/40 border rounded-lg p-2.5">
      <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
        <span className="font-medium text-foreground">Seletor de Imagens</span>
        <span>
          Imagem <strong className="text-foreground">#{displayNum}</strong> / {safeTotal}
        </span>
      </div>

      <FlatProgressBar
        value={displayFrame}
        max={maxFrame || 1}
        disabled={!isFullyReady}
        onScrub={(v) => setDragFrame(Math.round(v))}
        onCommit={handleCommit}
      />
    </div>
  )
}
