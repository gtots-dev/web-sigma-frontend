'use client'

import { createContext, useContext, type ReactNode } from 'react'
import type { RestrictionEntity } from '../../domain/entities/restriction.entity'

const TableRestrictionsContext = createContext<RestrictionEntity | null>(null)

interface TableRestrictionsProviderProps {
  children: ReactNode
  value: RestrictionEntity
}

export function TableRestrictionsProvider({
  children,
  value
}: TableRestrictionsProviderProps) {
  return (
    <TableRestrictionsContext.Provider value={value}>
      {children}
    </TableRestrictionsContext.Provider>
  )
}

export function useTableRestrictions() {
  const context = useContext(TableRestrictionsContext)
  if (!context) {
    throw new Error(
      'useTableRestrictions must be used within TableRestrictionsProvider'
    )
  }
  return context
}
