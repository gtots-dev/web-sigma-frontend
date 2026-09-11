import React from 'react'
import { CapturedFrame } from '@/modules/shared/domain/interfaces/capture-frame.interface'

interface VideoPlayerCanvasDisplayProps {
  activeFrame: CapturedFrame
}

export function VideoPlayerCanvasDisplayComponent({ activeFrame }: VideoPlayerCanvasDisplayProps) {
  if (!activeFrame?.dataUrl) return null

  return (
    <div className="w-full h-full flex items-center justify-center bg-black">
      <img
        src={activeFrame.dataUrl}
        alt={`Frame ${activeFrame.frameNumber}`}
        className="w-full h-full object-contain select-none"
      />
    </div>
  )
}
