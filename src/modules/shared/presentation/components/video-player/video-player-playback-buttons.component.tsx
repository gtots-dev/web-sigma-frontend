import React from 'react'
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { cn } from '@/modules/shared/presentation/lib/utils'

interface VideoPlayerPlaybackButtonsProps {
  isVideoReady: boolean
  isPlaying: boolean
  onStep: (delta: number) => void
  onTogglePlay: () => void
}

export function VideoPlayerPlaybackButtonsComponent({
  isVideoReady,
  isPlaying,
  onStep,
  onTogglePlay,
}: VideoPlayerPlaybackButtonsProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-0.5 transition-opacity',
        !isVideoReady && 'opacity-40 pointer-events-none'
      )}
    >
      {[
        { title: 'Recuar 10 imagens', delta: -10, Icon: ChevronsLeft },
        { title: 'Recuar 1 imagem', delta: -1, Icon: ChevronLeft },
      ].map(({ title, delta, Icon }) => (
        <Button
          key={title}
          size="icon"
          variant="ghost"
          title={title}
          disabled={!isVideoReady}
          onClick={() => onStep(delta)}
        >
          <Icon className="w-4 h-4" />
        </Button>
      ))}

      <Button
        size="icon"
        variant="primary"
        disabled={!isVideoReady}
        className="mx-1 pointer-events-auto cursor-pointer"
        style={{ background: 'var(--primary-600)' }}
        onClick={onTogglePlay}
      >
        {isPlaying ? (
          <Pause className="w-4 h-4" />
        ) : (
          <Play className="w-4 h-4 fill-current" />
        )}
      </Button>

      {[
        { title: 'Avançar 1 imagem', delta: 1, Icon: ChevronRight },
        { title: 'Avançar 10 imagens', delta: 10, Icon: ChevronsRight },
      ].map(({ title, delta, Icon }) => (
        <Button
          key={title}
          size="icon"
          variant="ghost"
          title={title}
          disabled={!isVideoReady}
          onClick={() => onStep(delta)}
        >
          <Icon className="w-4 h-4" />
        </Button>
      ))}
    </div>
  )
}
