import React, { ReactNode } from 'react'

interface VideoPlayerOverlayProps {
  children: ReactNode
}

export function VideoPlayerOverlayComponent({ children }: VideoPlayerOverlayProps) {
  return (
    <div className="absolute top-3 left-3 right-3 z-40 flex items-center justify-between pointer-events-auto">
      {children}
    </div>
  )
}
