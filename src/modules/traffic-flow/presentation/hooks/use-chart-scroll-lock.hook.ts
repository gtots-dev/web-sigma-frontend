import { useRef, useState } from 'react'

export function useChartScrollLock() {
  const chartWrapperRef = useRef<HTMLDivElement>(null)
  const [locked, setLocked] = useState(false)

  const focusAndLock = () => {
    const element = chartWrapperRef.current
    if (!element) return

    const rect = element.getBoundingClientRect()
    const absoluteTop = rect.top + window.scrollY
    const targetPosition = absoluteTop - 135

    window.scrollTo({ top: targetPosition, behavior: 'smooth' })

    setTimeout(() => {
      document.documentElement.style.overflow = 'hidden'
      setLocked(true)
    }, 400)
  }

  const unlock = () => {
    document.documentElement.style.overflow = ''
    setLocked(false)
  }

  return {
    locked,
    chartWrapperRef,
    focusAndLock,
    unlock
  }
}
