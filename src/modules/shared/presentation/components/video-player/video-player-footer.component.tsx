import React, { ReactNode } from 'react'

interface VideoPlayerFooterProps {
  children: ReactNode
}

export function VideoPlayerFooterComponent({
  children
}: VideoPlayerFooterProps) {
  return (
    <div className="flex items-center justify-between gap-3">{children}</div>
  )
}
