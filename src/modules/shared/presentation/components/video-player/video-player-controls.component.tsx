import React, { ReactNode } from 'react'

interface VideoPlayerControlsProps {
  children: ReactNode
}

export function VideoPlayerControlsComponent({ children }: VideoPlayerControlsProps) {
  return <div className="px-4 py-2 flex flex-col gap-2 shrink-0">{children}</div>
}
