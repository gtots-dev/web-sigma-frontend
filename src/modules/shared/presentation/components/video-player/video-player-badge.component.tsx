import React from 'react'
import { Loader2, Camera, Video } from 'lucide-react'
import { cn } from '@/modules/shared/presentation/lib/utils'
import { CapturedFrame } from '@/modules/shared/domain/interfaces/capture-frame.interface'

interface VideoPlayerBadgeProps {
  isFullyReady: boolean
  extractionProgress: number
  isInspecting: boolean
  activeFrame: CapturedFrame | null
  isPlaying: boolean
}

export function VideoPlayerBadgeComponent({
  isFullyReady,
  extractionProgress,
  isInspecting,
  activeFrame,
  isPlaying,
}: VideoPlayerBadgeProps) {
  if (!isFullyReady) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-background/80 border text-muted-foreground backdrop-blur-sm shadow-sm">
        <Loader2 className="w-3 h-3 animate-spin" />
        Processando imagens… {extractionProgress}%
      </span>
    )
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm shadow-sm',
        isInspecting
          ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950/40 dark:text-green-400 dark:border-green-800'
          : 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-800'
      )}
    >
      {isInspecting && activeFrame ? (
        <>
          <Camera className="w-3 h-3" />
          Imagem #{activeFrame.frameNumber + 1} — {activeFrame.timestamp}
        </>
      ) : (
        <>
          <Video className="w-3 h-3" />
          {isPlaying ? 'Reproduzindo' : 'Pausado'}
        </>
      )}
    </span>
  )
}
