'use client'

import { createContext, useContext } from 'react'
import type { LaneEntity } from '../../domain/entities/lane.entity'

export const TableLaneContext = createContext<LaneEntity | null>(null)

export const useTableLane = () => {
  const context = useContext(TableLaneContext)
  if (!context) {
    throw new Error(
      'useTableLane must be used within a <TableLanes.Item />'
    )
  }
  return context
}
