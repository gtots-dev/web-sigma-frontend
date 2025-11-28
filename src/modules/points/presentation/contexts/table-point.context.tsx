'use client'

import { createContext, useContext } from 'react'
import type { PointWithGroupInterface } from '../../domain/interfaces/point-with-group.interface'

export const TablePointContext = createContext<PointWithGroupInterface | null>(
  null
)

export const useTablePoint = () => {
  const context = useContext(TablePointContext)
  if (!context) {
    throw new Error('useTablePoint must be used within a <TablePoints.Item />')
  }
  return context
}
