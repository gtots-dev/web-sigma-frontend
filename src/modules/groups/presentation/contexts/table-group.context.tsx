'use client'

import { createContext, useContext } from 'react'
import type { GroupWithGroupInterface } from '../../domain/interfaces/group-with-group.interface'

export const TableGroupContext = createContext<GroupWithGroupInterface | null>(
  null
)

export const useTableGroup = () => {
  const context = useContext(TableGroupContext)
  if (!context) {
    throw new Error('useTableGroup must be used within a <TableGroups.Item />')
  }
  return context
}
