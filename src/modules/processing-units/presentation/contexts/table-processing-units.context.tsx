'use client'

import { createContext, useContext } from 'react'
import type { ProcessingUnitInterface } from '../../domain/interfaces/processing-unit.interface'

export const TableProcessingUnitsContext =
  createContext<ProcessingUnitInterface | null>(null)

export const useTableProcessingUnit = () => {
  const context = useContext(TableProcessingUnitsContext)
  if (!context) {
    throw new Error(
      'useTableProcessingUnit must be used within a <TableProcessingUnits.Item />'
    )
  }
  return context
}
