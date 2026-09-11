'use client'

import { createContext, useContext, ReactNode } from 'react'

export type InfractionViewMode = 'records' | 'live'

export interface InfractionsParallelLayoutContextValue {
  viewMode: InfractionViewMode
  handleViewChange: (newMode: InfractionViewMode) => void
  isConnected: boolean
  records: ReactNode
  live: ReactNode
}

export const InfractionsParallelLayoutContext = createContext<
  InfractionsParallelLayoutContextValue | undefined
>(undefined)

export const useInfractionsParallelLayoutContext = () => {
  const context = useContext(InfractionsParallelLayoutContext)
  if (!context) {
    throw new Error(
      'useInfractionsParallelLayoutContext must be used within InfractionsParallelLayout.Root'
    )
  }
  return context
}
