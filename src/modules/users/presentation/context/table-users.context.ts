'use client'

import { createContext, useContext } from 'react'
import type { UserInterface } from '../../domain/interfaces/user.interface'

interface TableUserContextProps {
  user: UserInterface
  index: number
}

export const TableUserContext = createContext<TableUserContextProps | null>(
  null
)

export const useTableUser = () => {
  const context = useContext(TableUserContext)
  if (!context) {
    throw new Error('useTableUser must be used within a TableUsers.Body')
  }
  return context
}
