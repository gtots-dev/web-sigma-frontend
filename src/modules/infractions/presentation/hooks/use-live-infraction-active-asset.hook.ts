'use client'

import { useState, useCallback } from 'react'
import type { LiveInfractionCapture } from '../../domain/interfaces/infractions-websocket.interface'

export function useLiveInfractionActiveAsset(
  activeItem: LiveInfractionCapture | null
) {
  const [fileState, setFileState] = useState<{
    item: LiveInfractionCapture | null
    index: number
  }>({
    item: activeItem,
    index: 0
  })

  const activeFileIndex = fileState.item === activeItem ? fileState.index : 0

  const setActiveFileIndex = useCallback(
    (index: number | ((prev: number) => number)) => {
      setFileState((prev) => {
        const currentIndex = prev.item === activeItem ? prev.index : 0
        const nextIndex =
          typeof index === 'function' ? index(currentIndex) : index
        return { item: activeItem, index: nextIndex }
      })
    },
    [activeItem]
  )

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
