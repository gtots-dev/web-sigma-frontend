'use client'

import { createContext, useContext, ReactNode } from 'react'
import { useInfractionVideoPlayer } from '../hooks/use-infraction-video-player.hook'

type InfractionVideoViewerContextValue = ReturnType<
  typeof useInfractionVideoPlayer
> & {
  src: string
}

const InfractionVideoViewerContext =
  createContext<InfractionVideoViewerContextValue | null>(null)

interface InfractionVideoViewerProviderProps {
  src: string
  children: ReactNode
}

export function InfractionVideoViewerProvider({
  src,
  children
}: InfractionVideoViewerProviderProps) {
  const player = useInfractionVideoPlayer(src)

  return (
    <InfractionVideoViewerContext.Provider value={{ ...player, src }}>
      {children}
    </InfractionVideoViewerContext.Provider>
  )
}

export function useInfractionVideoViewerContext() {
  const context = useContext(InfractionVideoViewerContext)
  if (!context) {
    throw new Error(
      'useInfractionVideoViewerContext must be used within InfractionVideoViewerProvider'
    )
  }
  return context
}
