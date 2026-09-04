import React, { ReactNode } from 'react'

interface VideoPlayerViewportProps {
  children: ReactNode
}

export function VideoPlayerViewportComponent({ children }: VideoPlayerViewportProps) {
  return (
    <div className="relative flex-1 min-h-0 w-full bg-black flex items-center justify-center overflow-hidden rounded-t-xl">
      {children}
    </div>
  )
}
