'use client'

import { createContext, useContext, type ReactNode } from 'react'
import type { ProcessingUnitStatusInterface } from '@/modules/processing-units/domain/interfaces/processing-unit-status-interface'

const TableStatusProcessingUnitsContext =
  createContext<ProcessingUnitStatusInterface | null>(null)

interface TableStatusProcessingUnitsProviderProps {
  children: ReactNode
  value: ProcessingUnitStatusInterface
}

export function TableStatusProcessingUnitsProvider({
  children,
  value
}: TableStatusProcessingUnitsProviderProps) {
  return (
    <TableStatusProcessingUnitsContext.Provider value={value}>
      {children}
    </TableStatusProcessingUnitsContext.Provider>
  )
}

export function useTableStatusProcessingUnits() {
  const context = useContext(TableStatusProcessingUnitsContext)
  if (!context) {
    throw new Error(
      'useTableStatusProcessingUnits must be used within TableStatusProcessingUnitsProvider'
    )
  }
  return context
}
