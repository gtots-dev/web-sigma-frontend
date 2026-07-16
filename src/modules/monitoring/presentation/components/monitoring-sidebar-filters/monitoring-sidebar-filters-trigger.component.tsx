'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { SyntheticEvent } from 'react'

interface MonitoringSidebarFiltersTriggerProps {
  isSidebarOpen: boolean
  onToggle: () => void
  stopPropagation: (e: SyntheticEvent) => void
}

export function MonitoringSidebarFiltersTrigger({
  isSidebarOpen,
  onToggle,
  stopPropagation
}: MonitoringSidebarFiltersTriggerProps) {
  return (
    <button
      onClick={onToggle}
      onPointerDown={stopPropagation}
      onMouseDown={stopPropagation}
      className="absolute right-full top-1/2 -translate-y-1/2 z-40 flex h-16 w-5.5 items-center justify-center rounded-l-md border border-r-0 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 shadow-md cursor-pointer transition-colors duration-200 pointer-events-auto"
      title={
        isSidebarOpen
          ? 'Fechar Filtros de Telemetria'
          : 'Abrir Filtros de Telemetria'
      }
    >
      {isSidebarOpen ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
    </button>
  )
}
