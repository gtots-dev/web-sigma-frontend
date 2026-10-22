'use client'

import { createContext, useContext, type ReactNode } from 'react'
import type { StatusItemInterface } from '../../domain/interfaces/status-item.interface'

const TableStatusContext = createContext<StatusItemInterface | null>(null)

interface TableStatusProviderProps {
  children: ReactNode
  value: StatusItemInterface
}

export function TableStatusProvider({ children, value }: TableStatusProviderProps) {
  return (
    <TableStatusContext.Provider value={value}>
      {children}
    </TableStatusContext.Provider>
  )
}

export function useTableStatus(): StatusItemInterface {
  const context = useContext(TableStatusContext)
  if (!context) {
    throw new Error('useTableStatus must be used within TableStatusProvider')
  }
  return context
}
