'use client'

import { type ReactNode } from 'react'
import { InfractionVideoViewerProvider } from '../../contexts/infraction-video-viewer-context'
import { InfractionVideoViewerRoot } from './infraction-video-viewer-root.component'
import { InfractionVideoViewerPlayer } from './infraction-video-viewer-player.component'
import { InfractionVideoViewerSequence } from './infraction-video-viewer-sequence.component'

interface InfractionVideoViewerProps {
  src: string
  children?: ReactNode
  className?: string
}

export function InfractionVideoViewerMain({
  src,
  children,
  className
}: InfractionVideoViewerProps) {
  return (
    <InfractionVideoViewerProvider src={src}>
      <InfractionVideoViewerRoot className={className}>
        {children ? (
          children
        ) : (
          <>
            <InfractionVideoViewerPlayer />
            <InfractionVideoViewerSequence />
          </>
        )}
      </InfractionVideoViewerRoot>
    </InfractionVideoViewerProvider>
  )
}
