import React from 'react'
import { cn } from '@/modules/shared/presentation/lib/utils'
import { CapturedFrame } from '@/modules/shared/domain/interfaces/capture-frame.interface'

interface FrameSequenceItemProps {
  frame: CapturedFrame
  isActive: boolean
  onClick: () => void
}

export const FrameSequenceItemComponent = React.memo(
  function FrameSequenceItemComponent({
    frame,
    isActive,
    onClick
  }: FrameSequenceItemProps) {
    const frameIndexDisplay = frame.frameNumber + 1

    return (
      <div
        id={`frame-thumb-${frame.frameNumber}`}
        onClick={onClick}
        className={cn(
          'flex-shrink-0 w-28 cursor-pointer rounded-lg border overflow-hidden bg-muted/30 p-1 space-y-0.5 transition-all',
          isActive ? 'ring-2 scale-105' : 'hover:border-primary/40'
        )}
        style={
          isActive
            ? {
                borderColor: 'var(--primary-500)'
              }
            : undefined
        }
      >
        <div className="h-14 bg-black rounded overflow-hidden">
          {frame.dataUrl ? (
            <img
              src={frame.dataUrl}
              alt={`Thumbnail ${frameIndexDisplay}`}
              className="w-full h-full object-cover select-none"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-muted/20 flex items-center justify-center text-[10px] text-muted-foreground">
              Sem Imagem
            </div>
          )}
        </div>
        <div className="flex items-center justify-between px-0.5 text-[9px] font-mono">
          <span className="font-bold" style={{ color: 'var(--primary-600)' }}>
            #{frameIndexDisplay}
          </span>
          <span className="text-muted-foreground font-semibold">
            {frame.timestamp}s
          </span>
        </div>
      </div>
    )
  },
  (prevProps, nextProps) =>
    prevProps.frame.id === nextProps.frame.id &&
    prevProps.isActive === nextProps.isActive
)
