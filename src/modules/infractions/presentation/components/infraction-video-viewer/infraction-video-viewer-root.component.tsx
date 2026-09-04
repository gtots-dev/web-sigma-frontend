'use client'

import { type ReactNode } from 'react'
import { InfractionVideoViewerProvider } from '../../contexts/infraction-video-viewer-context'

interface InfractionVideoViewerRootProps {
  src?: string
  children: ReactNode
  className?: string
}

export function InfractionVideoViewerRoot({
  src,
  children,
  className = ''
}: InfractionVideoViewerRootProps) {
  const content = (
    <div
      className={`flex flex-col flex-1 min-h-0 w-full h-full overflow-hidden p-2 gap-2 bg-background ${className}`}
    >
      {children}
    </div>
  )

  if (src) {
    return (
      <InfractionVideoViewerProvider src={src}>
        {content}
      </InfractionVideoViewerProvider>
    )
  }

  return content
}
