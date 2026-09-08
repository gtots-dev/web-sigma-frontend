'use client'

import { useRef, useEffect, useCallback } from 'react'
import { useFrameExtraction } from '@/modules/shared/presentation/hooks/use-frame-extraction.hook'
import { useVideoPlayback } from '@/modules/shared/presentation/hooks/use-video-playback.hook'
import { useFrameNavigation } from '@/modules/shared/presentation/hooks/use-frame-navigation.hook'
import { useFilmstripScroll } from '@/modules/shared/presentation/hooks/use-filmstrip-scroll.hook'
import { useKeyboardShortcuts } from '@/modules/shared/presentation/hooks/use-keyboard-shortcuts.hook'

export function useInfractionVideoPlayer(src: string) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const filmstripRef = useRef<HTMLDivElement | null>(null)
  const lastExtractedSrcRef = useRef<string>('')

  const extraction = useFrameExtraction()
  const playback = useVideoPlayback()
  const navigation = useFrameNavigation()

  const extractionRef = useRef(extraction)
  extractionRef.current = extraction

  const playbackRef = useRef(playback)
  playbackRef.current = playback

  const navigationRef = useRef(navigation)
  navigationRef.current = navigation

  const handleLoadedMetadata = useCallback(async () => {
    const videoEl = videoRef.current
    const canvasEl = canvasRef.current
    if (!videoEl || !canvasEl || !src) return

    playbackRef.current.handleLoadedMetadata(videoEl)

    if (
      lastExtractedSrcRef.current === src &&
      extractionRef.current.capturedFrames.length > 0
    ) {
      return
    }

    lastExtractedSrcRef.current = src

    try {
      const { frames } = await extractionRef.current.startExtraction(
        src,
        canvasEl,
        videoEl.duration
      )
      if (frames.length > 0) {
        navigationRef.current.selectFrame(frames[0], videoEl)
        navigationRef.current.setDisplayMode('video')
      }
    } catch (err) {
      console.warn('[InfractionVideoViewer] Frame extraction warning:', err)
    }
  }, [src])

  useEffect(() => {
    const videoEl = videoRef.current
    if (!videoEl || !src) return

    if (lastExtractedSrcRef.current !== src) {
      extractionRef.current.reset()
      playbackRef.current.setCurrentTime(0)
      navigationRef.current.setDisplayMode('video')
    }

    if (videoEl.readyState >= 1) {
      handleLoadedMetadata()
    }
  }, [src, handleLoadedMetadata])

  const activeFps = extraction.detectedFps
  const totalFrames =
    extraction.isFullyReady && extraction.capturedFrames.length > 0
      ? extraction.capturedFrames.length
      : Math.round(playback.metadata.duration * activeFps)

  const currentFrame =
    navigation.displayMode === 'canvas' && navigation.activeFrame
      ? navigation.activeFrame.frameNumber
      : Math.min(
          Math.max(0, Math.round(playback.currentTime * activeFps)),
          totalFrames > 0 ? totalFrames - 1 : 0
        )

  useFilmstripScroll(navigation.activeFrame?.frameNumber)

  const handleTogglePlay = () => {
    const videoEl = videoRef.current
    if (!videoEl) return

    if (!playback.isVideoReady && videoEl.readyState >= 1) {
      playback.handleLoadedMetadata(videoEl)
    }

    if (navigation.displayMode === 'canvas' && navigation.activeFrame) {
      videoEl.currentTime = navigation.activeFrame.timeSeconds
      playback.setCurrentTime(navigation.activeFrame.timeSeconds)
    }

    navigation.setDisplayMode('video')
    playback.togglePlay(videoEl, true, () => {})
  }

  useKeyboardShortcuts({
    isReady: playback.isVideoReady,
    onPlay: handleTogglePlay,
    onStepBack: (shift) =>
      navigation.stepFrame(
        shift ? -10 : -1,
        extraction.capturedFrames,
        currentFrame,
        videoRef.current,
        playback.isVideoReady
      ),
    onStepForward: (shift) =>
      navigation.stepFrame(
        shift ? 10 : 1,
        extraction.capturedFrames,
        currentFrame,
        videoRef.current,
        playback.isVideoReady
      )
  })

  const isInspecting =
    navigation.displayMode === 'canvas' && !!navigation.activeFrame

  return {
    videoRef,
    canvasRef,
    filmstripRef,
    extraction,
    playback,
    navigation,
    totalFrames,
    currentFrame,
    isInspecting,
    handleLoadedMetadata,
    handleTogglePlay
  }
}
