'use client'

import { useRef, useCallback, useEffect } from 'react'

export function useTruncateChartText() {
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)

  useEffect(() => {
    if (typeof document === 'undefined') return
    const canvas = document.createElement('canvas')
    contextRef.current = canvas.getContext('2d')
  }, [])

  const truncateChartText = useCallback(
    (text: string, maxWidth = 55, font = '10px sans-serif') => {
      const context = contextRef.current
      if (!context) return text
      context.font = font
      if (context.measureText(text).width <= maxWidth) return text
      let truncated = text

      while (truncated.length > 0) {
        truncated = truncated.slice(0, -1)
        if (context.measureText(truncated + '…').width <= maxWidth)
          return truncated + '…'
      }

      return text
    },
    []
  )

  return truncateChartText
}
