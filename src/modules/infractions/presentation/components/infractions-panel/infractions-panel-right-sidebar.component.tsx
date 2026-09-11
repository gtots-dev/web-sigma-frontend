'use client'

import { useState, type ReactNode, type SyntheticEvent } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface InfractionsPanelRightSidebarProps {
  children: ReactNode
  defaultOpen?: boolean
}

export function InfractionsPanelRightSidebar({
  children,
  defaultOpen = true
}: InfractionsPanelRightSidebarProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  const stopPropagation = (e: SyntheticEvent) => {
    e.stopPropagation()
  }

  return (
    <div
      onPointerDown={stopPropagation}
      onMouseDown={stopPropagation}
      className={`relative flex flex-col gap-3 h-full min-h-0 shrink-0 transition-all duration-300 ease-in-out m-0 ${
        isOpen ? 'w-[300px]' : 'w-0 pointer-events-none'
      }`}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        onPointerDown={stopPropagation}
        onMouseDown={stopPropagation}
        className={`absolute top-1/2 -translate-y-1/2 z-40 flex h-16 w-5.5 items-center justify-center rounded-l-md border border-r-0 border-border bg-card text-muted-foreground hover:text-foreground shadow-md cursor-pointer transition-all duration-300 pointer-events-auto ${
          isOpen ? 'right-full' : 'right-0'
        }`}
        title={isOpen ? 'Minimizar menu lateral' : 'Abrir menu lateral'}
      >
        {isOpen ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      <div
        className={`flex flex-col gap-3 w-[300px] h-full min-h-0 transition-opacity duration-200 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none hidden'
        }`}
      >
        {children}
      </div>
    </div>
  )
}
