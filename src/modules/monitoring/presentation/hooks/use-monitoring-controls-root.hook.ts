'use client'

import { useEffect, useState } from 'react'
import { useMonitoringContext } from '../components/monitoring/monitoring-context.component'

export function useMonitoringControlsRoot() {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false)
  const {
    mode,
    setMode,
    setLayout,
    resetView,
    setIsSidebarOpen,
    isControlsMinimized,
    setIsControlsMinimized
  } = useMonitoringContext()

  // Suporte a Atalhos de Teclado Globais (Keyboard Shortcuts)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignora atalhos se o foco estiver em um input, textarea ou elemento editável
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target instanceof HTMLElement && e.target.isContentEditable)
      ) {
        return
      }

      // Alt + M: Alterna Modo de Visualização (Hex -> Grid -> Mapa -> Hex)
      if (e.altKey && (e.key === 'm' || e.key === 'M')) {
        e.preventDefault()
        setMode((prev) => {
          if (prev === 'hex') return 'grid'
          if (prev === 'grid') return 'map'
          return 'hex'
        })
        return
      }

      // Alt + L: Alterna Submodo do Hex (Linear -> Radial)
      if (e.altKey && (e.key === 'l' || e.key === 'L')) {
        if (mode === 'hex') {
          e.preventDefault()
          setLayout((prev) => (prev === 'linear' ? 'radial' : 'linear'))
        }
        return
      }

      // Alt + 0: Restaura o Ponto Central
      if (
        e.altKey &&
        (e.key === '0' || e.code === 'Digit0' || e.code === 'Numpad0')
      ) {
        e.preventDefault()
        resetView()
        return
      }

      // Alt + F: Abre/Fecha o Painel de Filtros de Telemetria
      if (e.altKey && (e.key === 'f' || e.key === 'F')) {
        e.preventDefault()
        setIsSidebarOpen((prev) => !prev)
        return
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [mode, setMode, setLayout, resetView, setIsSidebarOpen])

  const stopPropagation = (e: React.PointerEvent | React.MouseEvent) => {
    e.stopPropagation()
  }

  return {
    isMobileDrawerOpen,
    setIsMobileDrawerOpen,
    isControlsMinimized,
    setIsControlsMinimized,
    stopPropagation
  }
}
