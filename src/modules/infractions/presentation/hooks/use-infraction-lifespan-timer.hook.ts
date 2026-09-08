import { useState, useEffect } from 'react'

export interface UseInfractionLifespanTimerReturn {
  timeLeftSec: number | null
  formatted: string
  isCritical: boolean
  isWarning: boolean
}
export function useInfractionLifespanTimer(
  expiresAt?: number
): UseInfractionLifespanTimerReturn {
  const [timeLeftSec, setTimeLeftSec] = useState<number | null>(() => {
    if (!expiresAt) return null
    return Math.max(0, Math.floor((expiresAt - Date.now()) / 1000))
  })

  useEffect(() => {
    if (!expiresAt) return

    const updateTimer = () => {
      const remaining = Math.max(0, Math.floor((expiresAt - Date.now()) / 1000))
      setTimeLeftSec(remaining)
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)
    return () => clearInterval(interval)
  }, [expiresAt])

  if (timeLeftSec === null) {
    return {
      timeLeftSec: null,
      formatted: '',
      isCritical: false,
      isWarning: false
    }
  }

  const minutes = Math.floor(timeLeftSec / 60)
  const seconds = timeLeftSec % 60
  const formatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`

  const isCritical = timeLeftSec <= 60
  const isWarning = timeLeftSec <= 300

  return {
    timeLeftSec,
    formatted,
    isCritical,
    isWarning
  }
}
