'use client'

import { useState, useCallback } from 'react'
import type { LiveInfractionCapture } from '../../domain/interfaces/infractions-websocket.interface'

export function useLiveInfractionSelection(
  infractions: LiveInfractionCapture[]
) {
  const [selectedItem, setSelectedItem] =
    useState<LiveInfractionCapture | null>(null)
  const [isLiveMode, setIsLiveMode] = useState<boolean>(true)

  const activeItem =
    (isLiveMode ? infractions[0] : selectedItem) ?? infractions[0] ?? null

  const currentIndex = activeItem
    ? infractions.findIndex((item) => item === activeItem)
    : -1
  const hasPrevious = currentIndex > 0
  const hasNext = currentIndex >= 0 && currentIndex < infractions.length - 1

  const handleToggleLive = useCallback(() => {
    if (isLiveMode) {
      setIsLiveMode(false)
      if (activeItem) setSelectedItem(activeItem)
    } else {
      setIsLiveMode(true)
      setSelectedItem(null)
    }
  }, [isLiveMode, activeItem])

  const handleSelectToggle = useCallback(
    (item: LiveInfractionCapture) => {
      if (selectedItem === item && !isLiveMode) {
        setIsLiveMode(true)
        setSelectedItem(null)
      } else {
        setIsLiveMode(false)
        setSelectedItem(item)
      }
    },
    [selectedItem, isLiveMode]
  )

  const handleNavigatePrevious = useCallback(() => {
    if (hasPrevious) {
      setIsLiveMode(false)
      setSelectedItem(infractions[currentIndex - 1])
    }
  }, [hasPrevious, infractions, currentIndex])

  const handleNavigateNext = useCallback(() => {
    if (hasNext) {
      setIsLiveMode(false)
      setSelectedItem(infractions[currentIndex + 1])
    }
  }, [hasNext, infractions, currentIndex])

  return {
    isLiveMode,
    activeItem,
    currentIndex,
    hasPrevious,
    hasNext,
    handleToggleLive,
    handleSelectToggle,
    handleNavigatePrevious,
    handleNavigateNext
  }
}
