'use client'

import { createContext, useContext, type ReactNode } from 'react'
import type { ViolationEntity } from '../../domain/entities/violation.entity'

const TableViolationsContext = createContext<ViolationEntity | null>(null)

interface TableViolationsProviderProps {
  children: ReactNode
  value: ViolationEntity
}

export function TableViolationsProvider({
  children,
  value
}: TableViolationsProviderProps) {
  return (
    <TableViolationsContext.Provider value={value}>
      {children}
    </TableViolationsContext.Provider>
  )
}

export function useTableViolations() {
  const context = useContext(TableViolationsContext)
  if (!context) {
    throw new Error(
      'useTableViolations must be used within TableViolationsProvider'
    )
  }
  return context
}
