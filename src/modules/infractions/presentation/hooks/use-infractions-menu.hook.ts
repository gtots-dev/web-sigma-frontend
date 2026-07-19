'use client'

import { useState } from 'react'
import type { Infraction } from '../../domain/interfaces/infractions-websocket.interface'

export const useInfractionsMenu = (initialInfractions: Infraction[] = []) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedInfraction, setSelectedInfraction] =
    useState<Infraction | null>(null)

  const open = (infraction: Infraction) => {
    setSelectedInfraction(infraction)
    setIsOpen(true)
  }
  const close = () => {
    setIsOpen(false)
    setSelectedInfraction(null)
  }
  const toggle = (infraction?: Infraction) => {
    setIsOpen((prev) => !prev)
    if (infraction) {
      setSelectedInfraction(infraction)
    }
  }

  return { isOpen, open, close, toggle, infractions: initialInfractions, selectedInfraction }
}

export type UseInfractionsMenuReturn = ReturnType<
  typeof useInfractionsMenu
>
