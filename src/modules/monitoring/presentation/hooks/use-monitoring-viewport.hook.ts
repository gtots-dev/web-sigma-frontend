import { useState, useCallback, useRef, useEffect } from 'react'

export function useMonitoringViewport() {
  const containerRef = useRef<HTMLDivElement>(null)
  const dragOriginRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

  const [zoom, setZoom] = useState(1.5)
  const [radius, setRadius] = useState(37.5)
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
    (e: React.PointerEvent) => {
      // Ignorar se o evento veio de fora do container DOM (ex: Portals como dialogs e drawers)
      if (containerRef.current && e.target instanceof Node && !containerRef.current.contains(e.target)) {
        return
      }

      // Ignorar se houver um dialog ou drawer aberto na página
      if (document.querySelector('[role="dialog"]') || document.querySelector('[data-radix-portal] [data-state="open"]')) {
        return
      }

      // Ignorar cliques em elementos interativos
      if (e.target instanceof Element && e.target.closest('.pointer-events-auto, button, a, [role="button"]')) {
        return
      }

      if (e.button !== 0) return
      setIsDragging(true)
      setActive(null) // Fecha o menu ao interagir com o background
      dragOriginRef.current = { x: e.clientX - offset.x, y: e.clientY - offset.y }
    },
    [offset]
  )

  const handleMouseMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return

      // Ignorar se o evento veio de fora do container DOM (ex: Portals como dialogs e drawers)
      if (containerRef.current && e.target instanceof Node && !containerRef.current.contains(e.target)) {
        setIsDragging(false)
        return
      }

      // Cancelar o arrasto se um dialog foi aberto nesse meio tempo
      if (document.querySelector('[role="dialog"]') || document.querySelector('[data-radix-portal] [data-state="open"]')) {
        setIsDragging(false)
        return
      }

      setOffset({
        x: e.clientX - dragOriginRef.current.x,
        y: e.clientY - dragOriginRef.current.y
      })
    },
    [isDragging]
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const onWheel = (e: WheelEvent) => {
      if (e.target instanceof Element) {
        const isInteractive = e.target.closest('.pointer-events-auto')
        if (isInteractive) return
      }
      e.preventDefault()
      setOffset((prev) => ({ x: prev.x - e.deltaX, y: prev.y - e.deltaY }))
    }

    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
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
      handleMouseUp
    },
    resetView
  }
}
