'use client'

import { createContext, useContext } from 'react'
import type { PointEntity } from '../../domain/entities/point.entity'

export const TablePointContext = createContext<PointEntity | null>(null)

export const useTablePoint = () => {
  const context = useContext(TablePointContext)
  if (!context) {
    throw new Error('useTablePoint must be used within a <TablePoints.Item />')
  }
  return context
}
