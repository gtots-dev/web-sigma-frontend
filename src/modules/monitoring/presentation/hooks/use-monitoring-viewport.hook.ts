import { useState, useCallback, useRef, useEffect } from 'react'

export function useMonitoringViewport() {
  const containerRef = useRef<HTMLDivElement>(null)
  const dragOriginRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

  const [zoom, setZoom] = useState(1)
  const [radius, setRadius] = useState(25)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [active, setActive] = useState<string | null>(null)
  const [isMaximized, setIsMaximized] = useState(false)
  const [isControlsMinimized, setIsControlsMinimized] = useState(false)

  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })

  const handleSetActive = useCallback((id: string | null) => {
    setActive((prev) => (prev === id ? null : id))
  }, [])

  const handleMouseDown = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if ('button' in e && e.button !== 0) return
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
      setIsDragging(true)
      dragOriginRef.current = { x: clientX - offset.x, y: clientY - offset.y }
    },
    [offset]
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (!isDragging) return
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
      setOffset({
        x: clientX - dragOriginRef.current.x,
        y: clientY - dragOriginRef.current.y
      })
    },
    [isDragging]
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleWheel = useCallback((e: React.WheelEvent) => {
    setOffset((prev) => ({ x: prev.x - e.deltaX, y: prev.y - e.deltaY }))
  }, [])

  const resetView = useCallback(() => {
    setOffset({ x: 0, y: 0 })
  }, [])

  useEffect(() => {
    const update = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      setContainerSize({ width: rect.width, height: rect.height })
    }
    update()
    const observer = new ResizeObserver(update)
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  // Sincronizar com a API de Fullscreen do Browser (F11 behavior)
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!document.fullscreenElement
      setIsMaximized(isCurrentlyFullscreen)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () =>
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  useEffect(() => {
    if (isMaximized) {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {})
      }
    } else {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {})
      }
    }
  }, [isMaximized])

  return {
    containerRef,
    zoom,
    setZoom,
    radius,
    setRadius,
    offset,
    setOffset,
    isDragging,
    active,
    setActive,
    handleSetActive,
    isMaximized,
    setIsMaximized,
    isControlsMinimized,
    setIsControlsMinimized,
    containerSize,
    handlers: {
      handleMouseDown,
      handleMouseMove,
      handleMouseUp,
      handleWheel
    },
    resetView
  }
}
