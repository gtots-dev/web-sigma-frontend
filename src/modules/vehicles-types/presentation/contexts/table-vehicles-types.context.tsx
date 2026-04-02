'use client'

import { createContext, useContext } from 'react'
import type { VehiclesTypesInterface } from '../../domain/interfaces/vehicle-type.interface'

export const TableVehiclesTypesContext =
  createContext<VehiclesTypesInterface | null>(null)

export const useTableVehiclesTypes = () => {
  const context = useContext(TableVehiclesTypesContext)
  if (!context) {
    throw new Error(
      'useTableVehiclesTypes must be used within a <TableVehiclesTypes.Item />'
    )
  }
  return context
}
