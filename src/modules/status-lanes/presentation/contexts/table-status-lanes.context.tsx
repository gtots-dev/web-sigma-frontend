'use client'

import { createContext, useContext, type ReactNode } from 'react'
import type { LaneStatusInterface } from '@/modules/lanes/domain/interfaces/lane-status.interface'

const TableStatusLanesContext = createContext<LaneStatusInterface | null>(null)

interface TableStatusLanesProviderProps {
  children: ReactNode
  value: LaneStatusInterface
}

export function TableStatusLanesProvider({
  children,
  value
}: TableStatusLanesProviderProps) {
  return (
    <TableStatusLanesContext.Provider value={value}>
      {children}
    </TableStatusLanesContext.Provider>
  )
}

export function useTableStatusLanes() {
  const context = useContext(TableStatusLanesContext)
  if (!context) {
    throw new Error(
      'useTableStatusLanes must be used within TableStatusLanesProvider'
    )
  }
  return context
}
