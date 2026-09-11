'use client'

import type { Infraction } from '@/modules/infractions/domain/interfaces/infraction.interface'
import { createContext, useContext, type ReactNode } from 'react'

const InfractionGridContext = createContext<Infraction | null>(null)

interface InfractionsGridProviderProps {
  infraction: Infraction
  children: ReactNode
}

export function InfractionsGridProvider({
  infraction,
  children
}: InfractionsGridProviderProps) {
  return (
    <InfractionGridContext.Provider value={infraction}>
      {children}
    </InfractionGridContext.Provider>
  )
}

export function useInfractionGrid() {
  const context = useContext(InfractionGridContext)
  if (!context) {
    throw new Error(
      'useInfractionGrid must be used within an InfractionsGridProvider'
    )
  }
  return context
}
