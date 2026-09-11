'use client'

import { useState, useEffect } from 'react'
import type { LiveInfractionCapture } from '../../domain/interfaces/infractions-websocket.interface'

export function useLiveInfractionActiveAsset(
  activeItem: LiveInfractionCapture | null
) {
  const [activeFileIndex, setActiveFileIndex] = useState<number>(0)

  useEffect(() => {
    setActiveFileIndex(0)
  }, [activeItem])

  const lane_id = activeItem?.laneId ?? 1
  const activeFiles = activeItem?.files ?? []
  const safeFileIndex = Math.min(
    activeFileIndex,
    Math.max(0, activeFiles.length - 1)
  )
  const activeFile = activeFiles[safeFileIndex] ?? activeFiles[0]
  const activeSrc = activeFile?.url || null
  const activeIsVideo = activeFile?.fileType === 'video'

  return {
    lane_id,
    activeFiles,
    safeFileIndex,
    activeSrc,
    activeIsVideo,
    setActiveFileIndex
  }
}
