import React, { useState } from 'react'
import { formatFrameTimecode, formatVideoTimecode } from '../../hooks/use-video-format.hook'
import { cn } from '@/modules/shared/presentation/lib/utils'
import { FlatProgressBar } from '../flat-progress-bar/flat-progress-bar.component'

interface VideoPlayerTimeSliderProps {
  currentTime: number
  duration: number
  isVideoReady: boolean
  currentFrame?: number
  totalFrames?: number
  onInputScrub?: (time: number) => void
  onSeekEnd: (finalTime: number) => void
}

export function VideoPlayerTimeSliderComponent({
  currentTime,
  duration,
  isVideoReady,
  currentFrame,
  totalFrames,
  onInputScrub,
  onSeekEnd,
}: VideoPlayerTimeSliderProps) {
  const [dragTime, setDragTime] = useState<number | null>(null)

  const displayTime = dragTime !== null ? dragTime : currentTime

  const safeFrame = Number.isNaN(currentFrame) || !currentFrame || currentFrame < 0 ? 0 : currentFrame
  const safeTotal = Number.isNaN(totalFrames) || !totalFrames || totalFrames < 0 ? 0 : totalFrames
  const displayNum = safeTotal > 0 ? Math.min(safeFrame + 1, safeTotal) : 0

  const handleScrub = (t: number) => {
    setDragTime(t)
    onInputScrub?.(t)
  }

  const handleCommit = (t: number) => {
    setDragTime(null)
    onSeekEnd(t)
  }

  return (
    <div
      className={cn(
        'flex flex-col gap-1.5 select-none',
        !isVideoReady && 'opacity-40 pointer-events-none'
      )}
    >
      <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
        <span>
          <strong className="text-foreground">{formatFrameTimecode(displayTime)}</strong>
          {' / '}
          {formatVideoTimecode(duration)}
        </span>

        {safeTotal > 0 && (
          <span>
            Imagem <strong className="text-foreground">#{displayNum}</strong> / {safeTotal}
          </span>
        )}
      </div>

      <FlatProgressBar
        value={displayTime}
        max={duration || 1}
        disabled={!isVideoReady}
        onScrub={handleScrub}
        onCommit={handleCommit}
      />
    </div>
  )
}
